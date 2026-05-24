import React from "react";
import Button from "@cyopo/Components/button/Button";
import type { AdminCouponData } from "@cyopo/Models/admin/admin.models";

interface Props {
  coupon: AdminCouponData;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteCouponModal: React.FC<Props> = ({ coupon, isDeleting, onConfirm, onClose }) => (
  <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' onClick={onClose}>
    <div className='bg-surface rounded-2xl shadow-xl w-full max-w-sm p-6' onClick={(e) => e.stopPropagation()}>
      <div className='w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center mb-4'>
        <span className='material-symbols-outlined text-error text-[24px]'>local_offer</span>
      </div>
      <h3 className='font-bold text-on-surface text-lg mb-2'>Delete coupon?</h3>
      <p className='text-sm text-on-surface-variant leading-relaxed mb-6'>
        Delete <strong className='font-mono'>{coupon.code}</strong>? This cannot be undone. Existing redemptions will be preserved.
      </p>
      <div className='flex items-center gap-3'>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className={[
            "flex-1 py-2.5 rounded-xl text-sm font-medium bg-error text-on-error",
            isDeleting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90",
          ].join(" ")}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        <Button variant='secondary' size='md' onClick={onClose} className='flex-1'>
          Cancel
        </Button>
      </div>
    </div>
  </div>
);

export default DeleteCouponModal;
