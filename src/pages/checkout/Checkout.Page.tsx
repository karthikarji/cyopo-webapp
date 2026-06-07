import React from "react";
import useCheckout from "./controller/useCheckout";
import CheckoutSummary from "./view/CheckoutSummary";
import CheckoutCoupon from "./view/CheckoutCoupon";
import CheckoutPayButton from "./view/CheckoutPayButton";
import CheckoutSkeleton from "./view/CheckoutSkeleton";
import { CHECKOUT_TITLE, CHECKOUT_SUBTITLE } from "./Checkout.constants";

const CheckoutPage: React.FC = () => {
  const { state, handlers } = useCheckout();

  if (state.isLoading)
    return (
      <div className='min-h-screen bg-background flex flex-col'>
        <div className='flex-1 flex flex-col items-center justify-center px-4 py-12'>
          <CheckoutSkeleton />
        </div>
      </div>
    );

  if (!state.plan) return null;

  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16'>
        {/* Header */}
        <div className='text-center mb-8 sm:mb-12'>
          <div className='inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-container mb-4'>
            <span className='material-symbols-outlined text-on-primary-container text-2xl' style={{ fontVariationSettings: "'FILL' 1" }}>
              lock
            </span>
          </div>
          <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl mb-2'>{CHECKOUT_TITLE}</h1>
          <p className='text-on-surface-variant text-sm sm:text-base max-w-md mx-auto'>{CHECKOUT_SUBTITLE}</p>
        </div>

        {/* Two column layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start'>
          {/* Left — Order summary */}
          <CheckoutSummary
            plan={state.plan}
            cycle={state.cycle}
            basePrice={state.basePrice}
            discountAmount={state.discountAmount}
            subtotal={state.subtotal}
            gstAmount={state.gstAmount}
            total={state.total}
            couponData={state.couponData}
            formatPrice={handlers.formatPrice}
          />

          {/* Right — Coupon + Pay */}
          <div className='flex flex-col gap-4'>
            <CheckoutCoupon
              couponCode={state.couponCode}
              couponData={state.couponData}
              couponError={state.couponError}
              isValidating={state.isValidating}
              onChange={handlers.setCouponCode}
              onApply={handlers.handleApplyCoupon}
              onRemove={handlers.handleRemoveCoupon}
            />
            <CheckoutPayButton total={state.total} isPaying={state.isPaying} formatPrice={handlers.formatPrice} onPay={handlers.handlePay} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
