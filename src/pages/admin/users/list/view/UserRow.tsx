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

const UserRow: React.FC<Props> = ({ user, changingPlanId, changingStatusId, onEdit, onDetail, onTogglePlan, onToggleStatus, onDelete }) => {
  const isChangingPlan = changingPlanId === user.id;
  const isChangingStatus = changingStatusId === user.id;

  return (
    <tr className='border-b border-outline-variant/10 hover:bg-surface-container/30 transition-colors'>
      {/* User info */}
      <td className='px-4 py-3'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 font-semibold text-primary text-sm'>
            {user.name[0]?.toUpperCase()}
          </div>
          <div>
            <p className='font-medium text-sm text-on-surface'>{user.name}</p>
            <p className='text-xs text-on-surface-variant'>{user.email}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className='px-4 py-3'>
        <span
          className={[
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            user.role === "ADMIN" ? "bg-error-container text-error" : "bg-surface-container text-on-surface-variant",
          ].join(" ")}>
          {user.role}
        </span>
      </td>

      {/* Plan toggle */}
      <td className='px-4 py-3'>
        <button
          onClick={() => onTogglePlan(user)}
          disabled={isChangingPlan}
          className={[
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all",
            isChangingPlan ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-80",
            user.plan === "PREMIUM" ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant",
          ].join(" ")}>
          {isChangingPlan && <span className='w-2.5 h-2.5 border border-current border-t-transparent rounded-full animate-spin' />}
          {user.plan}
        </button>
      </td>

      {/* Status toggle */}
      <td className='px-4 py-3'>
        <button
          onClick={() => onToggleStatus(user)}
          disabled={isChangingStatus}
          className={[
            "relative w-10 h-5 rounded-full transition-colors duration-200",
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
      </td>

      {/* Portfolios */}
      <td className='px-4 py-3 text-sm text-on-surface-variant'>{user.portfolioCount}</td>

      {/* Join date */}
      <td className='px-4 py-3 text-xs text-on-surface-variant'>
        {new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      {/* Actions */}
      <td className='px-4 py-3'>
        <div className='flex items-center gap-1'>
          <button
            onClick={() => onDetail(user)}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'
            title='View details'>
            <Eye size={14} />
          </button>
          <button
            onClick={() => onEdit(user)}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'
            title='Edit user'>
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(user)}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-error-container hover:text-error transition-colors'
            title='Delete user'>
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
