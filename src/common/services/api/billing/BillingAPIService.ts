import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import { extractApiError } from "@cyopo/Utils/rest/ApiError.utils";
import type { ApiResponse } from "@cyopo/Models/common/common.model";
import type {
  PricingResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  ValidateCouponResponse,
  Subscription,
  Invoice,
  FeatureGates,
} from "@cyopo/Models/billing/billing.model";

class BillingAPIServiceClass {
  // ─── Plans ────────────────────────────────────────────────────────

  /**
   * Fetches all active plans with prices for the user's detected currency.
   * Public endpoint — no auth required.
   */
  async getPlans(): Promise<PricingResponse> {
    try {
      const response = await REST.get<ApiResponse<PricingResponse>>(API.BILLING.PLANS);
      if (!response.data) throw new Error("Failed to load plans");
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  // ─── Order & Payment ──────────────────────────────────────────────

  /**
   * Creates a Razorpay order for the selected plan.
   * Returns gatewayOrderId to pass to Razorpay SDK.
   * If amount is 0 (full coupon), gatewayOrderId is null.
   */
  async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    try {
      const response = await REST.post<ApiResponse<CreateOrderResponse>>(API.BILLING.CREATE_ORDER, data);
      if (!response.data) throw new Error("Failed to create order");
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  /**
   * Verifies payment signature after user completes Razorpay checkout.
   * Activates subscription on success.
   */
  async verifyPayment(data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
    try {
      const response = await REST.post<ApiResponse<VerifyPaymentResponse>>(API.BILLING.VERIFY, data);
      if (!response.data) throw new Error("Payment verification failed");
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  // ─── Coupon ───────────────────────────────────────────────────────

  /**
   * Validates a coupon code without redeeming it.
   * Returns discount details if valid.
   */
  async validateCoupon(code: string): Promise<ValidateCouponResponse> {
    try {
      const response = await REST.post<ApiResponse<ValidateCouponResponse>>(API.BILLING.VALIDATE_COUPON, { code });
      if (!response.data) throw new Error("Invalid coupon");
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  // ─── Subscription ─────────────────────────────────────────────────

  /**
   * Returns the user's current active subscription.
   * Returns null if no active subscription (FREE plan).
   */
  async getSubscription(): Promise<Subscription | null> {
    try {
      const response = await REST.get<ApiResponse<Subscription | null>>(API.BILLING.SUBSCRIPTION);
      return response.data ?? null;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  /**
   * Cancels subscription at period end.
   * User keeps access until current period ends.
   */
  async cancelSubscription(reason?: string): Promise<void> {
    try {
      await REST.post(API.BILLING.CANCEL, { reason });
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  // ─── Invoices ─────────────────────────────────────────────────────

  /**
   * Returns user's invoice history ordered by most recent first.
   */
  async getInvoices(): Promise<Invoice[]> {
    try {
      const response = await REST.get<ApiResponse<Invoice[]>>(API.BILLING.INVOICES);
      return response.data ?? [];
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  // ─── Feature Gates ────────────────────────────────────────────────

  /**
   * Returns feature gate statuses for the current user.
   * Used to show/hide upgrade prompts and lock features.
   */
  async getFeatureGates(): Promise<FeatureGates> {
    try {
      const response = await REST.get<ApiResponse<FeatureGates>>(API.BILLING.GATES);
      if (!response.data) throw new Error("Failed to load feature gates");
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export const BillingAPIService = new BillingAPIServiceClass();
