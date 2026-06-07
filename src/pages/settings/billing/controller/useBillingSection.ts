import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@cyopo/Hooks/useRedux";
import { setUser as setReduxUser } from "@cyopo/Redux/actions/AppCommon.actions";
import { BillingAPIService } from "@cyopo/Services/api/billing/BillingAPIService";
import UserAPIService from "@cyopo/Services/api/user/UserAPIService";
import type { UserProfile } from "@cyopo/Services/api/user/UserAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { Subscription, Invoice, FeatureGates } from "@cyopo/Models/billing/billing.model";

const useBillingSection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ─── State ────────────────────────────────────────────────────────
  const [user, setUser] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [gates, setGates] = useState<FeatureGates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  // ─── Load all billing data + user ─────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const [userData, subData, invoiceData, gatesData] = await Promise.all([
          UserAPIService.getMe(),
          BillingAPIService.getSubscription().catch(() => null),
          BillingAPIService.getInvoices().catch(() => []),
          BillingAPIService.getFeatureGates().catch(() => null),
        ]);
        setUser(userData);
        setSubscription(subData);
        setInvoices(invoiceData);
        setGates(gatesData);
      } catch {
        Notify.error("Failed to load billing information");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // ─── Format helpers ────────────────────────────────────────────────
  const formatPrice = useCallback((amount: number, currency: string): string => {
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
  }, []);

  const formatDate = useCallback((dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  // ─── Upgrade handler ───────────────────────────────────────────────
  const handleUpgrade = useCallback(() => {
    navigate(ROUTES.PRICING);
  }, [navigate]);

  // ─── Cancel subscription ───────────────────────────────────────────
  const handleCancelSubscription = useCallback(async () => {
    if (!cancelReason.trim()) {
      Notify.warn("Please provide a reason for cancellation");
      return;
    }
    try {
      setIsCancelling(true);
      await BillingAPIService.cancelSubscription(cancelReason);

      // Update local subscription state
      if (subscription) {
        setSubscription({
          ...subscription,
          cancelAtPeriodEnd: true,
          cancelledAt: new Date().toISOString(),
        });
      }

      // Refresh user in Redux so plan badge updates
      const updatedUser = await UserAPIService.getMe();
      setUser(updatedUser);
      dispatch(setReduxUser(updatedUser as any));

      setShowCancelModal(false);
      setCancelReason("");
      Notify.success("Subscription cancelled. You will retain access until the end of your billing period.");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to cancel subscription");
    } finally {
      setIsCancelling(false);
    }
  }, [cancelReason, subscription, dispatch]);

  // ─── Computed ─────────────────────────────────────────────────────
  const canCancel = subscription?.status === "ACTIVE" && !subscription?.cancelAtPeriodEnd;
  const isPaidPlan = user?.plan !== "FREE";

  return {
    state: {
      user,
      subscription,
      invoices,
      gates,
      isLoading,
      showCancelModal,
      cancelReason,
      isCancelling,
      canCancel,
      isPaidPlan,
    },
    handlers: {
      setShowCancelModal,
      setCancelReason,
      handleUpgrade,
      handleCancelSubscription,
      formatPrice,
      formatDate,
    },
  };
};

export default useBillingSection;
