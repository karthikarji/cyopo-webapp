import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { BillingAPIService } from "@cyopo/Services/api/billing/BillingAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { BillingCycle, BillingPlan, ValidateCouponResponse, CreateOrderResponse } from "@cyopo/Models/billing/billing.model";
import type { RazorpayPaymentResponse } from "../Checkout.model.d";

// Razorpay SDK loaded via script tag in index.html
declare const Razorpay: any;

const useCheckout = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const user = useAppSelector(selectUser);

  // ─── URL params from pricing page ─────────────────────────────────
  const planPriceId = params.get("planPriceId") ?? "";
  const cycle = (params.get("cycle") ?? "MONTHLY") as BillingCycle;
  const planName = params.get("plan") ?? "";

  // ─── State ────────────────────────────────────────────────────────
  const [plan, setPlan] = useState<BillingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState<ValidateCouponResponse | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [orderData, setOrderData] = useState<CreateOrderResponse | null>(null);

  // ─── Load plan details ─────────────────────────────────────────────
  useEffect(() => {
    if (!planPriceId) {
      navigate(ROUTES.PRICING);
      return;
    }

    const load = async () => {
      try {
        setIsLoading(true);
        const pricing = await BillingAPIService.getPlans();
        const found = pricing.plans.find((p) => p.planPriceId === planPriceId);
        if (!found) {
          Notify.error("Plan not found. Please try again.");
          navigate(ROUTES.PRICING);
          return;
        }
        setPlan(found);
      } catch {
        Notify.error("Failed to load plan details.");
        navigate(ROUTES.PRICING);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [planPriceId, navigate]);

  // ─── Computed amounts ──────────────────────────────────────────────
  const basePrice = plan ? (cycle === "ANNUAL" ? plan.annualPrice : plan.monthlyPrice) : 0;

  const discountAmount = couponData
    ? couponData.discountType === "PERCENTAGE"
      ? Math.round((basePrice * couponData.discountValue) / 100)
      : couponData.discountType === "FIXED"
        ? Math.min(couponData.discountValue * 100, basePrice)
        : basePrice // FULL
    : 0;

  const subtotal = Math.max(0, basePrice - discountAmount);
  const gstAmount = plan ? Math.round((subtotal * plan.gstRate) / 100) : 0;
  const total = subtotal + gstAmount;

  const currency = plan?.currency ?? "INR";

  const formatPrice = useCallback(
    (amount: number): string => {
      const symbols: Record<string, string> = {
        INR: "₹",
        USD: "$",
        GBP: "£",
        EUR: "€",
      };
      const symbol = symbols[currency] ?? currency + " ";
      return `${symbol}${(amount / 100).toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    },
    [currency],
  );

  // ─── Coupon handlers ───────────────────────────────────────────────
  const handleApplyCoupon = useCallback(async () => {
    if (!couponCode.trim()) return;
    try {
      setIsValidating(true);
      setCouponError(null);
      const result = await BillingAPIService.validateCoupon(couponCode.trim());
      setCouponData(result);
      Notify.success("Coupon applied successfully!");
    } catch (err: any) {
      setCouponError(err?.message ?? "Invalid coupon code");
      setCouponData(null);
    } finally {
      setIsValidating(false);
    }
  }, [couponCode]);

  const handleRemoveCoupon = useCallback(() => {
    setCouponCode("");
    setCouponData(null);
    setCouponError(null);
  }, []);

  // ─── Create order + open Razorpay ──────────────────────────────────
  const handlePay = useCallback(async () => {
    if (!plan || !user) return;

    try {
      setIsPaying(true);

      // Create order on our backend
      const order = await BillingAPIService.createOrder({
        planPriceId,
        billingCycle: cycle,
        idempotencyKey: `${user.id}-${planPriceId}-${Date.now()}`,
        couponCode: couponData ? couponCode : undefined,
      });

      setOrderData(order);

      // Full discount coupon — no Razorpay needed
      if (order.amount === 0 || !order.gatewayOrderId) {
        Notify.success("Plan activated with coupon!");
        navigate(ROUTES.BILLING_SUCCESS);
        return;
      }

      // ── Open Razorpay checkout ─────────────────────────────────────
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "cyopo",
        description: `${plan.displayName} Plan — ${cycle === "ANNUAL" ? "Annual" : "Monthly"}`,
        order_id: order.gatewayOrderId,
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#6750A4", // primary color
        },
        modal: {
          ondismiss: () => {
            setIsPaying(false);
            Notify.warn("Payment cancelled. Your order is still valid.");
          },
        },
        handler: async (response: RazorpayPaymentResponse) => {
          await handleVerify(response, order.orderId);
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to initiate payment");
      setIsPaying(false);
    }
  }, [plan, user, planPriceId, cycle, couponCode, couponData, navigate]);

  // ─── Verify payment after Razorpay callback ────────────────────────
  const handleVerify = useCallback(
    async (response: RazorpayPaymentResponse, orderId: string) => {
      try {
        await BillingAPIService.verifyPayment({
          gatewayOrderId: response.razorpay_order_id,
          gatewayPaymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
        navigate(ROUTES.BILLING_SUCCESS);
      } catch (err: any) {
        Notify.error(err?.message ?? "Payment verification failed. Contact support.");
        setIsPaying(false);
      }
    },
    [navigate],
  );

  return {
    state: {
      plan,
      isLoading,
      isPaying,
      couponCode,
      couponData,
      couponError,
      isValidating,
      cycle,
      basePrice,
      discountAmount,
      subtotal,
      gstAmount,
      total,
      currency,
    },
    handlers: {
      setCouponCode,
      handleApplyCoupon,
      handleRemoveCoupon,
      handlePay,
      formatPrice,
    },
  };
};

export default useCheckout;
