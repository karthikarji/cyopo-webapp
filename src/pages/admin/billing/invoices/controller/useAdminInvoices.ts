import { useState, useEffect, useCallback } from "react";
import { AdminBillingAPIService } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import type { AdminInvoice } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import Notify from "@cyopo/Services/notification/Notify";

const useAdminInvoices = () => {
  const [invoices, setInvoices] = useState<AdminInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [voidingId, setVoidingId] = useState<string | null>(null);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null); // ← add
  const SIZE = 20;

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await AdminBillingAPIService.getInvoices({
        status: statusFilter || undefined,
        page,
        size: SIZE,
      });
      setInvoices(res.data ?? []);
      setTotal(res.total ?? 0);
      setTotalPages(res.totalPages ?? 1);
    } catch {
      Notify.error("Failed to load invoices");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleVoid = useCallback(
    async (id: string) => {
      if (!confirm("Are you sure you want to void this invoice?")) return;
      try {
        setVoidingId(id);
        await AdminBillingAPIService.voidInvoice(id);
        Notify.success("Invoice voided");
        fetch();
      } catch (e: any) {
        Notify.error(e?.message ?? "Failed to void invoice");
      } finally {
        setVoidingId(null);
      }
    },
    [fetch],
  );

  const handleRegeneratePdf = useCallback(async (id: string) => {
    try {
      setRegeneratingId(id);
      const pdfUrl = await AdminBillingAPIService.regenerateInvoicePdf(id);
      // Update invoice in local state with new pdfUrl
      setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, pdfUrl } : inv)));
      Notify.success("PDF generated successfully");
    } catch (e: any) {
      Notify.error(e?.message ?? "Failed to generate PDF");
    } finally {
      setRegeneratingId(null);
    }
  }, []);

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
      invoices,
      isLoading,
      statusFilter,
      page,
      total,
      totalPages,
      voidingId,
      regeneratingId,
    },
    handlers: {
      setStatusFilter: (v: string) => {
        setStatusFilter(v);
        setPage(1);
      },
      setPage,
      handleVoid,
      handleRegeneratePdf,
      formatDate,
      formatAmount,
    },
  };
};

export default useAdminInvoices;
