import { useState, useEffect } from "react";
import { AdminBillingAPIService } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import type { AdminBillingStats } from "@cyopo/Services/api/admin/AdminBillingAPIService";
import Notify from "@cyopo/Services/notification/Notify";

const useAdminBillingStats = () => {
  const [stats, setStats] = useState<AdminBillingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AdminBillingAPIService.getStats()
      .then(setStats)
      .catch(() => Notify.error("Failed to load billing stats"))
      .finally(() => setIsLoading(false));
  }, []);

  const formatAmount = (amount: number, currency: string): string => {
    const symbols: Record<string, string> = {
      INR: "₹",
      USD: "$",
      GBP: "£",
    };
    const symbol = symbols[currency] ?? currency + " ";
    return `${symbol}${(amount / 100).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return { state: { stats, isLoading }, handlers: { formatAmount } };
};

export default useAdminBillingStats;
