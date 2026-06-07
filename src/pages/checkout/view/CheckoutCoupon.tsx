import React from "react";
import { Tag, X } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import type { ValidateCouponResponse } from "@cyopo/Models/billing/billing.model";
import { CHECKOUT_COUPON_LABEL, CHECKOUT_COUPON_APPLY, CHECKOUT_COUPON_REMOVE } from "../Checkout.constants";

interface Props {
  couponCode: string;
  couponData: ValidateCouponResponse | null;
  couponError: string | null;
  isValidating: boolean;
  onChange: (value: string) => void;
  onApply: () => void;
  onRemove: () => void;
}

const CheckoutCoupon: React.FC<Props> = ({ couponCode, couponData, couponError, isValidating, onChange, onApply, onRemove }) => (
  <div className='bg-surface border border-outline-variant/30 rounded-2xl p-6'>
    <p className='text-sm font-semibold text-on-surface mb-3 flex items-center gap-2'>
      <Tag size={15} className='text-primary' />
      {CHECKOUT_COUPON_LABEL}
    </p>

    {couponData ? (
      // Applied coupon
      <div className='flex items-center justify-between bg-success-container rounded-xl px-4 py-3'>
        <div>
          <p className='text-sm font-bold text-success'>{couponData.code}</p>
          <p className='text-xs text-success/80'>{couponData.message}</p>
        </div>
        <button onClick={onRemove} className='text-success hover:text-success/70 transition-colors' aria-label='Remove coupon'>
          <X size={16} />
        </button>
      </div>
    ) : (
      // Coupon input
      <div className='flex gap-2'>
        <input
          type='text'
          value={couponCode}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && onApply()}
          placeholder='Enter coupon code'
          className={[
            "flex-1 px-4 py-2.5 rounded-xl text-sm font-mono",
            "bg-surface-container border transition-colors outline-none",
            "text-on-surface placeholder:text-on-surface-variant/50",
            couponError ? "border-error focus:border-error" : "border-outline-variant/50 focus:border-primary",
          ].join(" ")}
        />
        <Button variant='secondary' size='sm' onClick={onApply} loading={isValidating} disabled={!couponCode.trim() || isValidating}>
          {CHECKOUT_COUPON_APPLY}
        </Button>
      </div>
    )}

    {couponError && <p className='text-xs text-error mt-2'>{couponError}</p>}
  </div>
);

export default CheckoutCoupon;
