import { useState, useEffect, useCallback } from "react";
import { AdminBillingAPIService } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import type { AdminPayment } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import Notify from "@cyopo/Services/notification/Notify";

const useAdminPayments = () => {
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [refundTargetId, setRefundTargetId] = useState<string | null>(null);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [isRefunding, setIsRefunding] = useState(false);
  const SIZE = 20;

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await AdminBillingAPIService.getPayments({
        status: statusFilter || undefined,
        page,
        size: SIZE,
      });
      setPayments(res.data ?? []);
      setTotal(res.total ?? 0);
      setTotalPages(res.totalPages ?? 1);
    } catch {
      Notify.error("Failed to load payments");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleOpenRefund = useCallback((id: string) => {
    setRefundTargetId(id);
    setRefundAmount("");
    setRefundReason("");
  }, []);

  const handleConfirmRefund = useCallback(async () => {
    if (!refundTargetId) return;
    const amountPaise = Math.round(parseFloat(refundAmount) * 100);
    if (!amountPaise || amountPaise <= 0) {
      Notify.warn("Enter a valid refund amount");
      return;
    }
    if (!refundReason.trim()) {
      Notify.warn("Please provide a refund reason");
      return;
    }
    try {
      setIsRefunding(true);
      await AdminBillingAPIService.refundPayment(refundTargetId, {
        amount: amountPaise,
        reason: refundReason,
      });
      Notify.success("Refund processed successfully");
      setRefundTargetId(null);
      fetch();
    } catch (e: any) {
      Notify.error(e?.message ?? "Failed to process refund");
    } finally {
      setIsRefunding(false);
    }
  }, [refundTargetId, refundAmount, refundReason, fetch]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatAmount = (amount: number, currency: string) => {
    const symbols: Record<string, string> = { INR: "₹", USD: "$" };
    return `${symbols[currency] ?? currency}${(amount / 100).toLocaleString("en-IN")}`;
  };

  const refundTarget = payments.find((p) => p.id === refundTargetId) ?? null;

  return {
    state: {
      payments,
      isLoading,
      statusFilter,
      page,
      total,
      totalPages,
      refundTargetId,
      refundAmount,
      refundReason,
      isRefunding,
      refundTarget,
    },
    handlers: {
      setStatusFilter: (v: string) => {
        setStatusFilter(v);
        setPage(1);
      },
      setPage,
      handleOpenRefund,
      handleConfirmRefund,
      setRefundAmount,
      setRefundReason,
      setRefundTargetId,
      formatDate,
      formatAmount,
    },
  };
};

export default useAdminPayments;
