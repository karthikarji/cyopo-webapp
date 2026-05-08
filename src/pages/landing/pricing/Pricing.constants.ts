import type { PricingPlan } from "./Pricing.model.d";

export const PRICING_TITLE = "Simple, honest pricing";
export const PRICING_SUBTITLE = "Start free. Upgrade when you are ready. No surprises.";
export const PRICING_LABEL = "PRICING";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started.",
    isFeatured: false,
    ctaLabel: "Get started free",
    features: [
      { text: "1 published portfolio" },
      { text: "Free templates" },
      { text: "Basic analytics" },
      { text: "cyopo subdomain" },
      { text: "Contact inbox" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$99",
    period: "lifetime",
    description: "Everything you need to stand out.",
    isFeatured: true,
    ctaLabel: "Get lifetime access",
    features: [
      { text: "Unlimited portfolios" },
      { text: "All premium templates" },
      { text: "Advanced analytics" },
      { text: "Custom domain + SSL" },
      { text: "AI content generation" },
      { text: "Priority support" },
      { text: "Remove cyopo branding" },
    ],
  },
];
