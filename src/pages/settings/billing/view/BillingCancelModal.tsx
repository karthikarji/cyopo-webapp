import React from "react";
import { AlertTriangle } from "lucide-react";
import Button from "@cyopo/Components/button/Button";

interface Props {
  periodEnd: string;
  reason: string;
  isCancelling: boolean;
  onReasonChange: (v: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

const BillingCancelModal: React.FC<Props> = ({ periodEnd, reason, isCancelling, onReasonChange, onConfirm, onClose }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
    <div className='bg-surface border border-outline-variant/20 rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-5'>
      {/* Icon + header */}
      <div className='flex items-start gap-4'>
        <div className='w-10 h-10 rounded-full bg-error-container flex items-center justify-center flex-shrink-0'>
          <AlertTriangle size={20} className='text-error' />
        </div>
        <div>
          <h3 className='font-headline font-bold text-on-surface text-lg'>Cancel subscription?</h3>
          <p className='text-sm text-on-surface-variant mt-1'>
            You will retain full access until <span className='font-semibold text-on-surface'>{periodEnd}</span>. After that your account will revert
            to the Free plan.
          </p>
        </div>
      </div>

      {/* What you lose */}
      <div className='bg-error-container/30 rounded-xl p-4'>
        <p className='text-xs font-semibold text-error mb-2'>You will lose access to:</p>
        <ul className='flex flex-col gap-1.5 text-xs text-on-surface-variant'>
          {["Premium and Pro templates", "Custom domain", "Extra portfolios beyond free limit"].map((item) => (
            <li key={item} className='flex items-center gap-2'>
              <span className='material-symbols-outlined text-error text-sm'>close</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Reason input */}
      <div className='flex flex-col gap-1.5'>
        <label className='text-xs font-medium text-on-surface-variant'>
          Reason for cancelling <span className='text-error'>*</span>
        </label>
        <textarea
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder='Help us improve — tell us why you are leaving...'
          rows={3}
          className={[
            "w-full px-4 py-2.5 rounded-xl text-sm resize-none",
            "bg-surface border border-outline-variant/30",
            "text-on-surface placeholder:text-on-surface-variant/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "focus:border-primary/40 transition-all duration-200",
          ].join(" ")}
        />
      </div>

      {/* Actions */}
      <div className='flex flex-col-reverse sm:flex-row gap-3 sm:justify-end'>
        <Button variant='ghost' size='md' onClick={onClose} disabled={isCancelling}>
          Keep subscription
        </Button>
        <Button variant='danger' size='md' loading={isCancelling} disabled={!reason.trim() || isCancelling} onClick={onConfirm}>
          Yes, cancel subscription
        </Button>
      </div>
    </div>
  </div>
);

export default BillingCancelModal;
