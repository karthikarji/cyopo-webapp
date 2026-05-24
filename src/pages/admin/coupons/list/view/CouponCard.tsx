import React from "react";
import { Edit2, Trash2, History } from "lucide-react";
import type { AdminCouponData } from "@cyopo/Models/admin/admin.models";

interface Props {
  coupon: AdminCouponData;
  togglingId: string | null;
  onEdit: (c: AdminCouponData) => void;
  onToggleActive: (c: AdminCouponData) => void;
  onDelete: (c: AdminCouponData) => void;
  onRedemptions: (c: AdminCouponData) => void;
}

const discountLabel = (coupon: AdminCouponData): string => {
  if (coupon.discountType === "FULL") return "100% OFF";
  if (coupon.discountType === "PERCENTAGE") return `${coupon.discountValue}% OFF`;
  return `$${coupon.discountValue} OFF`;
};

const CouponCard: React.FC<Props> = ({ coupon, togglingId, onEdit, onToggleActive, onDelete, onRedemptions }) => {
  const isToggling = togglingId === coupon.id;

  return (
    <div className='bg-surface border border-outline-variant/20 rounded-2xl p-4'>
      {/* Top row — code + toggle */}
      <div className='flex items-start justify-between gap-3 mb-3'>
        <div>
          <p className='font-bold text-on-surface font-mono tracking-wider'>{coupon.code}</p>
          {coupon.description && <p className='text-xs text-on-surface-variant mt-0.5'>{coupon.description}</p>}
        </div>
        <button
          onClick={() => onToggleActive(coupon)}
          disabled={isToggling}
          className={[
            "relative w-10 h-5 rounded-full transition-colors flex-shrink-0",
            isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            coupon.isActive ? "bg-primary" : "bg-outline-variant",
          ].join(" ")}>
          <span
            className={[
              "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
              coupon.isActive ? "translate-x-5" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Middle — discount + usage + expiry */}
      <div className='flex flex-wrap items-center gap-2 mb-3'>
        <span className='px-2 py-0.5 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full'>{discountLabel(coupon)}</span>
        <span className='text-xs text-on-surface-variant'>
          {coupon.usedCount}
          {coupon.maxUses ? `/${coupon.maxUses}` : "/∞"} uses
        </span>
        {coupon.validUntil && (
          <span className='text-xs text-on-surface-variant ml-auto'>
            Expires{" "}
            {new Date(coupon.validUntil).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
      </div>

      {/* Audience */}
      <div className='mb-3'>
        <span
          className={[
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            coupon.isPublic ? "bg-surface-container text-on-surface-variant" : "bg-primary-container text-on-primary-container",
          ].join(" ")}>
          {coupon.isPublic ? "ALL USERS" : `${coupon.targetUserIds.length} SPECIFIC USERS`}
        </span>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2 pt-2 border-t border-outline-variant/10'>
        <button
          onClick={() => onRedemptions(coupon)}
          className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'>
          <History size={13} />
          History
        </button>
        <button
          onClick={() => onEdit(coupon)}
          className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'>
          <Edit2 size={13} />
          Edit
        </button>
        <button
          onClick={() => onDelete(coupon)}
          className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-error-container hover:text-error transition-colors'>
          <Trash2 size={13} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default CouponCard;
