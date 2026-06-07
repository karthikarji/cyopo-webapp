// ─── Plan & Pricing ───────────────────────────────────────────────

export type BillingCycle = "MONTHLY" | "ANNUAL";
export type Gateway = "RAZORPAY" | "STRIPE";

export interface PlanFeature {
  text: string;
}

export interface PlanPrice {
  id: string;
  currency: string; // "INR" | "USD" | "GBP"
  gateway: Gateway;
  monthlyPrice: number; // in smallest unit (paise for INR)
  annualPrice: number;
  gstRate: number; // 18.00 for INR, 0 for others
  isFree: boolean;
}

export interface BillingPlan {
  id: string;
  name: string; // "FREE" | "PREMIUM" | "PRO"
  displayName: string; // "Free" | "Premium" | "Pro"
  description: string;
  badge: string | null; // "Most Popular" | "Best Value" | null
  features: string[]; // bullet points from DB
  sortOrder: number;
  // Pricing (for detected currency)
  planPriceId: string | null;
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
  gstRate: number;
  isFree: boolean;
  // Limits
  maxPortfolios: number;
  maxProjectsPerPortfolio: number;
  allowCustomDomain: boolean;
  allowResumeUpload: boolean;
  allowAnalytics: boolean;
  allowPremiumTemplates: boolean;
  removeBranding: boolean;
}

export interface PricingResponse {
  countryCode: string;
  currency: string;
  gateway: Gateway;
  suggestedPaymentMethods: string[];
  plans: BillingPlan[];
}

// ─── Order & Checkout ─────────────────────────────────────────────

export interface CreateOrderRequest {
  planPriceId: string;
  billingCycle: BillingCycle;
  idempotencyKey: string;
  couponCode?: string;
  gstin?: string;
}

export interface AmountBreakdown {
  planPrice: number;
  discount: number;
  subtotal: number;
  gstAmount: number;
  total: number;
}

export interface CreateOrderResponse {
  orderId: string;
  gatewayOrderId: string | null; // null if 100% coupon discount
  amount: number;
  currency: string;
  planName: string;
  billingCycle: BillingCycle;
  breakdown: AmountBreakdown;
}

export interface VerifyPaymentRequest {
  gatewayOrderId: string;
  gatewayPaymentId: string;
  signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  planName: string;
  subscriptionId: string;
  invoiceId: string;
  periodEnd: string;
}

// ─── Coupon ───────────────────────────────────────────────────────

export interface ValidateCouponResponse {
  code: string;
  discountType: "PERCENTAGE" | "FIXED" | "FULL";
  discountValue: number;
  message: string;
}

// ─── Subscription ─────────────────────────────────────────────────

export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED" | "PAST_DUE" | "PENDING";

export interface Subscription {
  id: string;
  planId: string;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  cancelledAt: string | null;
  currency: string;
  finalAmount: number;
  gateway: Gateway;
  planName: string;
  planDisplayName: string;
}

// ─── Invoice ──────────────────────────────────────────────────────

export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "VOID";

export interface Invoice {
  id: string;
  invoiceNumber: string; // INV-2026-000001
  status: InvoiceStatus;
  currency: string;
  subtotal: number;
  discount: number;
  gstRate: number;
  gstAmount: number;
  total: number;
  billingName: string;
  billingEmail: string;
  pdfUrl: string | null;
  periodStart: string;
  periodEnd: string;
  issuedAt: string;
  paidAt: string | null;
}

// ─── Feature Gates ────────────────────────────────────────────────

export interface FeatureGates {
  canCreatePortfolio: boolean;
  canUseCustomDomain: boolean;
  canUsePremiumTemplates: boolean;
  currentPlan: string;
  portfoliosUsed: number;
  portfoliosAllowed: number;
}
