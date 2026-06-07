import React from "react";
import type { BillingCycle } from "@cyopo/Models/billing/billing.model";

interface Props {
  cycle: BillingCycle;
  onToggle: () => void;
}

const BillingCycleToggle: React.FC<Props> = ({ cycle, onToggle }) => (
  <div className='flex items-center justify-center gap-3 mb-10 sm:mb-12'>
    <span className={["text-sm font-medium transition-colors", cycle === "MONTHLY" ? "text-on-surface" : "text-on-surface-variant"].join(" ")}>
      Monthly
    </span>

    <button
      onClick={onToggle}
      aria-label='Toggle billing cycle'
      className={["relative w-12 h-6 rounded-full transition-colors duration-200", cycle === "ANNUAL" ? "bg-primary" : "bg-outline-variant"].join(
        " ",
      )}>
      <span
        className={[
          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200",
          cycle === "ANNUAL" ? "translate-x-6" : "translate-x-0",
        ].join(" ")}
      />
    </button>

    <span className={["text-sm font-medium transition-colors", cycle === "ANNUAL" ? "text-on-surface" : "text-on-surface-variant"].join(" ")}>
      Annual
    </span>

    {cycle === "ANNUAL" && <span className='text-[11px] font-bold bg-success-container text-success px-2 py-0.5 rounded-full'>2 months free</span>}
  </div>
);

export default BillingCycleToggle;
