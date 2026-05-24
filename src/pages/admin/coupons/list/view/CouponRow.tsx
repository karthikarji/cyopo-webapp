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

const CouponRow: React.FC<Props> = ({ coupon, togglingId, onEdit, onToggleActive, onDelete, onRedemptions }) => {
  const isToggling = togglingId === coupon.id;

  return (
    <tr className='border-b border-outline-variant/10 hover:bg-surface-container/30 transition-colors'>
      {/* Code + description */}
      <td className='px-4 py-3'>
        <p className='font-bold text-sm text-on-surface font-mono'>{coupon.code}</p>
        {coupon.description && <p className='text-xs text-on-surface-variant truncate max-w-[180px]'>{coupon.description}</p>}
      </td>

      {/* Discount */}
      <td className='px-4 py-3'>
        <span className='px-2 py-0.5 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full'>{discountLabel(coupon)}</span>
      </td>

      {/* Usage */}
      <td className='px-4 py-3 text-sm text-on-surface-variant'>
        {coupon.usedCount}
        {coupon.maxUses ? ` / ${coupon.maxUses}` : " / ∞"}
      </td>

      {/* Expiry */}
      <td className='px-4 py-3 text-xs text-on-surface-variant'>
        {coupon.validUntil
          ? new Date(coupon.validUntil).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—"}
      </td>

      {/* Audience */}
      <td className='px-4 py-3'>
        <span
          className={[
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            coupon.isPublic ? "bg-surface-container text-on-surface-variant" : "bg-primary-container text-on-primary-container",
          ].join(" ")}>
          {coupon.isPublic ? "ALL USERS" : `${coupon.targetUserIds.length} USER${coupon.targetUserIds.length !== 1 ? "S" : ""}`}
        </span>
      </td>

      {/* Active toggle */}
      <td className='px-4 py-3'>
        <button
          onClick={() => onToggleActive(coupon)}
          disabled={isToggling}
          className={[
            "relative w-10 h-5 rounded-full transition-colors duration-200",
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
      </td>

      {/* Actions */}
      <td className='px-4 py-3'>
        <div className='flex items-center gap-1'>
          <button
            onClick={() => onRedemptions(coupon)}
            title='View redemptions'
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'>
            <History size={14} />
          </button>
          <button
            onClick={() => onEdit(coupon)}
            title='Edit'
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'>
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(coupon)}
            title='Delete'
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-error-container hover:text-error transition-colors'>
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CouponRow;
