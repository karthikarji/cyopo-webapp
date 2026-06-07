import React from "react";
import { Check, TrendingUp, Zap } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import type { BillingPlan, BillingCycle } from "@cyopo/Models/billing/billing.model";

interface Props {
  plan: BillingPlan;
  cycle: BillingCycle;
  currency: string;
  displayPrice: number;
  annualSavings: string;
  formatPrice: (amount: number, currency: string) => string;
  ctaLabel: string;
  ctaDisabled: boolean;
  isCurrentPlan: boolean;
  onCta: () => void;
}

const PlanCard: React.FC<Props> = ({
  plan,
  cycle,
  currency,
  ctaLabel,
  ctaDisabled,
  isCurrentPlan,
  displayPrice,
  annualSavings,
  formatPrice,
  onCta,
}) => {
  const isFeatured = plan.badge === "Most Popular";
  const isBestVal = plan.badge === "Best Value";

  return (
    <div
      className={[
        "relative flex flex-col p-6 sm:p-8 rounded-2xl transition-all duration-200",
        isFeatured
          ? "bg-surface border-2 border-primary shadow-xl sm:scale-105"
          : isBestVal
            ? "bg-surface border-2 border-secondary shadow-xl"
            : "bg-surface border border-outline-variant/30 shadow-sm hover:shadow-md",
      ].join(" ")}>
      {/* Badge */}
      {plan.badge && (
        <div
          className={[
            "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full",
            "text-xs font-bold whitespace-nowrap",
            isFeatured ? "bg-primary text-on-primary" : "bg-secondary text-on-secondary",
          ].join(" ")}>
          {plan.badge}
        </div>
      )}

      {/* Name + description */}
      <h3 className='font-headline font-bold text-on-surface text-xl mb-1'>{plan.displayName}</h3>
      <p className='text-on-surface-variant text-sm mb-6'>{plan.description}</p>

      {/* Price */}
      <div className='mb-2'>
        {plan.isFree ? (
          <span className='font-headline font-black text-on-surface text-4xl sm:text-5xl'>Free</span>
        ) : (
          <>
            <span className='font-headline font-black text-on-surface text-4xl sm:text-5xl'>{formatPrice(displayPrice, currency)}</span>
            <span className='text-on-surface-variant text-base ml-2'>/ {cycle === "ANNUAL" ? "year" : "month"}</span>
          </>
        )}
      </div>

      {/* Annual savings */}
      {cycle === "ANNUAL" && annualSavings ? (
        <div className='flex items-center gap-1 mb-6'>
          <TrendingUp size={12} className='text-success' />
          <span className='text-xs font-medium text-success'>{annualSavings}</span>
        </div>
      ) : (
        <div className='mb-6' />
      )}

      {/* Features */}
      <ul className='flex flex-col gap-3 mb-8 sm:mb-10 flex-1'>
        {plan.features.map((feature, i) => (
          <li key={i} className='flex items-start gap-3 text-sm text-on-surface'>
            <div className='w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 mt-0.5'>
              <Check size={12} className='text-primary' />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {ctaDisabled ? (
        <div
          className={[
            "w-full py-3 rounded-xl text-center text-sm font-medium border",
            isCurrentPlan
              ? "bg-primary-container text-on-primary-container border-primary/20"
              : "bg-surface-container text-on-surface-variant border-outline-variant/30",
          ].join(" ")}>
          {ctaLabel}
        </div>
      ) : (
        <Button
          variant={isFeatured ? "primary" : "secondary"}
          size='lg'
          fullWidth
          onClick={onCta}
          className={isFeatured ? "shadow-md" : ""}
          leftIcon={plan.isFree ? undefined : <Zap size={15} />}>
          {ctaLabel}
        </Button>
      )}
    </div>
  );
};

export default PlanCard;
