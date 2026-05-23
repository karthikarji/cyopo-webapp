import React from "react";
import { Plus, Search } from "lucide-react";
import useAdminPage from "./common/hooks/useAdminPage";
import TemplateList from "./templates/view/TemplateList";
import TemplateFormModal from "./templates/view/TemplateFormModal";
import DeleteTemplateModal from "./templates/view/DeleteTemplateModal";
import type { TemplateStatus } from "@cyopo/Models/admin/admin.models";

const AdminPage: React.FC = () => {
  const { state, handlers } = useAdminPage();

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>Templates</h1>
          <p className='text-sm text-on-surface-variant mt-1'>
            {state.totalCount} template{state.totalCount !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={handlers.handleOpenCreate}
          className='flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary text-sm font-medium rounded-xl hover:opacity-90 transition-opacity'>
          <Plus size={16} />
          New Template
        </button>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-3'>
        {/* Search — full width */}
        <div className='relative flex-1'>
          <Search size={15} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant' />
          <input
            type='text'
            value={state.search}
            onChange={(e) => handlers.handleSearchChange(e.target.value)}
            placeholder='Search templates...'
            className={[
              "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm",
              "bg-surface border border-outline-variant/30",
              "text-on-surface placeholder:text-on-surface-variant/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "focus:border-primary/40 transition-all duration-200",
            ].join(" ")}
          />
        </div>

        {/* Status + Premium — side by side on mobile too */}
        <div className='flex gap-3'>
          <select
            value={state.statusFilter}
            onChange={(e) => handlers.handleStatusFilter(e.target.value as TemplateStatus | "")}
            className={[
              "flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm",
              "bg-surface border border-outline-variant/30 text-on-surface",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "focus:border-primary/40 transition-all duration-200",
            ].join(" ")}>
            <option value=''>All Status</option>
            <option value='ACTIVE'>Active</option>
            <option value='INACTIVE'>Inactive</option>
          </select>

          <select
            value={String(state.premiumFilter)}
            onChange={(e) => {
              const val = e.target.value;
              handlers.handlePremiumFilter(val === "" ? "" : val === "true");
            }}
            className={[
              "flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm",
              "bg-surface border border-outline-variant/30 text-on-surface",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "focus:border-primary/40 transition-all duration-200",
            ].join(" ")}>
            <option value=''>All Plans</option>
            <option value='false'>Free</option>
            <option value='true'>Premium</option>
          </select>
        </div>
      </div>

      {/* Template list */}
      <TemplateList
        templates={state.templates}
        isLoading={state.isLoading}
        togglingId={state.togglingId}
        duplicatingId={state.duplicatingId}
        onEdit={handlers.handleOpenEdit}
        onDuplicate={handlers.handleDuplicate}
        onDelete={handlers.handleOpenDelete}
        onToggle={handlers.handleToggleStatus}
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

      {/* Create/Edit modal */}
      {state.formModalOpen && (
        <TemplateFormModal template={state.editingTemplate} onSuccess={handlers.handleFormSuccess} onClose={() => handlers.setFormModalOpen(false)} />
      )}

      {/* Delete modal */}
      {state.deleteModalOpen && (
        <DeleteTemplateModal
          isDeleting={state.isDeleting}
          onConfirm={handlers.handleConfirmDelete}
          onClose={() => handlers.setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPage;
