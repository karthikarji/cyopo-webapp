import React from "react";

interface Props {
  onDelete: () => void;
}

const DangerSection: React.FC<Props> = ({ onDelete }) => (
  <div className='bg-surface border border-error/20 rounded-2xl p-6'>
    <h2 className='font-semibold text-error mb-5 flex items-center gap-2'>
      <span className='material-symbols-outlined text-[20px]'>dangerous</span>
      Danger Zone
    </h2>

    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-md'>
      <div>
        <p className='text-sm font-medium text-on-surface'>Delete account</p>
        <p className='text-xs text-on-surface-variant mt-0.5'>Permanently delete your account and all associated data. This cannot be undone.</p>
      </div>
      <button
        onClick={onDelete}
        className='flex-shrink-0 px-4 py-2 border border-error text-error text-sm font-medium rounded-xl hover:bg-error hover:text-on-error transition-all duration-200'>
        Delete account
      </button>
    </div>
  </div>
);

export default DangerSection;
