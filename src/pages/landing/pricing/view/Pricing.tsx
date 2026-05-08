import React from "react";
import { Check } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import { PRICING_LABEL, PRICING_TITLE, PRICING_SUBTITLE, PRICING_PLANS } from "../Pricing.constants";
import type { PricingPlan } from "../Pricing.model.d";

// ─── Single plan card ────────────────────────────────────────────
const PlanCard: React.FC<{
  plan: PricingPlan;
  onCta: () => void;
}> = ({ plan, onCta }) => {
  return (
    <div
      className={[
        "relative flex flex-col p-8 rounded-2xl",
        "transition-all duration-200",
        plan.isFeatured
          ? "bg-surface border-2 border-primary shadow-xl scale-100 sm:scale-105"
          : "bg-surface border border-outline-variant/30 shadow-sm hover:shadow-md",
      ].join(" ")}>
      {/* Most popular badge */}
      {plan.isFeatured && (
        <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap'>
          Most popular
        </div>
      )}

      {/* Plan name */}
      <h3 className='font-headline font-bold text-on-surface text-xl mb-1'>{plan.name}</h3>
      <p className='text-on-surface-variant text-sm mb-6'>{plan.description}</p>

      {/* Price */}
      <div className='mb-8'>
        <span className='font-headline font-black text-on-surface text-4xl sm:text-5xl'>{plan.price}</span>
        <span className='text-on-surface-variant text-base ml-2'>/ {plan.period}</span>
      </div>

      {/* Features */}
      <ul className='flex flex-col gap-3 mb-10 flex-1'>
        {plan.features.map((feature) => (
          <li key={feature.text} className='flex items-center gap-3 text-sm text-on-surface'>
            <div className='w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0'>
              <Check size={12} className='text-primary' />
            </div>
            {feature.text}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button variant={plan.isFeatured ? "primary" : "secondary"} size='lg' fullWidth onClick={onCta} className={plan.isFeatured ? "shadow-md" : ""}>
        {plan.ctaLabel}
      </Button>
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────
const Pricing: React.FC = () => {
  const handleFreeCta = () => (window.location.href = "/register");
  const handlePremiumCta = () => (window.location.href = "/register?plan=premium");

  const getHandler = (planId: string) => (planId === "free" ? handleFreeCta : handlePremiumCta);

  return (
    <section id='pricing' className='py-16 sm:py-20 lg:py-24 bg-background'>
      <div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='text-center mb-12 lg:mb-16'>
          <p className='text-xs font-label font-semibold tracking-widest text-primary uppercase mb-3'>{PRICING_LABEL}</p>
          <h2 className='font-headline font-bold text-on-surface mb-4 text-2xl sm:text-3xl lg:text-4xl'>{PRICING_TITLE}</h2>
          <p className='text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base'>{PRICING_SUBTITLE}</p>
        </div>

        {/* Plans grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-center'>
          {PRICING_PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onCta={getHandler(plan.id)} />
          ))}
        </div>

        {/* Bottom note */}
        <p className='text-center text-xs text-on-surface-variant mt-10'>
          All plans include SSL, fast hosting, and access to our help center. No hidden fees. Ever.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
