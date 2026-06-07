import React from "react";
import useAdminWebhooks from "../controller/useAdminWebhooks";

const AdminWebhookList: React.FC = () => {
  const { state, handlers } = useAdminWebhooks();

  return (
    <div className='flex flex-col gap-4'>
      <select
        value={state.processed}
        onChange={(e) => handlers.setProcessed(e.target.value)}
        className='w-48 px-4 py-2.5 rounded-xl text-sm bg-surface border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20'>
        <option value=''>All Events</option>
        <option value='true'>Processed</option>
        <option value='false'>Unprocessed</option>
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
                {["Event ID", "Type", "Gateway", "Retries", "Date", "Status", "Error"].map((h) => (
                  <th key={h} className='text-left text-xs font-semibold text-on-surface-variant pb-3 pr-4'>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.events.map((evt) => (
                <tr key={evt.id} className='border-b border-outline-variant/10 hover:bg-surface-container/50'>
                  <td className='py-3 pr-4 font-mono text-[11px] text-on-surface-variant'>{evt.eventId?.slice(0, 16)}...</td>
                  <td className='py-3 pr-4 text-xs text-on-surface'>{evt.eventType}</td>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{evt.gateway}</td>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant text-center'>{evt.retryCount}</td>
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{handlers.formatDate(evt.createdAt)}</td>
                  <td className='py-3 pr-4'>
                    <span
                      className={[
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        evt.processed ? "bg-success-container text-success" : "bg-error-container text-error",
                      ].join(" ")}>
                      {evt.processed ? "Processed" : "Pending"}
                    </span>
                  </td>
                  <td className='py-3 max-w-[200px]'>
                    {evt.errorMessage && (
                      <p className='text-[11px] text-error truncate' title={evt.errorMessage}>
                        {evt.errorMessage}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
              {state.events.length === 0 && (
                <tr>
                  <td colSpan={7} className='py-12 text-center text-sm text-on-surface-variant'>
                    No webhook events found
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

export default AdminWebhookList;
