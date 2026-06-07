import React from "react";
import { Zap, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import type { Subscription } from "@cyopo/Models/billing/billing.model";
import type { UserProfile } from "@cyopo/Services/api/user/UserAPIService";

interface Props {
  user: UserProfile;
  subscription: Subscription | null;
  canCancel: boolean;
  isPaidPlan: boolean;
  formatDate: (d: string) => string;
  formatPrice: (amount: number, currency: string) => string;
  onUpgrade: () => void;
  onCancel: () => void;
}

const PLAN_STYLES: Record<string, string> = {
  FREE: "bg-surface-container text-on-surface-variant",
  PREMIUM: "bg-primary text-on-primary",
  PRO: "bg-tertiary text-on-tertiary",
};

const BillingCurrentPlan: React.FC<Props> = ({ user, subscription, canCancel, isPaidPlan, formatDate, formatPrice, onUpgrade, onCancel }) => {
  const planStyle = PLAN_STYLES[user.plan] ?? PLAN_STYLES.FREE;

  return (
    <div className='bg-surface border border-outline-variant/20 rounded-2xl p-6'>
      <h2 className='font-semibold text-on-surface mb-5 flex items-center gap-2'>
        <span className='material-symbols-outlined text-primary text-[20px]'>workspace_premium</span>
        Current Plan
      </h2>

      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5'>
        {/* Plan badge + name */}
        <div className='flex items-center gap-3'>
          <span className={["px-3 py-1 rounded-full text-sm font-bold", planStyle].join(" ")}>{user.plan}</span>
          {subscription && (
            <span className='text-sm text-on-surface-variant'>{subscription.billingCycle === "ANNUAL" ? "Annual" : "Monthly"} billing</span>
          )}
        </div>

        {/* Upgrade button */}
        {!isPaidPlan && (
          <Button variant='primary' size='sm' leftIcon={<Zap size={14} />} onClick={onUpgrade}>
            Upgrade plan
          </Button>
        )}
        {isPaidPlan && user.plan !== "PRO" && (
          <Button variant='secondary' size='sm' leftIcon={<Zap size={14} />} onClick={onUpgrade}>
            Upgrade to Pro
          </Button>
        )}
      </div>

      {/* Subscription details */}
      {subscription && (
        <div className='flex flex-col gap-3 p-4 bg-surface-container rounded-xl mb-4'>
          {/* Amount */}
          <div className='flex items-center justify-between text-sm'>
            <span className='text-on-surface-variant'>Amount</span>
            <span className='font-semibold text-on-surface'>
              {formatPrice(subscription.finalAmount, subscription.currency)}
              <span className='font-normal text-on-surface-variant ml-1'>/ {subscription.billingCycle === "ANNUAL" ? "year" : "month"}</span>
            </span>
          </div>

          {/* Next billing / access until */}
          <div className='flex items-center justify-between text-sm'>
            <span className='text-on-surface-variant flex items-center gap-1.5'>
              <Calendar size={13} />
              {subscription.cancelAtPeriodEnd ? "Access until" : "Next billing"}
            </span>
            <span className='font-medium text-on-surface'>{formatDate(subscription.currentPeriodEnd)}</span>
          </div>

          {/* Status */}
          <div className='flex items-center justify-between text-sm'>
            <span className='text-on-surface-variant'>Status</span>
            <span
              className={[
                "flex items-center gap-1 font-medium",
                subscription.cancelAtPeriodEnd ? "text-warning" : subscription.status === "ACTIVE" ? "text-success" : "text-error",
              ].join(" ")}>
              {subscription.cancelAtPeriodEnd ? (
                <>
                  <AlertCircle size={13} />
                  Cancels {formatDate(subscription.currentPeriodEnd)}
                </>
              ) : subscription.status === "ACTIVE" ? (
                <>
                  <CheckCircle size={13} />
                  Active
                </>
              ) : (
                subscription.status
              )}
            </span>
          </div>
        </div>
      )}

      {/* FREE plan note */}
      {!isPaidPlan && (
        <p className='text-sm text-on-surface-variant'>
          You are on the free plan. Upgrade to unlock premium templates, custom domain, and more portfolios.
        </p>
      )}

      {/* Cancel button */}
      {canCancel && (
        <button onClick={onCancel} className='text-xs text-error hover:underline mt-2'>
          Cancel subscription
        </button>
      )}
    </div>
  );
};

export default BillingCurrentPlan;
