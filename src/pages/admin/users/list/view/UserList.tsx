import React from "react";
import UserRow from "./UserRow";
import UserCard from "./UserCard";
import type { AdminUserData } from "@cyopo/Models/admin/admin.models";

interface Props {
  users: AdminUserData[];
  isLoading: boolean;
  changingPlanId: string | null;
  changingStatusId: string | null;
  onDetail: (u: AdminUserData) => void;
  onTogglePlan: (u: AdminUserData) => void;
  onToggleStatus: (u: AdminUserData) => void;
  onDelete: (u: AdminUserData) => void;
  onEdit: (u: AdminUserData) => void;
}

const UserList: React.FC<Props> = ({
  users,
  isLoading,
  changingPlanId,
  changingStatusId,
  onDetail,
  onTogglePlan,
  onToggleStatus,
  onDelete,
  onEdit,
}) => {
  const rowProps = {
    changingPlanId,
    changingStatusId,
    onDetail,
    onTogglePlan,
    onToggleStatus,
    onDelete,
    onEdit,
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-24'>
        <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-24 gap-3 text-center'>
        <span className='material-symbols-outlined text-4xl text-on-surface-variant/30'>group</span>
        <p className='font-medium text-on-surface'>No users found</p>
        <p className='text-sm text-on-surface-variant'>Try adjusting your search or filters.</p>
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
              {["User", "Role", "Plan", "Status", "Portfolios", "Joined", "Actions"].map((h) => (
                <th key={h} className='px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} {...rowProps} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className='flex flex-col gap-3 md:hidden'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} {...rowProps} onEdit={onEdit} />
        ))}
      </div>
    </>
  );
};

export default UserList;
