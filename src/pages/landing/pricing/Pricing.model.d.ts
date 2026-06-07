import type { BillingCycle } from "@cyopo/Models/billing/billing.model";

export interface PricingLocalState {
  billingCycle: BillingCycle;
}

export interface PricingFeature {
  text: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  ctaLabel: string;
  isFeatured: boolean;
}
