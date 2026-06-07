import React from "react";
import { Download } from "lucide-react";
import useAdminInvoices from "../controller/useAdminInvoices";

const STATUS_STYLES: Record<string, string> = {
  ISSUED: "bg-primary-container text-on-primary-container",
  PAID: "bg-success-container text-success",
  VOID: "bg-error-container text-error",
  DRAFT: "bg-surface-container text-on-surface-variant",
};

const AdminInvoiceList: React.FC = () => {
  const { state, handlers } = useAdminInvoices();

  return (
    <div className='flex flex-col gap-4'>
      {/* Status filter */}
      <select
        value={state.statusFilter}
        onChange={(e) => handlers.setStatusFilter(e.target.value)}
        className='w-48 px-4 py-2.5 rounded-xl text-sm bg-surface border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20'>
        <option value=''>All Statuses</option>
        {["ISSUED", "PAID", "VOID", "DRAFT"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Loading skeleton */}
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
                {["Invoice #", "User", "Amount", "Date", "Status", "PDF", "Action"].map((h) => (
                  <th key={h} className='text-left text-xs font-semibold text-on-surface-variant pb-3 pr-4'>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.invoices.map((inv) => (
                <tr key={inv.id} className='border-b border-outline-variant/10 hover:bg-surface-container/50'>
                  {/* Invoice number */}
                  <td className='py-3 pr-4 font-mono text-xs text-on-surface'>{inv.invoiceNumber}</td>

                  {/* User email */}
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{inv.user?.email ?? inv.billingEmail ?? "—"}</td>

                  {/* Amount */}
                  <td className='py-3 pr-4 text-xs font-semibold text-on-surface'>{handlers.formatAmount(inv.total, inv.currency)}</td>

                  {/* Date */}
                  <td className='py-3 pr-4 text-xs text-on-surface-variant'>{handlers.formatDate(inv.issuedAt)}</td>

                  {/* Status badge */}
                  <td className='py-3 pr-4'>
                    <span className={["text-[10px] font-bold px-2 py-0.5 rounded-full", STATUS_STYLES[inv.status] ?? STATUS_STYLES.DRAFT].join(" ")}>
                      {inv.status}
                    </span>
                  </td>

                  {/* PDF — download link if exists, dash if not */}
                  <td className='py-3 pr-4'>
                    {inv.pdfUrl ? (
                      <a
                        href={inv.pdfUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex items-center justify-center w-7 h-7 rounded-lg hover:bg-surface-container transition-colors text-primary'
                        title='Download PDF'>
                        <Download size={14} />
                      </a>
                    ) : (
                      // No PDF — no download icon shown
                      <span className='text-xs text-on-surface-variant/40'>—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className='py-3'>
                    <div className='flex items-center gap-3'>
                      {/* Void button */}
                      {inv.status !== "VOID" && inv.status !== "DRAFT" && (
                        <button
                          onClick={() => handlers.handleVoid(inv.id)}
                          disabled={state.voidingId === inv.id}
                          className='text-xs text-error hover:underline disabled:opacity-50'>
                          {state.voidingId === inv.id ? "Voiding..." : "Void"}
                        </button>
                      )}

                      {/* Generate PDF button — only when no PDF exists */}
                      {!inv.pdfUrl && (
                        <button
                          onClick={() => handlers.handleRegeneratePdf(inv.id)}
                          disabled={state.regeneratingId === inv.id}
                          className='flex items-center gap-1 text-xs text-primary hover:underline disabled:opacity-50'
                          title='Generate PDF'>
                          <span className='material-symbols-outlined text-[13px]' style={{ fontVariationSettings: "'FILL' 1" }}>
                            picture_as_pdf
                          </span>
                          {state.regeneratingId === inv.id ? "Generating..." : "Gen PDF"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty state */}
              {state.invoices.length === 0 && (
                <tr>
                  <td colSpan={7} className='py-12 text-center text-sm text-on-surface-variant'>
                    No invoices found
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
    </div>
  );
};

export default AdminInvoiceList;
