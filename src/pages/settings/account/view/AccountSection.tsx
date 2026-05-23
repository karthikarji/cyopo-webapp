import React from "react";
import Button from "@cyopo/Components/button/Button";
import useAccountSection from "../controller/useAccountSection";
import type { UserProfile } from "@cyopo/Services/api/user/UserAPIService";

interface Props {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
}

const inputCls = [
  "w-full px-4 py-2.5 rounded-xl text-sm",
  "bg-surface border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20",
  "focus:border-primary/40 transition-all duration-200",
].join(" ");

const AccountSection: React.FC<Props> = ({ user, setUser }) => {
  const { state, handlers } = useAccountSection(user, setUser);

  return (
    <div className='bg-surface border border-outline-variant/20 rounded-2xl p-6'>
      <h2 className='font-semibold text-on-surface mb-5 flex items-center gap-2'>
        <span className='material-symbols-outlined text-primary text-[20px]'>account_circle</span>
        Account
      </h2>

      <div className='flex flex-col gap-4 max-w-md'>
        {/* Name */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-medium text-on-surface-variant'>Full name</label>
          <input type='text' value={state.name} onChange={(e) => handlers.setName(e.target.value)} placeholder='Your name' className={inputCls} />
        </div>

        {/* Email — read only */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-medium text-on-surface-variant'>Email address</label>
          <input type='email' value={user.email} readOnly className={[inputCls, "opacity-60 cursor-not-allowed"].join(" ")} />
          <p className='text-xs text-on-surface-variant'>Contact support to change your email address.</p>
        </div>

        {/* Plan + member since */}
        <div className='flex items-center gap-4 py-3 px-4 bg-surface-container rounded-xl'>
          <div className='flex-1'>
            <p className='text-xs text-on-surface-variant'>Plan</p>
            <span
              className={[
                "inline-block mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full",
                user.plan === "PREMIUM" ? "bg-primary text-on-primary" : "bg-secondary-container text-on-secondary-container",
              ].join(" ")}>
              {user.plan}
            </span>
          </div>
          <div>
            <p className='text-xs text-on-surface-variant'>Member since</p>
            <p className='text-xs font-medium text-on-surface mt-0.5'>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <Button variant='primary' size='md' loading={state.isSaving} onClick={handlers.handleSave} className='self-start'>
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default AccountSection;
