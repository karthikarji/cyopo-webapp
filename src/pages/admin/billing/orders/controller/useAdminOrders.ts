import { useState, useEffect, useCallback } from "react";
import { AdminBillingAPIService } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import type { AdminOrder } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import Notify from "@cyopo/Services/notification/Notify";

const useAdminOrders = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const SIZE = 20;

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await AdminBillingAPIService.getOrders({
        status: statusFilter || undefined,
        page,
        size: SIZE,
      });
      setOrders(res.data ?? []);
      setTotal(res.total ?? 0);
      setTotalPages(res.totalPages ?? 1);
    } catch {
      Notify.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

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
      orders,
      isLoading,
      statusFilter,
      page,
      total,
      totalPages,
    },
    handlers: {
      setStatusFilter: (v: string) => {
        setStatusFilter(v);
        setPage(1);
      },
      setPage,
      formatDate,
      formatAmount,
    },
  };
};

export default useAdminOrders;
