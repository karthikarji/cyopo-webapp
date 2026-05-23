import React from "react";
import Button from "@cyopo/Components/button/Button";

interface Props {
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteTemplateModal: React.FC<Props> = ({ isDeleting, onConfirm, onClose }) => (
  <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' onClick={onClose}>
    <div className='bg-surface rounded-2xl shadow-xl w-full max-w-sm p-6' onClick={(e) => e.stopPropagation()}>
      <div className='w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center mb-4'>
        <span className='material-symbols-outlined text-error text-[24px]'>delete</span>
      </div>

      <h3 className='font-bold text-on-surface text-lg mb-2'>Delete template?</h3>
      <p className='text-sm text-on-surface-variant leading-relaxed mb-6'>
        This will permanently delete the template. Portfolios using this template will not be affected but cannot switch back to it.
      </p>

      <div className='flex items-center gap-3'>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className={[
            "flex-1 py-2.5 rounded-xl text-sm font-medium",
            "bg-error text-on-error transition-all",
            isDeleting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer",
          ].join(" ")}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        <Button variant='secondary' size='md' onClick={onClose} className='flex-1'>
          Cancel
        </Button>
      </div>
    </div>
  </div>
);

export default DeleteTemplateModal;
