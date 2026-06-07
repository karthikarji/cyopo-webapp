import React from "react";
import useAdminSubscriptions from "../controller/useAdminSubscriptions";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-success-container text-success",
  CANCELLED: "bg-warning-container text-warning",
  EXPIRED: "bg-surface-container text-on-surface-variant",
  PAST_DUE: "bg-error-container text-error",
};

const AdminSubscriptionList: React.FC = () => {
  const { state, handlers } = useAdminSubscriptions();

  return (
    <div className='flex flex-col gap-4'>
      {/* Filters */}
      <div className='flex gap-3'>
        <select
          value={state.statusFilter}
          onChange={(e) => handlers.setStatusFilter(e.target.value)}
          className='px-4 py-2.5 rounded-xl text-sm bg-surface border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20'>
          <option value=''>All Statuses</option>
          {["ACTIVE", "CANCELLED", "EXPIRED", "PAST_DUE"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {state.isLoading ? (
        <div className='flex flex-col gap-2'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='h-14 bg-surface-container rounded-xl animate-pulse' />
          ))}
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-outline-variant/20'>
                {["User", "Plan", "Cycle", "Amount", "Period End", "Status", "Action"].map((h) => (
                  <th key={h} className='text-left text-xs font-semibold text-on-surface-variant pb-3 pr-4'>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.subscriptions.map((sub) => (
                <tr key={sub.id} className='border-b border-outline-variant/10 hover:bg-surface-container/50'>
                  <td className='py-3 pr-4'>
                    <p className='font-medium text-on-surface text-xs'>{sub.user?.name ?? "—"}</p>
                    <p className='text-on-surface-variant text-[11px]'>{sub.user?.email ?? "—"}</p>
                  </td>
                  <td className='py-3 pr-4 text-xs text-on-surface'>{sub.plan?.displayName ?? "—"}</td>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{sub.billingCycle}</td>
                  <td className='py-3 pr-4 text-xs font-semibold text-on-surface'>{handlers.formatAmount(sub.finalAmount, sub.currency)}</td>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>
                    {handlers.formatDate(sub.currentPeriodEnd)}
                    {sub.cancelAtPeriodEnd && <span className='ml-1 text-warning text-[10px]'>(cancels)</span>}
                  </td>
                  <td className='py-3 pr-4'>
                    <span
                      className={["text-[10px] font-bold px-2 py-0.5 rounded-full", STATUS_STYLES[sub.status] ?? STATUS_STYLES.EXPIRED].join(" ")}>
                      {sub.status}
                    </span>
                  </td>
                  <td className='py-3'>
                    {sub.status === "ACTIVE" && !sub.cancelAtPeriodEnd && (
                      <button onClick={() => handlers.handleOpenCancel(sub.id)} className='text-xs text-error hover:underline'>
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {state.subscriptions.length === 0 && (
                <tr>
                  <td colSpan={7} className='py-12 text-center text-sm text-on-surface-variant'>
                    No subscriptions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {state.totalPages > 1 && (
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={() => handlers.setPage((p) => Math.max(1, p - 1))}
            disabled={state.page === 1}
            className='px-4 py-2 text-sm rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container disabled:opacity-40'>
            Previous
          </button>
          <span className='text-sm text-on-surface-variant'>
            Page {state.page} of {state.totalPages}
          </span>
          <button
            onClick={() => handlers.setPage((p) => Math.min(state.totalPages, p + 1))}
            disabled={state.page === state.totalPages}
            className='px-4 py-2 text-sm rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container disabled:opacity-40'>
            Next
          </button>
        </div>
      )}

      {/* Cancel modal */}
      {state.showCancelModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
          <div className='bg-surface border border-outline-variant/20 rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4'>
            <h3 className='font-headline font-bold text-on-surface text-lg'>Cancel Subscription</h3>
            <p className='text-sm text-on-surface-variant'>
              Provide a reason for admin-initiated cancellation. This will be stored in the audit log.
            </p>
            <textarea
              value={state.cancelReason}
              onChange={(e) => handlers.setCancelReason(e.target.value)}
              placeholder='Reason for cancellation...'
              rows={3}
              className='w-full px-4 py-2.5 rounded-xl text-sm bg-surface-container border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none'
            />
            <div className='flex gap-3'>
              <button
                onClick={() => handlers.setShowCancelModal(false)}
                className='flex-1 px-4 py-2.5 rounded-xl border border-outline-variant text-sm text-on-surface hover:bg-surface-container'>
                Close
              </button>
              <button
                onClick={handlers.handleConfirmCancel}
                disabled={!state.cancelReason.trim()}
                className='flex-1 px-4 py-2.5 rounded-xl bg-error text-on-error text-sm font-medium hover:opacity-90 disabled:opacity-50'>
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubscriptionList;
