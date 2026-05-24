import React from "react";
import { Search } from "lucide-react";
import useAdminUsersPage from "./common/hooks/useAdminUsersPage";
import UserList from "./list/view/UserList";
import UserDetailModal from "./modals/view/UserDetailModal";
import DeleteUserModal from "./modals/view/DeleteUserModal";
import type { UserPlan, UserStatus } from "@cyopo/Models/admin/admin.models";
import EditUserModal from "./modals/view/EditUserModal";

const AdminUsersPage: React.FC = () => {
  const { state, handlers } = useAdminUsersPage();

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div>
        <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>Users</h1>
        <p className='text-sm text-on-surface-variant mt-1'>
          {state.totalCount} user{state.totalCount !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <div className='relative flex-1'>
          <Search size={15} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant' />
          <input
            type='text'
            value={state.search}
            onChange={(e) => handlers.handleSearchChange(e.target.value)}
            placeholder='Search by name or email...'
            className={[
              "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm",
              "bg-surface border border-outline-variant/30",
              "text-on-surface placeholder:text-on-surface-variant/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "focus:border-primary/40 transition-all duration-200",
            ].join(" ")}
          />
        </div>
        <div className='flex gap-3'>
          <select
            value={state.planFilter}
            onChange={(e) => handlers.handlePlanFilter(e.target.value as UserPlan | "")}
            className={[
              "flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm",
              "bg-surface border border-outline-variant/30 text-on-surface",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "focus:border-primary/40 transition-all duration-200",
            ].join(" ")}>
            <option value=''>All Plans</option>
            <option value='FREE'>Free</option>
            <option value='PREMIUM'>Premium</option>
          </select>
          <select
            value={state.statusFilter}
            onChange={(e) => handlers.handleStatusFilter(e.target.value as UserStatus | "")}
            className={[
              "flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm",
              "bg-surface border border-outline-variant/30 text-on-surface",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "focus:border-primary/40 transition-all duration-200",
            ].join(" ")}>
            <option value=''>All Status</option>
            <option value='ACTIVE'>Active</option>
            <option value='SUSPENDED'>Suspended</option>
          </select>
        </div>
      </div>

      {/* User list */}
      <UserList
        users={state.users}
        isLoading={state.isLoading}
        changingPlanId={state.changingPlanId}
        changingStatusId={state.changingStatusId}
        onDetail={handlers.handleOpenDetail}
        onTogglePlan={handlers.handleTogglePlan}
        onToggleStatus={handlers.handleToggleStatus}
        onDelete={handlers.handleOpenDelete}
        onEdit={handlers.handleOpenEdit}
      />

      {/* Pagination */}
      {state.totalPages > 1 && (
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={() => handlers.setPage((p) => Math.max(1, p - 1))}
            disabled={state.page === 1}
            className='px-4 py-2 text-sm rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-colors'>
            Previous
          </button>
          <span className='text-sm text-on-surface-variant'>
            Page {state.page} of {state.totalPages}
          </span>
          <button
            onClick={() => handlers.setPage((p) => Math.min(state.totalPages, p + 1))}
            disabled={state.page === state.totalPages}
            className='px-4 py-2 text-sm rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container disabled:opacity-40 transition-colors'>
            Next
          </button>
        </div>
      )}

      {/* Detail modal */}
      {state.detailModalOpen && state.selectedUser && (
        <UserDetailModal user={state.selectedUser} onClose={() => handlers.setDetailModalOpen(false)} />
      )}

      {state.editModalOpen && state.selectedUser && (
        <EditUserModal
          user={state.selectedUser}
          isSaving={state.isSavingUser}
          onSave={handlers.handleSaveUser}
          onClose={() => handlers.setEditModalOpen(false)}
        />
      )}

      {/* Delete modal */}
      {state.deleteModalOpen && state.selectedUser && (
        <DeleteUserModal
          user={state.selectedUser}
          isDeleting={state.isDeleting}
          onConfirm={handlers.handleConfirmDelete}
          onClose={() => handlers.setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminUsersPage;
