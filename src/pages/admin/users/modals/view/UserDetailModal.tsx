import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { AdminUserData } from "@cyopo/Models/admin/admin.models";

interface Props {
  user: AdminUserData;
  onClose: () => void;
}

const CopyField: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='bg-surface-container rounded-xl p-3'>
      <p className='text-xs text-on-surface-variant mb-1'>{label}</p>
      <div className='flex items-center gap-2'>
        <p className='font-semibold text-sm text-on-surface flex-1 truncate font-mono'>{value}</p>
        <button onClick={handleCopy} className='flex-shrink-0 text-on-surface-variant hover:text-primary transition-colors' title={`Copy ${label}`}>
          {copied ? <Check size={14} className='text-primary' /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
};

const UserDetailModal: React.FC<Props> = ({ user, onClose }) => (
  <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' onClick={onClose}>
    <div className='bg-surface rounded-2xl shadow-xl w-full max-w-md p-6' onClick={(e) => e.stopPropagation()}>
      {/* Avatar + name */}
      <div className='flex items-center gap-4 mb-6'>
        <div className='w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center font-bold text-primary text-xl'>
          {user.name[0]?.toUpperCase()}
        </div>
        <div>
          <p className='font-bold text-on-surface text-lg'>{user.name}</p>
          <p className='text-sm text-on-surface-variant'>{user.email}</p>
        </div>
      </div>

      {/* Copyable fields */}
      <div className='flex flex-col gap-2 mb-4'>
        <CopyField label='User ID' value={user.id} />
        <CopyField label='Email' value={user.email} />
      </div>

      {/* Other details */}
      <div className='grid grid-cols-2 gap-3 mb-6'>
        {[
          { label: "Role", value: user.role },
          { label: "Plan", value: user.plan },
          { label: "Status", value: user.status },
          { label: "Portfolios", value: String(user.portfolioCount) },
          {
            label: "Member since",
            value: new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
          },
        ].map(({ label, value }) => (
          <div key={label} className='bg-surface-container rounded-xl p-3'>
            <p className='text-xs text-on-surface-variant mb-1'>{label}</p>
            <p className='font-semibold text-sm text-on-surface'>{value}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className='w-full py-2.5 border border-outline-variant/30 rounded-xl text-sm text-on-surface-variant hover:bg-surface-container transition-colors'>
        Close
      </button>
    </div>
  </div>
);

export default UserDetailModal;
