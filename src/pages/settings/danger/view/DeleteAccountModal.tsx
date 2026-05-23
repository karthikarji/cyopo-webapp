import React from "react";
import Button from "@cyopo/Components/button/Button";

interface Props {
  confirmText: string;
  isDeleting: boolean;
  canDelete: boolean;
  onConfirmChange: (v: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<Props> = ({ confirmText, isDeleting, canDelete, onConfirmChange, onConfirm, onClose }) => (
  <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' onClick={onClose}>
    <div className='bg-surface rounded-2xl shadow-xl w-full max-w-md p-6' onClick={(e) => e.stopPropagation()}>
      {/* Icon */}
      <div className='w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center mb-4'>
        <span className='material-symbols-outlined text-error text-[24px]'>warning</span>
      </div>

      <h3 className='font-bold text-on-surface text-lg mb-2'>Delete your account?</h3>
      <p className='text-sm text-on-surface-variant leading-relaxed mb-6'>
        This will permanently delete your account, all portfolios, messages, and analytics data. This action cannot be undone.
      </p>

      {/* Confirmation input */}
      <div className='flex flex-col gap-2 mb-6'>
        <label className='text-xs font-medium text-on-surface-variant'>
          Type <span className='font-bold text-error'>delete my account</span> to confirm
        </label>
        <input
          type='text'
          value={confirmText}
          onChange={(e) => onConfirmChange(e.target.value)}
          placeholder='delete my account'
          className={[
            "w-full px-4 py-2.5 rounded-xl text-sm bg-surface",
            "border border-outline-variant/30 text-on-surface",
            "placeholder:text-on-surface-variant/40",
            "focus:outline-none focus:ring-2 focus:ring-error/20",
            "focus:border-error/40 transition-all duration-200",
          ].join(" ")}
        />
      </div>

      <div className='flex items-center gap-3'>
        <button
          onClick={onConfirm}
          disabled={!canDelete || isDeleting}
          className={[
            "flex-1 py-2.5 rounded-xl text-sm font-medium transition-all",
            "bg-error text-on-error",
            canDelete && !isDeleting ? "hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed",
          ].join(" ")}>
          {isDeleting ? "Deleting..." : "Delete account"}
        </button>
        <Button variant='secondary' size='md' onClick={onClose} className='flex-1'>
          Cancel
        </Button>
      </div>
    </div>
  </div>
);

export default DeleteAccountModal;
