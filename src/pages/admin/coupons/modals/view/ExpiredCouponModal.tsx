import React from "react";
import Button from "@cyopo/Components/button/Button";
import type { AdminCouponData } from "@cyopo/Models/admin/admin.models";

interface Props {
  coupon: AdminCouponData;
  onUpdateExpiry: (coupon: AdminCouponData) => void;
  onClose: () => void;
}

const ExpiredCouponModal: React.FC<Props> = ({ coupon, onUpdateExpiry, onClose }) => (
  <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' onClick={onClose}>
    <div className='bg-surface rounded-2xl shadow-xl w-full max-w-sm p-6' onClick={(e) => e.stopPropagation()}>
      {/* Icon */}
      <div className='w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center mb-4'>
        <span className='material-symbols-outlined text-error text-[24px]'>schedule</span>
      </div>

      <h3 className='font-bold text-on-surface text-lg mb-2'>Coupon expired</h3>
      <p className='text-sm text-on-surface-variant leading-relaxed mb-2'>
        <span className='font-mono font-bold text-on-surface'>{coupon.code}</span> expired on{" "}
        <strong>
          {new Date(coupon.validUntil!).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </strong>
        .
      </p>
      <p className='text-sm text-on-surface-variant leading-relaxed mb-6'>Update the expiry date to a future date before reactivating.</p>

      <div className='flex items-center gap-3'>
        <button
          onClick={() => onUpdateExpiry(coupon)}
          className='flex-1 py-2.5 rounded-xl text-sm font-medium bg-primary text-on-primary hover:opacity-90 transition-opacity'>
          Update expiry date
        </button>
        <Button variant='secondary' size='md' onClick={onClose} className='flex-1'>
          Cancel
        </Button>
      </div>
    </div>
  </div>
);

export default ExpiredCouponModal;
