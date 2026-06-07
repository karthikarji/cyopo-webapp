import React from "react";
import useAdminOrders from "../controller/useAdminOrders";

const STATUS_STYLES: Record<string, string> = {
  PAID: "bg-success-container text-success",
  PENDING: "bg-warning-container text-warning",
  FAILED: "bg-error-container text-error",
  EXPIRED: "bg-surface-container text-on-surface-variant",
  CANCELLED: "bg-surface-container text-on-surface-variant",
};

const AdminOrderList: React.FC = () => {
  const { state, handlers } = useAdminOrders();

  return (
    <div className='flex flex-col gap-4'>
      <select
        value={state.statusFilter}
        onChange={(e) => handlers.setStatusFilter(e.target.value)}
        className='w-48 px-4 py-2.5 rounded-xl text-sm bg-surface border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20'>
        <option value=''>All Statuses</option>
        {["PAID", "PENDING", "FAILED", "EXPIRED", "CANCELLED"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

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
                {["User", "Plan", "Cycle", "Amount", "Gateway Order", "Date", "Status"].map((h) => (
                  <th key={h} className='text-left text-xs font-semibold text-on-surface-variant pb-3 pr-4'>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.orders.map((order) => (
                <tr key={order.id} className='border-b border-outline-variant/10 hover:bg-surface-container/50'>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{order.user?.email ?? "—"}</td>
                  <td className='py-3 pr-4 text-xs text-on-surface'>{order.plan?.name ?? "—"}</td>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{order.billingCycle}</td>
                  <td className='py-3 pr-4 text-xs font-semibold text-on-surface'>{handlers.formatAmount(order.totalAmount, order.currency)}</td>
                  <td className='py-3 pr-4 font-mono text-[11px] text-on-surface-variant'>{order.gatewayOrderId?.slice(0, 16) ?? "—"}...</td>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{handlers.formatDate(order.createdAt)}</td>
                  <td className='py-3'>
                    <span
                      className={["text-[10px] font-bold px-2 py-0.5 rounded-full", STATUS_STYLES[order.status] ?? STATUS_STYLES.CANCELLED].join(
                        " ",
                      )}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {state.orders.length === 0 && (
                <tr>
                  <td colSpan={7} className='py-12 text-center text-sm text-on-surface-variant'>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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
    </div>
  );
};

export default AdminOrderList;
