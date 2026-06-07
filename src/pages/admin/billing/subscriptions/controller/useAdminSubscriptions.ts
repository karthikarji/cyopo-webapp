import { useState, useEffect, useCallback } from "react";
import { AdminBillingAPIService } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import type { AdminSubscription } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import Notify from "@cyopo/Services/notification/Notify";

const useAdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<AdminSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // ← add
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const SIZE = 20;

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await AdminBillingAPIService.getSubscriptions({
        status: statusFilter || undefined,
        page,
        size: SIZE,
      });
      setSubscriptions(res.data ?? []);
      setTotal(res.total ?? 0);
      setTotalPages(res.totalPages ?? 1); // ← store it
    } catch {
      Notify.error("Failed to load subscriptions");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleOpenCancel = useCallback((id: string) => {
    setCancellingId(id);
    setCancelReason("");
    setShowCancelModal(true);
  }, []);

  const handleConfirmCancel = useCallback(async () => {
    if (!cancellingId || !cancelReason.trim()) {
      Notify.warn("Please provide a cancellation reason");
      return;
    }
    try {
      await AdminBillingAPIService.cancelSubscription(cancellingId, cancelReason);
      Notify.success("Subscription cancelled");
      setShowCancelModal(false);
      setCancellingId(null);
      fetch();
    } catch (e: any) {
      Notify.error(e?.message ?? "Failed to cancel subscription");
    }
  }, [cancellingId, cancelReason, fetch]);

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

  return {
    state: {
      subscriptions,
      isLoading,
      statusFilter,
      page,
      total,
      totalPages,
      showCancelModal,
      cancelReason,
    },
    handlers: {
      setStatusFilter: (v: string) => {
        setStatusFilter(v);
        setPage(1);
      },
      setPage,
      handleOpenCancel,
      handleConfirmCancel,
      setCancelReason,
      setShowCancelModal,
      formatDate,
      formatAmount,
    },
  };
};

export default useAdminSubscriptions;
