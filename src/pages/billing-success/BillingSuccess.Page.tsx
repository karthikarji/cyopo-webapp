import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import SuccessAnimation from "./view/SuccessAnimation";
import useBillingSuccess from "./controller/useBillingSuccess";

const BillingSuccessPage: React.FC = () => {
  const { handlers } = useBillingSuccess();

  return (
    <div className='min-h-screen bg-background flex items-center justify-center px-4'>
      {/* Confetti canvas — fixed overlay */}
      <SuccessAnimation />

      {/* Success card */}
      <div className='relative z-10 bg-surface border border-outline-variant/30 rounded-3xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center'>
        {/* Icon */}
        <div className='flex items-center justify-center mb-6'>
          <div className='w-20 h-20 rounded-full bg-success-container flex items-center justify-center'>
            <CheckCircle size={40} className='text-success' />
          </div>
        </div>

        {/* Text */}
        <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl mb-3'>Payment successful!</h1>
        <p className='text-on-surface-variant text-sm sm:text-base mb-2'>Welcome to the premium experience. Your plan has been activated.</p>
        <p className='text-xs text-on-surface-variant/70 mb-8'>Redirecting you to dashboard in a few seconds…</p>

        {/* CTA */}
        <Button
          variant='primary'
          size='lg'
          fullWidth
          onClick={handlers.handleGoToDashboard}
          rightIcon={<ArrowRight size={16} />}
          className='shadow-md'>
          Go to Dashboard
        </Button>

        {/* Invoice note */}
        <p className='text-xs text-on-surface-variant mt-4'>
          Your invoice will appear in <span className='text-primary font-medium'>Settings → Billing</span>
        </p>
      </div>
    </div>
  );
};

export default BillingSuccessPage;
