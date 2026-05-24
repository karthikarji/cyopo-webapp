import React from "react";
import CouponRow from "./CouponRow";
import CouponCard from "./CouponCard";
import type { AdminCouponData } from "@cyopo/Models/admin/admin.models";

interface Props {
  coupons: AdminCouponData[];
  isLoading: boolean;
  togglingId: string | null;
  onEdit: (c: AdminCouponData) => void;
  onToggleActive: (c: AdminCouponData) => void;
  onDelete: (c: AdminCouponData) => void;
  onRedemptions: (c: AdminCouponData) => void;
}

const CouponList: React.FC<Props> = ({ coupons, isLoading, togglingId, onEdit, onToggleActive, onDelete, onRedemptions }) => {
  const rowProps = { togglingId, onEdit, onToggleActive, onDelete, onRedemptions };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-24'>
        <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!coupons || coupons.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-24 gap-3 text-center'>
        <span className='material-symbols-outlined text-4xl text-on-surface-variant/30'>local_offer</span>
        <p className='font-medium text-on-surface'>No coupons yet</p>
        <p className='text-sm text-on-surface-variant'>Create your first coupon to get started.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className='hidden md:block bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-outline-variant/20 bg-surface-container/50'>
              {["Code", "Discount", "Usage", "Expires", "Audience", "Active", "Actions"].map((h) => (
                <th key={h} className='px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <CouponRow key={coupon.id} coupon={coupon} {...rowProps} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className='flex flex-col gap-3 md:hidden'>
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} {...rowProps} />
        ))}
      </div>
    </>
  );
};

export default CouponList;
