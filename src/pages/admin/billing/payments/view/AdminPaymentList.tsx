import React from "react";
import useAdminPayments from "../controller/useAdminPayments";

const STATUS_STYLES: Record<string, string> = {
  CAPTURED: "bg-success-container text-success",
  FAILED: "bg-error-container text-error",
  REFUNDED: "bg-warning-container text-warning",
  PARTIALLY_REFUNDED: "bg-warning-container text-warning",
  CREATED: "bg-surface-container text-on-surface-variant",
};

const AdminPaymentList: React.FC = () => {
  const { state, handlers } = useAdminPayments();

  return (
    <div className='flex flex-col gap-4'>
      {/* Filters */}
      <select
        value={state.statusFilter}
        onChange={(e) => handlers.setStatusFilter(e.target.value)}
        className='w-48 px-4 py-2.5 rounded-xl text-sm bg-surface border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20'>
        <option value=''>All Statuses</option>
        {["CAPTURED", "FAILED", "REFUNDED", "PARTIALLY_REFUNDED"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

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
                {["User", "Payment ID", "Amount", "Method", "Date", "Status", "Action"].map((h) => (
                  <th key={h} className='text-left text-xs font-semibold text-on-surface-variant pb-3 pr-4'>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.payments.map((payment) => (
                <tr key={payment.id} className='border-b border-outline-variant/10 hover:bg-surface-container/50'>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{payment.user?.email ?? "—"}</td>
                  <td className='py-3 pr-4 font-mono text-[11px] text-on-surface-variant'>{payment.gatewayPaymentId?.slice(0, 16) ?? "—"}...</td>
                  <td className='py-3 pr-4 text-xs font-semibold text-on-surface'>
                    {handlers.formatAmount(payment.totalAmount, payment.currency)}
                    {payment.refundAmount > 0 && (
                      <span className='ml-1 text-warning text-[10px]'>(-{handlers.formatAmount(payment.refundAmount, payment.currency)})</span>
                    )}
                  </td>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant capitalize'>{payment.paymentMethod ?? "—"}</td>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{handlers.formatDate(payment.createdAt)}</td>
                  <td className='py-3 pr-4'>
                    <span
                      className={["text-[10px] font-bold px-2 py-0.5 rounded-full", STATUS_STYLES[payment.status] ?? STATUS_STYLES.CREATED].join(
                        " ",
                      )}>
                      {payment.status}
                    </span>
                  </td>
                  <td className='py-3'>
                    {payment.status === "CAPTURED" && (
                      <button onClick={() => handlers.handleOpenRefund(payment.id)} className='text-xs text-primary hover:underline'>
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {state.payments.length === 0 && (
                <tr>
                  <td colSpan={7} className='py-12 text-center text-sm text-on-surface-variant'>
                    No payments found
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

      {/* Refund modal */}
      {state.refundTargetId && state.refundTarget && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
          <div className='bg-surface border border-outline-variant/20 rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4'>
            <h3 className='font-headline font-bold text-on-surface text-lg'>Process Refund</h3>
            <div className='bg-surface-container rounded-xl p-4 text-xs flex flex-col gap-1'>
              <p className='text-on-surface-variant'>
                Payment: <span className='font-mono text-on-surface'>{state.refundTarget.gatewayPaymentId}</span>
              </p>
              <p className='text-on-surface-variant'>
                Total:{" "}
                <span className='font-semibold text-on-surface'>
                  {handlers.formatAmount(state.refundTarget.totalAmount, state.refundTarget.currency)}
                </span>
              </p>
              <p className='text-on-surface-variant'>
                Already refunded:{" "}
                <span className='font-semibold text-warning'>
                  {handlers.formatAmount(state.refundTarget.refundAmount, state.refundTarget.currency)}
                </span>
              </p>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>
                Refund amount (₹) <span className='text-error'>*</span>
              </label>
              <input
                type='number'
                value={state.refundAmount}
                onChange={(e) => handlers.setRefundAmount(e.target.value)}
                placeholder='e.g. 499'
                className='px-4 py-2.5 rounded-xl text-sm bg-surface-container border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20'
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>
                Reason <span className='text-error'>*</span>
              </label>
              <textarea
                value={state.refundReason}
                onChange={(e) => handlers.setRefundReason(e.target.value)}
                placeholder='Reason for refund...'
                rows={2}
                className='px-4 py-2.5 rounded-xl text-sm bg-surface-container border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none'
              />
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => handlers.setRefundTargetId(null)}
                className='flex-1 px-4 py-2.5 rounded-xl border border-outline-variant text-sm text-on-surface hover:bg-surface-container'>
                Cancel
              </button>
              <button
                onClick={handlers.handleConfirmRefund}
                disabled={state.isRefunding || !state.refundAmount || !state.refundReason.trim()}
                className='flex-1 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-medium hover:opacity-90 disabled:opacity-50'>
                {state.isRefunding ? "Processing..." : "Process Refund"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentList;
