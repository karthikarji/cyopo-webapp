import React from "react";
import { Plus, Search } from "lucide-react";
import useAdminCouponsPage from "./common/hooks/useAdminCouponsPage";
import CouponList from "./list/view/CouponList";
import CouponFormModal from "./modals/view/CouponFormModal";
import CouponRedemptionsModal from "./modals/view/CouponRedemptionsModal";
import DeleteCouponModal from "./modals/view/DeleteCouponModal";
import ExpiredCouponModal from "./modals/view/ExpiredCouponModal";

const AdminCouponsPage: React.FC = () => {
  const { state, handlers } = useAdminCouponsPage();

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>Coupons</h1>
          <p className='text-sm text-on-surface-variant mt-1'>
            {state.totalCount} coupon{state.totalCount !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={handlers.handleOpenCreate}
          className='flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary text-sm font-medium rounded-xl hover:opacity-90 transition-opacity'>
          <Plus size={16} />
          New Coupon
        </button>
      </div>

      {/* Search */}
      <div className='relative max-w-sm'>
        <Search size={15} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant' />
        <input
          type='text'
          value={state.search}
          onChange={(e) => handlers.handleSearchChange(e.target.value)}
          placeholder='Search coupons...'
          className={[
            "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm",
            "bg-surface border border-outline-variant/30",
            "text-on-surface placeholder:text-on-surface-variant/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "focus:border-primary/40 transition-all duration-200",
          ].join(" ")}
        />
      </div>

      {/* Coupon list */}
      <CouponList
        coupons={state.coupons}
        isLoading={state.isLoading}
        togglingId={state.togglingId}
        onEdit={handlers.handleOpenEdit}
        onToggleActive={handlers.handleToggleActive}
        onDelete={handlers.handleOpenDelete}
        onRedemptions={handlers.handleOpenRedemptions}
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
        <CouponFormModal coupon={state.selectedCoupon} onSuccess={handlers.handleFormSuccess} onClose={() => handlers.setFormModalOpen(false)} />
      )}

      {/* Redemptions modal */}
      {state.redemptionsModalOpen && state.selectedCoupon && (
        <CouponRedemptionsModal
          coupon={state.selectedCoupon}
          redemptions={state.redemptions}
          isLoading={state.isLoadingRedemptions}
          onClose={() => handlers.setRedemptionsModalOpen(false)}
        />
      )}

      {/* Delete modal */}
      {state.deleteModalOpen && state.selectedCoupon && (
        <DeleteCouponModal
          coupon={state.selectedCoupon}
          isDeleting={state.isDeleting}
          onConfirm={handlers.handleConfirmDelete}
          onClose={() => handlers.setDeleteModalOpen(false)}
        />
      )}
      {state.expiredModalOpen && state.expiredCoupon && (
        <ExpiredCouponModal
          coupon={state.expiredCoupon}
          onUpdateExpiry={handlers.handleUpdateExpiry}
          onClose={() => handlers.setExpiredModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminCouponsPage;
