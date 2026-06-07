import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import { extractApiError } from "@cyopo/Utils/rest/ApiError.utils";
import type { ApiResponse, PageResponse } from "@cyopo/Models/common/common.model";

// ─── Types ────────────────────────────────────────────────────────

export interface AdminBillingStats {
  totalRevenueAllTime: number;
  totalRevenueThisMonth: number;
  currency: string;
  activeSubscriptions: number;
  cancelledThisMonth: number;
  pastDueSubscriptions: number;
  freeUsers: number;
  premiumUsers: number;
  proUsers: number;
  totalPaymentsThisMonth: number;
  failedPaymentsThisMonth: number;
  refundsThisMonth: number;
  unprocessedWebhooks: number;
}

export interface AdminSubscription {
  id: string;
  status: string;
  billingCycle: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  finalAmount: number;
  currency: string;
  gateway: string;
  user: { id: string; email: string; name: string };
  plan: { name: string; displayName: string };
}

export interface AdminPayment {
  id: string;
  status: string;
  totalAmount: number;
  refundAmount: number;
  currency: string;
  paymentMethod: string;
  gatewayPaymentId: string;
  createdAt: string;
  user: { id: string; email: string };
}

export interface AdminInvoice {
  id: string;
  invoiceNumber: string;
  status: string;
  total: number;
  currency: string;
  billingName: string;
  billingEmail: string;
  pdfUrl: string | null;
  issuedAt: string;
  user: { id: string; email: string };
}

export interface AdminOrder {
  id: string;
  status: string;
  totalAmount: number;
  currency: string;
  billingCycle: string;
  gateway: string;
  gatewayOrderId: string;
  createdAt: string;
  user: { id: string; email: string };
  plan: { name: string };
}

export interface AdminWebhookEvent {
  id: string;
  gateway: string;
  eventId: string;
  eventType: string;
  processed: boolean;
  errorMessage: string | null;
  retryCount: number;
  createdAt: string;
}

export interface RefundRequest {
  amount: number;
  reason: string;
}

// ─── Service ──────────────────────────────────────────────────────

class AdminBillingAPIServiceClass {
  // Stats
  async getStats(): Promise<AdminBillingStats> {
    try {
      const res = await REST.get<ApiResponse<AdminBillingStats>>(API.ADMIN.BILLING.STATS);
      return res.data;
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }

  // Subscriptions
  async getSubscriptions(params: { status?: string; page: number; size: number }): Promise<PageResponse<AdminSubscription>> {
    try {
      const res = await REST.get<ApiResponse<PageResponse<AdminSubscription>>>(API.ADMIN.BILLING.SUBSCRIPTIONS, { params });
      return res.data;
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }

  async cancelSubscription(id: string, reason: string): Promise<void> {
    try {
      await REST.post(API.ADMIN.BILLING.CANCEL_SUBSCRIPTION(id), { reason });
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }

  // Payments
  async getPayments(params: { status?: string; page: number; size: number }): Promise<PageResponse<AdminPayment>> {
    try {
      const res = await REST.get<ApiResponse<PageResponse<AdminPayment>>>(API.ADMIN.BILLING.PAYMENTS, { params });
      return res.data;
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }

  async refundPayment(id: string, data: RefundRequest): Promise<void> {
    try {
      await REST.post(API.ADMIN.BILLING.REFUND_PAYMENT(id), data);
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }

  // Invoices
  async getInvoices(params: { status?: string; page: number; size: number }): Promise<PageResponse<AdminInvoice>> {
    try {
      const res = await REST.get<ApiResponse<PageResponse<AdminInvoice>>>(API.ADMIN.BILLING.INVOICES, { params });
      return res.data;
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }

  async voidInvoice(id: string): Promise<void> {
    try {
      await REST.post(API.ADMIN.BILLING.VOID_INVOICE(id), {});
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }

  async regenerateInvoicePdf(id: string): Promise<string> {
    try {
      const res = await REST.post<ApiResponse<string>>(API.ADMIN.BILLING.REGENERATE_PDF(id), {});
      return res.data;
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }

  // Orders
  async getOrders(params: { status?: string; page: number; size: number }): Promise<PageResponse<AdminOrder>> {
    try {
      const res = await REST.get<ApiResponse<PageResponse<AdminOrder>>>(API.ADMIN.BILLING.ORDERS, { params });
      return res.data;
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }

  // Webhook events
  async getWebhookEvents(params: { processed?: boolean; page: number; size: number }): Promise<PageResponse<AdminWebhookEvent>> {
    try {
      const res = await REST.get<ApiResponse<PageResponse<AdminWebhookEvent>>>(API.ADMIN.BILLING.WEBHOOK_EVENTS, { params });
      return res.data;
    } catch (e: any) {
      throw new Error(extractApiError(e));
    }
  }
}

export const AdminBillingAPIService = new AdminBillingAPIServiceClass();
