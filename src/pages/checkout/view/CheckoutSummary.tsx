import React from "react";
import { ShieldCheck } from "lucide-react";
import type { BillingPlan, BillingCycle, ValidateCouponResponse } from "@cyopo/Models/billing/billing.model";
import { CHECKOUT_SECURE_NOTE, CHECKOUT_GST_NOTE } from "../Checkout.constants";

interface Props {
  plan: BillingPlan;
  cycle: BillingCycle;
  basePrice: number;
  discountAmount: number;
  subtotal: number;
  gstAmount: number;
  total: number;
  couponData: ValidateCouponResponse | null;
  formatPrice: (amount: number) => string;
}

const Row: React.FC<{
  label: string;
  value: string;
  isTotal?: boolean;
  isGreen?: boolean;
}> = ({ label, value, isTotal, isGreen }) => (
  <div className={["flex items-center justify-between", isTotal ? "pt-3 border-t border-outline-variant/30" : ""].join(" ")}>
    <span className={["text-sm", isTotal ? "font-bold text-on-surface" : "text-on-surface-variant"].join(" ")}>{label}</span>
    <span className={["text-sm font-semibold", isGreen ? "text-success" : isTotal ? "text-on-surface text-base" : "text-on-surface"].join(" ")}>
      {value}
    </span>
  </div>
);

const CheckoutSummary: React.FC<Props> = ({ plan, cycle, basePrice, discountAmount, subtotal, gstAmount, total, couponData, formatPrice }) => (
  <div className='bg-surface border border-outline-variant/30 rounded-2xl p-6 flex flex-col gap-4'>
    {/* Plan details */}
    <div>
      <p className='text-xs font-semibold text-primary uppercase tracking-widest mb-1'>Order Summary</p>
      <h3 className='font-headline font-bold text-on-surface text-xl'>{plan.displayName} Plan</h3>
      <p className='text-sm text-on-surface-variant mt-0.5'>{cycle === "ANNUAL" ? "Annual billing" : "Monthly billing"}</p>
    </div>

    {/* Features */}
    <ul className='flex flex-col gap-2 py-3 border-y border-outline-variant/20'>
      {plan.features.slice(0, 5).map((f, i) => (
        <li key={i} className='text-sm text-on-surface-variant flex items-center gap-2'>
          <span className='material-symbols-outlined text-primary text-base'>check_circle</span>
          {f}
        </li>
      ))}
    </ul>

    {/* Price breakdown */}
    <div className='flex flex-col gap-2'>
      <Row label={`${plan.displayName} (${cycle === "ANNUAL" ? "Annual" : "Monthly"})`} value={formatPrice(basePrice)} />
      {discountAmount > 0 && couponData && <Row label={`Coupon (${couponData.code})`} value={`- ${formatPrice(discountAmount)}`} isGreen />}
      {gstAmount > 0 && <Row label={`GST (${plan.gstRate}%)`} value={formatPrice(gstAmount)} />}
      <Row label='Total' value={formatPrice(total)} isTotal />
    </div>

    {/* Security note */}
    <div className='flex items-center gap-2 text-xs text-on-surface-variant'>
      <ShieldCheck size={14} className='text-success flex-shrink-0' />
      <span>{CHECKOUT_SECURE_NOTE}</span>
    </div>
    {plan.gstRate > 0 && <p className='text-xs text-on-surface-variant'>{CHECKOUT_GST_NOTE}</p>}
  </div>
);

export default CheckoutSummary;
