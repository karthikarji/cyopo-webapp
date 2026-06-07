import React from "react";
import { Lock } from "lucide-react";
import type { FeatureGates } from "@cyopo/Models/billing/billing.model";

interface Props {
  gates: FeatureGates;
  onUpgrade: () => void;
}

interface GateRowProps {
  label: string;
  enabled: boolean;
  usage?: string; // e.g. "3 of 5"
  onUpgrade: () => void;
}

const GateRow: React.FC<GateRowProps> = ({ label, enabled, usage, onUpgrade }) => (
  <div className='flex items-center justify-between py-3 border-b border-outline-variant/10 last:border-0'>
    <div className='flex flex-col'>
      <span className='text-sm font-medium text-on-surface'>{label}</span>
      {usage && <span className='text-xs text-on-surface-variant mt-0.5'>{usage}</span>}
    </div>
    {enabled ? (
      <span className='flex items-center gap-1 text-xs font-semibold text-success'>
        <span className='material-symbols-outlined text-base' style={{ fontVariationSettings: "'FILL' 1" }}>
          check_circle
        </span>
        Enabled
      </span>
    ) : (
      <button onClick={onUpgrade} className='flex items-center gap-1 text-xs font-semibold text-primary hover:underline'>
        <Lock size={12} />
        Upgrade
      </button>
    )}
  </div>
);

const BillingUsage: React.FC<Props> = ({ gates, onUpgrade }) => {
  const portfolioUsage = `${gates.portfoliosUsed} of ${gates.portfoliosAllowed === 2147483647 ? "unlimited" : gates.portfoliosAllowed} used`;

  return (
    <div className='bg-surface border border-outline-variant/20 rounded-2xl p-6'>
      <h2 className='font-semibold text-on-surface mb-4 flex items-center gap-2'>
        <span className='material-symbols-outlined text-primary text-[20px]'>bar_chart</span>
        Usage & Features
      </h2>

      {/* Portfolio usage bar */}
      <div className='mb-4'>
        <div className='flex items-center justify-between text-xs mb-1.5'>
          <span className='text-on-surface-variant'>Portfolios</span>
          <span className='font-medium text-on-surface'>{portfolioUsage}</span>
        </div>
        <div className='w-full h-2 bg-surface-container rounded-full overflow-hidden'>
          <div
            className={[
              "h-full rounded-full transition-all duration-500",
              gates.portfoliosUsed >= gates.portfoliosAllowed ? "bg-error" : "bg-primary",
            ].join(" ")}
            style={{
              width: gates.portfoliosAllowed === 2147483647 ? "10%" : `${Math.min(100, (gates.portfoliosUsed / gates.portfoliosAllowed) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Feature gates */}
      <div className='flex flex-col'>
        <GateRow label='Custom Domain' enabled={gates.canUseCustomDomain} onUpgrade={onUpgrade} />
        <GateRow label='Premium Templates' enabled={gates.canUsePremiumTemplates} onUpgrade={onUpgrade} />
        <GateRow
          label='Resume Upload'
          enabled={true} // free for all
          onUpgrade={onUpgrade}
        />
        <GateRow
          label='Analytics'
          enabled={true} // free for all
          onUpgrade={onUpgrade}
        />
      </div>
    </div>
  );
};

export default BillingUsage;
