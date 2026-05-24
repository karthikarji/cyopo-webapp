import React from "react";
import type { AdminCouponData, AdminCouponRedemptionData } from "@cyopo/Models/admin/admin.models";

interface Props {
  coupon: AdminCouponData;
  redemptions: AdminCouponRedemptionData[];
  isLoading: boolean;
  onClose: () => void;
}

const CouponRedemptionsModal: React.FC<Props> = ({ coupon, redemptions, isLoading, onClose }) => (
  <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' onClick={onClose}>
    <div className='bg-surface rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col' onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className='px-6 py-4 border-b border-outline-variant/20 flex-shrink-0'>
        <h3 className='font-bold text-on-surface'>
          Redemptions — <span className='font-mono'>{coupon.code}</span>
        </h3>
        <p className='text-xs text-on-surface-variant mt-0.5'>
          {coupon.usedCount} total use{coupon.usedCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Body */}
      <div className='flex-1 overflow-y-auto px-6 py-4'>
        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <div className='w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin' />
          </div>
        ) : redemptions.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-12 gap-2 text-center'>
            <span className='material-symbols-outlined text-3xl text-on-surface-variant/30'>history</span>
            <p className='text-sm text-on-surface-variant'>No redemptions yet</p>
          </div>
        ) : (
          <div className='flex flex-col divide-y divide-outline-variant/10'>
            {redemptions.map((r) => (
              <div key={r.id} className='py-3 flex items-center justify-between gap-4'>
                <div>
                  <p className='text-xs font-mono text-on-surface-variant'>{r.userId}</p>
                  <p className='text-xs text-on-surface-variant mt-0.5'>
                    {r.planBefore} → {r.planAfter}
                  </p>
                </div>
                <span className='text-xs text-on-surface-variant flex-shrink-0'>
                  {new Date(r.redeemedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='px-6 py-4 border-t border-outline-variant/20 flex-shrink-0'>
        <button
          onClick={onClose}
          className='w-full py-2.5 border border-outline-variant/30 rounded-xl text-sm text-on-surface-variant hover:bg-surface-container transition-colors'>
          Close
        </button>
      </div>
    </div>
  </div>
);

export default CouponRedemptionsModal;
