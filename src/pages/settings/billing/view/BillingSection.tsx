import React from "react";
import useBillingSection from "../controller/useBillingSection";
import BillingCurrentPlan from "./BillingCurrentPlan";
import BillingUsage from "./BillingUsage";
import BillingInvoices from "./BillingInvoices";
import BillingCancelModal from "./BillingCancelModal";

const BillingSection: React.FC = () => {
  const { state, handlers } = useBillingSection();

  if (state.isLoading) {
    return (
      <div className='flex flex-col gap-4'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='bg-surface border border-outline-variant/20 rounded-2xl p-6 animate-pulse'>
            <div className='h-5 w-32 bg-surface-container rounded mb-4' />
            <div className='h-20 bg-surface-container rounded-xl' />
          </div>
        ))}
      </div>
    );
  }

  if (!state.user) return null;

  return (
    <div className='flex flex-col gap-5'>
      {/* Current plan */}
      <BillingCurrentPlan
        user={state.user}
        subscription={state.subscription}
        canCancel={state.canCancel}
        isPaidPlan={state.isPaidPlan}
        formatDate={handlers.formatDate}
        formatPrice={handlers.formatPrice}
        onUpgrade={handlers.handleUpgrade}
        onCancel={() => handlers.setShowCancelModal(true)}
      />

      {/* Usage + feature gates */}
      {state.gates && <BillingUsage gates={state.gates} onUpgrade={handlers.handleUpgrade} />}

      {/* Invoice history */}
      <BillingInvoices invoices={state.invoices} formatDate={handlers.formatDate} formatPrice={handlers.formatPrice} />

      {/* Cancel modal */}
      {state.showCancelModal && state.subscription && (
        <BillingCancelModal
          periodEnd={handlers.formatDate(state.subscription.currentPeriodEnd)}
          reason={state.cancelReason}
          isCancelling={state.isCancelling}
          onReasonChange={handlers.setCancelReason}
          onConfirm={handlers.handleCancelSubscription}
          onClose={() => {
            handlers.setShowCancelModal(false);
            handlers.setCancelReason("");
          }}
        />
      )}
    </div>
  );
};

export default BillingSection;
