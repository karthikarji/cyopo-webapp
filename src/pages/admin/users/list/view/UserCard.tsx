import React from "react";
import { Trash2, Eye, Edit2 } from "lucide-react";
import type { AdminUserData } from "@cyopo/Models/admin/admin.models";

interface Props {
  user: AdminUserData;
  changingPlanId: string | null;
  changingStatusId: string | null;
  onDetail: (u: AdminUserData) => void;
  onTogglePlan: (u: AdminUserData) => void;
  onToggleStatus: (u: AdminUserData) => void;
  onDelete: (u: AdminUserData) => void;
  onEdit: (u: AdminUserData) => void;
}

const UserCard: React.FC<Props> = ({ user, changingPlanId, changingStatusId, onDetail, onTogglePlan, onToggleStatus, onEdit, onDelete }) => {
  const isChangingPlan = changingPlanId === user.id;
  const isChangingStatus = changingStatusId === user.id;

  return (
    <div className='bg-surface border border-outline-variant/20 rounded-2xl p-4'>
      {/* Top row */}
      <div className='flex items-start gap-3 mb-3'>
        <div className='w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 font-semibold text-primary'>
          {user.name[0]?.toUpperCase()}
        </div>
        <div className='flex-1 min-w-0'>
          <p className='font-semibold text-sm text-on-surface truncate'>{user.name}</p>
          <p className='text-xs text-on-surface-variant truncate'>{user.email}</p>
        </div>
        {/* Status toggle */}
        <button
          onClick={() => onToggleStatus(user)}
          disabled={isChangingStatus}
          className={[
            "relative w-10 h-5 rounded-full transition-colors flex-shrink-0",
            isChangingStatus ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            user.status === "ACTIVE" ? "bg-primary" : "bg-outline-variant",
          ].join(" ")}>
          <span
            className={[
              "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
              user.status === "ACTIVE" ? "translate-x-5" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Middle row — role + plan + portfolios */}
      <div className='flex items-center gap-2 mb-3 flex-wrap'>
        <span
          className={[
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            user.role === "ADMIN" ? "bg-error-container text-error" : "bg-surface-container text-on-surface-variant",
          ].join(" ")}>
          {user.role}
        </span>

        <button
          onClick={() => onTogglePlan(user)}
          disabled={isChangingPlan}
          className={[
            "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full transition-all",
            isChangingPlan ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80",
            user.plan === "PREMIUM" ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant",
          ].join(" ")}>
          {isChangingPlan && <span className='w-2 h-2 border border-current border-t-transparent rounded-full animate-spin' />}
          {user.plan}
        </button>

        <span className='text-xs text-on-surface-variant'>
          {user.portfolioCount} portfolio{user.portfolioCount !== 1 ? "s" : ""}
        </span>

        <span className='text-xs text-on-surface-variant ml-auto'>
          {new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2 pt-2 border-t border-outline-variant/10'>
        <button
          onClick={() => onDetail(user)}
          className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'>
          <Eye size={13} />
          View
        </button>
        <button
          onClick={() => onEdit(user)}
          className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'>
          <Edit2 size={13} />
          Edit
        </button>
        <button
          onClick={() => onDelete(user)}
          className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-error-container hover:text-error transition-colors'>
          <Trash2 size={13} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
