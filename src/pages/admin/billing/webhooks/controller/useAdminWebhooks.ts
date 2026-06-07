import { useState, useEffect, useCallback } from "react";
import { AdminBillingAPIService } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import type { AdminWebhookEvent } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import Notify from "@cyopo/Services/notification/Notify";

const useAdminWebhooks = () => {
  const [events, setEvents] = useState<AdminWebhookEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processed, setProcessed] = useState<string>("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const SIZE = 20;

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await AdminBillingAPIService.getWebhookEvents({
        processed: processed === "" ? undefined : processed === "true",
        page,
        size: SIZE,
      });
      setEvents(res.data ?? []);
      setTotal(res.total ?? 0);
      setTotalPages(res.totalPages ?? 1);
    } catch {
      Notify.error("Failed to load webhook events");
    } finally {
      setIsLoading(false);
    }
  }, [processed, page]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return {
    state: {
      events,
      isLoading,
      processed,
      page,
      total,
      totalPages,
    },
    handlers: {
      setProcessed: (v: string) => {
        setProcessed(v);
        setPage(1);
      },
      setPage,
      formatDate,
    },
  };
};

export default useAdminWebhooks;
