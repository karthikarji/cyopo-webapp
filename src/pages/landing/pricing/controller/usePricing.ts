import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectIsAuthenticated, selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { BillingAPIService } from "@cyopo/Services/api/billing/BillingAPIService";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { BillingPlan, BillingCycle, PricingResponse } from "@cyopo/Models/billing/billing.model";

// Plan upgrade hierarchy
const PLAN_RANK: Record<string, number> = {
  FREE: 0,
  PREMIUM: 1,
  PRO: 2,
};

const usePricing = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const [data, setData] = useState<PricingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("MONTHLY");

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await BillingAPIService.getPlans();
        setData(result);
      } catch (err: any) {
        setError(err?.message ?? "Failed to load plans");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  // ─── Plan status helpers ───────────────────────────────────────────
  const currentPlanName = user?.plan ?? "FREE";

  /**
   * Returns true if this plan IS the user's current plan.
   */
  const isCurrentPlan = useCallback(
    (plan: BillingPlan): boolean => {
      if (!isAuthenticated) return false;
      return plan.name === currentPlanName;
    },
    [isAuthenticated, currentPlanName],
  );

  /**
   * Returns true if the user is already on a HIGHER plan.
   * e.g. PRO user looking at PREMIUM → already has better.
   */
  const isDowngrade = useCallback(
    (plan: BillingPlan): boolean => {
      if (!isAuthenticated) return false;
      const userRank = PLAN_RANK[currentPlanName] ?? 0;
      const planRank = PLAN_RANK[plan.name] ?? 0;
      return userRank > planRank;
    },
    [isAuthenticated, currentPlanName],
  );

  /**
   * Returns the correct CTA label for a plan based on user's current plan.
   */
  const getCtaLabel = useCallback(
    (plan: BillingPlan): string => {
      if (!isAuthenticated) {
        return plan.isFree ? "Get started free" : `Get ${plan.displayName}`;
      }
      if (isCurrentPlan(plan)) return "Current plan";
      if (isDowngrade(plan)) return "Downgrade";
      if (plan.isFree) return "Go to Dashboard";
      return `Upgrade to ${plan.displayName}`;
    },
    [isAuthenticated, isCurrentPlan, isDowngrade],
  );

  /**
   * Returns true if the CTA button should be disabled.
   * Disabled for current plan and downgrades.
   */
  const isCtaDisabled = useCallback(
    (plan: BillingPlan): boolean => {
      if (!isAuthenticated) return false;
      return isCurrentPlan(plan) || isDowngrade(plan);
    },
    [isAuthenticated, isCurrentPlan, isDowngrade],
  );

  // ─── CTA handler ──────────────────────────────────────────────────
  const handlePlanCta = useCallback(
    (plan: BillingPlan) => {
      // Disabled plans — do nothing
      if (isCtaDisabled(plan)) return;

      // Not logged in
      if (!isAuthenticated) {
        navigate(plan.isFree ? ROUTES.REGISTER : `${ROUTES.REGISTER}?plan=${plan.name.toLowerCase()}`);
        return;
      }

      // Free plan — go to dashboard
      if (plan.isFree) {
        navigate(ROUTES.DASHBOARD);
        return;
      }

      // Upgrade — go to checkout
      navigate(`${ROUTES.CHECKOUT}?planPriceId=${plan.planPriceId}&cycle=${billingCycle}&plan=${plan.name}`);
    },
    [isAuthenticated, navigate, billingCycle, isCtaDisabled],
  );

  // ─── Format helpers ────────────────────────────────────────────────
  const formatPrice = useCallback((amount: number, currency: string): string => {
    if (amount === 0) return "Free";
    const symbols: Record<string, string> = {
      INR: "₹",
      USD: "$",
      GBP: "£",
      EUR: "€",
    };
    const symbol = symbols[currency] ?? currency + " ";
    return `${symbol}${(amount / 100).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }, []);

  const getAnnualSavings = useCallback(
    (plan: BillingPlan): string => {
      if (plan.monthlyPrice === 0 || plan.annualPrice === 0) return "";
      const saving = plan.monthlyPrice * 12 - plan.annualPrice;
      if (saving <= 0) return "";
      return `Save ${formatPrice(saving, data?.currency ?? "INR")} yearly`;
    },
    [data, formatPrice],
  );

  const getDisplayPrice = useCallback(
    (plan: BillingPlan): number => {
      return billingCycle === "ANNUAL" ? plan.annualPrice : plan.monthlyPrice;
    },
    [billingCycle],
  );

  const toggleCycle = useCallback(() => {
    setBillingCycle((c) => (c === "MONTHLY" ? "ANNUAL" : "MONTHLY"));
  }, []);

  return {
    state: {
      data,
      isLoading,
      error,
      billingCycle,
      currentPlanName,
    },
    handlers: {
      handlePlanCta,
      toggleCycle,
      formatPrice,
      getAnnualSavings,
      getDisplayPrice,
      isCurrentPlan,
      isDowngrade,
      getCtaLabel,
      isCtaDisabled,
    },
  };
};

export default usePricing;
