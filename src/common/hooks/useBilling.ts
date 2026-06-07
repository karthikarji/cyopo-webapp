import { useState, useEffect, useCallback } from "react";
import { BillingAPIService } from "@cyopo/Services/api/billing/BillingAPIService";
import type { PricingResponse, Subscription, FeatureGates, BillingCycle } from "@cyopo/Models/billing/billing.model";

/**
 * Shared billing hook — fetches plans, subscription and feature gates.
 * Used by pricing page, billing settings, and upgrade prompts.
 */
const useBilling = () => {
  const [pricing, setPricing] = useState<PricingResponse | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [gates, setGates] = useState<FeatureGates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected billing cycle on pricing page
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("MONTHLY");

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [pricingData, subscriptionData, gatesData] = await Promise.all([
        BillingAPIService.getPlans(),
        BillingAPIService.getSubscription().catch(() => null),
        BillingAPIService.getFeatureGates().catch(() => null),
      ]);
      setPricing(pricingData);
      setSubscription(subscriptionData);
      setGates(gatesData);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load billing information");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Format price for display
  // e.g. 49900 paise + INR → "₹499"
  const formatPrice = useCallback((amount: number, currency: string): string => {
    if (amount === 0) return "Free";
    const symbols: Record<string, string> = {
      INR: "₹",
      USD: "$",
      GBP: "£",
      EUR: "€",
    };
    const symbol = symbols[currency] ?? currency + " ";
    const divisor = currency === "INR" ? 100 : 100;
    const formatted = (amount / divisor).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${symbol}${formatted}`;
  }, []);

  // Calculate annual savings vs monthly × 12
  const annualSavings = useCallback(
    (plan: { monthlyPrice: number; annualPrice: number }, currency: string): string => {
      if (plan.monthlyPrice === 0) return "";
      const monthlyCost = plan.monthlyPrice * 12;
      const saving = monthlyCost - plan.annualPrice;
      if (saving <= 0) return "";
      return formatPrice(saving, currency);
    },
    [formatPrice],
  );

  return {
    state: {
      pricing,
      subscription,
      gates,
      isLoading,
      error,
      billingCycle,
    },
    handlers: {
      setBillingCycle,
      reload: load,
      formatPrice,
      annualSavings,
    },
  };
};

export default useBilling;
