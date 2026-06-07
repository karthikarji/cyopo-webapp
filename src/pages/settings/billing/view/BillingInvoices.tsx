import React from "react";
import { Download, FileText } from "lucide-react";
import type { Invoice } from "@cyopo/Models/billing/billing.model";

interface Props {
  invoices: Invoice[];
  formatDate: (d: string) => string;
  formatPrice: (amount: number, currency: string) => string;
}

const STATUS_STYLES: Record<string, string> = {
  ISSUED: "bg-primary-container text-on-primary-container",
  PAID: "bg-success-container text-success",
  VOID: "bg-error-container text-error",
  DRAFT: "bg-surface-container text-on-surface-variant",
};

const BillingInvoices: React.FC<Props> = ({ invoices, formatDate, formatPrice }) => (
  <div className='bg-surface border border-outline-variant/20 rounded-2xl p-6'>
    <h2 className='font-semibold text-on-surface mb-5 flex items-center gap-2'>
      <span className='material-symbols-outlined text-primary text-[20px]'>receipt_long</span>
      Invoice History
    </h2>

    {invoices.length === 0 ? (
      // Empty state
      <div className='flex flex-col items-center justify-center py-10 text-center'>
        <div className='w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-3'>
          <FileText size={20} className='text-on-surface-variant' />
        </div>
        <p className='text-sm font-medium text-on-surface'>No invoices yet</p>
        <p className='text-xs text-on-surface-variant mt-1'>Your invoices will appear here after your first payment.</p>
      </div>
    ) : (
      // Invoice table
      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-outline-variant/20'>
              <th className='text-left text-xs font-semibold text-on-surface-variant pb-3'>Invoice</th>
              <th className='text-left text-xs font-semibold text-on-surface-variant pb-3'>Date</th>
              <th className='text-left text-xs font-semibold text-on-surface-variant pb-3 hidden sm:table-cell'>Period</th>
              <th className='text-right text-xs font-semibold text-on-surface-variant pb-3'>Amount</th>
              <th className='text-center text-xs font-semibold text-on-surface-variant pb-3'>Status</th>
              <th className='text-center text-xs font-semibold text-on-surface-variant pb-3'>PDF</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className='border-b border-outline-variant/10 last:border-0 hover:bg-surface-container/50 transition-colors'>
                {/* Invoice number */}
                <td className='py-3 font-mono text-xs text-on-surface'>{invoice.invoiceNumber}</td>

                {/* Date */}
                <td className='py-3 text-on-surface-variant text-xs'>{formatDate(invoice.issuedAt)}</td>

                {/* Period */}
                <td className='py-3 text-on-surface-variant text-xs hidden sm:table-cell'>
                  {formatDate(invoice.periodStart)}
                  {" – "}
                  {formatDate(invoice.periodEnd)}
                </td>

                {/* Amount */}
                <td className='py-3 text-right font-semibold text-on-surface'>{formatPrice(invoice.total, invoice.currency)}</td>

                {/* Status */}
                <td className='py-3 text-center'>
                  <span
                    className={["text-xs font-semibold px-2 py-0.5 rounded-full", STATUS_STYLES[invoice.status] ?? STATUS_STYLES.DRAFT].join(" ")}>
                    {invoice.status}
                  </span>
                </td>

                {/* PDF download */}
                <td className='py-3 text-center'>
                  {invoice.pdfUrl ? (
                    <a
                      href={invoice.pdfUrl}
                      target='_blank'
                      rel='noreferrer'
                      className='inline-flex items-center justify-center w-7 h-7 rounded-lg hover:bg-surface-container transition-colors text-primary'
                      title='Download PDF'>
                      <Download size={14} />
                    </a>
                  ) : (
                    <span className='inline-flex items-center justify-center w-7 h-7 text-on-surface-variant/30' title='PDF not available'>
                      <Download size={14} />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default BillingInvoices;
