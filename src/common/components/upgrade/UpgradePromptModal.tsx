import React from "react";
import { Zap, X } from "lucide-react";
import Button from "@cyopo/Components/button/Button";

interface Props {
  title: string;
  description: string;
  feature: string; // e.g. "PORTFOLIO_LIMIT" | "PREMIUM_TEMPLATE"
  currentPlan: string;
  onUpgrade: () => void;
  onClose: () => void;
}

// Feature-specific messaging
const FEATURE_CONTENT: Record<
  string,
  {
    icon: string;
    perks: string[];
  }
> = {
  PORTFOLIO_LIMIT: {
    icon: "folder_special",
    perks: ["Up to 5 portfolios on Premium", "Unlimited portfolios on Pro", "All premium templates", "Custom domain"],
  },
  PREMIUM_TEMPLATE: {
    icon: "style",
    perks: ["Access all premium templates", "Custom domain support", "No cyopo branding", "Up to 5 portfolios"],
  },
  CUSTOM_DOMAIN: {
    icon: "language",
    perks: ["Connect your own domain", "Professional branding", "All premium templates", "Up to 5 portfolios"],
  },
  DEFAULT: {
    icon: "workspace_premium",
    perks: ["All premium templates", "Custom domain", "More portfolios", "No cyopo branding"],
  },
};

const getFeatureContent = (feature: string, currentPlan: string) => {
  if (currentPlan === "PREMIUM") {
    return {
      icon: "workspace_premium",
      perks: [
        "Unlimited portfolios",
        "Unlimited projects per portfolio",
        "Priority support",
        "Early access to new features",
        "Remove cyopo branding",
      ],
    };
  }
  return FEATURE_CONTENT[feature] ?? FEATURE_CONTENT.DEFAULT;
};

const UpgradePromptModal: React.FC<Props> = ({ title, description, feature, currentPlan, onUpgrade, onClose }) => {
  const content = getFeatureContent(feature, currentPlan);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
      <div className='bg-surface border border-outline-variant/20 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-5 border-b border-outline-variant/10'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center'>
              <Zap size={18} className='text-primary' />
            </div>
            <h3 className='font-headline font-bold text-on-surface text-base'>{title}</h3>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors'>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className='p-5 flex flex-col gap-4'>
          <p className='text-sm text-on-surface-variant'>{description}</p>

          {/* Current plan chip */}
          <div className='flex items-center gap-2 text-xs text-on-surface-variant'>
            <span>Your plan:</span>
            <span className='px-2 py-0.5 rounded-full bg-surface-container font-bold text-on-surface'>{currentPlan}</span>
            <span className='text-on-surface-variant/50'>→</span>
            <span className='px-2 py-0.5 rounded-full bg-primary text-on-primary font-bold'>
              {currentPlan === "FREE" ? "PREMIUM" : "PRO"} {/* ← smart upgrade target */}
            </span>
          </div>

          {/* Perks */}
          <div className='bg-surface-container rounded-xl p-4'>
            <p className='text-xs font-semibold text-on-surface mb-2.5'>
              {currentPlan === "FREE" ? "Unlock with Premium or Pro:" : "Unlock with Pro:"}
            </p>
            <ul className='flex flex-col gap-2'>
              {content.perks.map((perk) => (
                <li key={perk} className='flex items-center gap-2 text-xs text-on-surface-variant'>
                  <span className='material-symbols-outlined text-primary text-sm' style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className='p-5 pt-0 flex flex-col gap-2'>
          <Button variant='primary' size='md' fullWidth onClick={onUpgrade} leftIcon={<Zap size={14} />} className='shadow-md'>
            Upgrade now
          </Button>
          <button onClick={onClose} className='text-xs text-on-surface-variant hover:text-on-surface transition-colors text-center py-1'>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePromptModal;
