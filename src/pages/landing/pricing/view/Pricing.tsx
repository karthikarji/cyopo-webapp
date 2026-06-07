import React from "react";
import usePricing from "../controller/usePricing";
import PlanCard from "./PlanCard";
import PricingSkeleton from "./PricingSkeleton";
import BillingCycleToggle from "./BillingCycleToggle";
import { PRICING_LABEL, PRICING_TITLE, PRICING_SUBTITLE, PRICING_NOTE } from "../Pricing.constants";

const Pricing: React.FC = () => {
  const { state, handlers } = usePricing();

  return (
    <section id='pricing' className='py-16 sm:py-20 lg:py-24 bg-background'>
      <div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-10 lg:mb-14'>
          <p className='text-xs font-label font-semibold tracking-widest text-primary uppercase mb-3'>{PRICING_LABEL}</p>
          <h2 className='font-headline font-bold text-on-surface mb-4 text-2xl sm:text-3xl lg:text-4xl'>{PRICING_TITLE}</h2>
          <p className='text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base'>{PRICING_SUBTITLE}</p>
        </div>

        {/* Billing cycle toggle */}
        <BillingCycleToggle cycle={state.billingCycle} onToggle={handlers.toggleCycle} />

        {/* Plans */}
        {state.isLoading ? (
          <PricingSkeleton />
        ) : state.error || !state.data ? (
          <div className='text-center py-12 text-on-surface-variant text-sm'>Unable to load pricing. Please refresh the page.</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto items-center'>
            {state.data.plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                cycle={state.billingCycle}
                currency={state.data!.currency}
                displayPrice={handlers.getDisplayPrice(plan)}
                annualSavings={handlers.getAnnualSavings(plan)}
                formatPrice={handlers.formatPrice}
                ctaLabel={handlers.getCtaLabel(plan)}
                ctaDisabled={handlers.isCtaDisabled(plan)}
                isCurrentPlan={handlers.isCurrentPlan(plan)}
                onCta={() => handlers.handlePlanCta(plan)}
              />
            ))}
          </div>
        )}

        {/* Footer note */}
        <p className='text-center text-xs text-on-surface-variant mt-10'>
          {PRICING_NOTE}
          {state.data && (
            <span className='ml-1'>
              Prices in {state.data.currency}
              {state.data.currency === "INR" ? " (incl. 18% GST)" : ""}.
            </span>
          )}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
