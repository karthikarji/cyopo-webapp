import React, { useState, useEffect } from "react";
import Button from "@cyopo/Components/button/Button";
import type { AdminUserData, UserPlan, UserStatus } from "@cyopo/Models/admin/admin.models";

interface Props {
  user: AdminUserData;
  isSaving: boolean;
  onSave: (data: { name: string; plan: UserPlan; status: UserStatus }) => void;
  onClose: () => void;
}

const inputCls = [
  "w-full px-4 py-2.5 rounded-xl text-sm",
  "bg-surface border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20",
  "focus:border-primary/40 transition-all duration-200",
].join(" ");

const EditUserModal: React.FC<Props> = ({ user, isSaving, onSave, onClose }) => {
  const [name, setName] = useState(user.name);
  const [plan, setPlan] = useState<UserPlan>(user.plan);
  const [status, setStatus] = useState<UserStatus>(user.status);

  // Reset when user changes
  useEffect(() => {
    setName(user.name);
    setPlan(user.plan);
    setStatus(user.status);
  }, [user]);

  const hasChanges = name.trim() !== user.name || plan !== user.plan || status !== user.status;

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), plan, status });
  };

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' onClick={onClose}>
      <div className='bg-surface rounded-2xl shadow-xl w-full max-w-md p-6' onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center font-bold text-primary text-lg flex-shrink-0'>
            {user.name[0]?.toUpperCase()}
          </div>
          <div>
            <p className='font-bold text-on-surface'>{user.name}</p>
            <p className='text-xs text-on-surface-variant'>{user.email}</p>
          </div>
        </div>

        <div className='flex flex-col gap-4 mb-6'>
          {/* Name */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Full Name</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Full name' className={inputCls} />
          </div>

          {/* Email — read only */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Email address</label>
            <input type='email' value={user.email} readOnly className={[inputCls, "opacity-60 cursor-not-allowed"].join(" ")} />
            <p className='text-xs text-on-surface-variant'>Email cannot be changed.</p>
          </div>

          {/* Plan + Status side by side */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>Plan</label>
              <select value={plan} onChange={(e) => setPlan(e.target.value as UserPlan)} className={inputCls}>
                <option value='FREE'>Free</option>
                <option value='PREMIUM'>Premium</option>
              </select>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as UserStatus)} className={inputCls}>
                <option value='ACTIVE'>Active</option>
                <option value='SUSPENDED'>Suspended</option>
              </select>
            </div>
          </div>

          {/* Role — read only */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Role</label>
            <input type='text' value={user.role} readOnly className={[inputCls, "opacity-60 cursor-not-allowed"].join(" ")} />
            <p className='text-xs text-on-surface-variant'>Role cannot be changed from here.</p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <Button variant='primary' size='md' loading={isSaving} disabled={!hasChanges || !name.trim()} onClick={handleSubmit} className='flex-1'>
            Save Changes
          </Button>
          <Button variant='secondary' size='md' onClick={onClose} className='flex-1'>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
