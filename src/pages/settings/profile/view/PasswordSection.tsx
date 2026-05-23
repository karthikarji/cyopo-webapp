import React from "react";
import Button from "@cyopo/Components/button/Button";
import usePasswordSection from "../controller/usePasswordSection";
import type { ChangePasswordData } from "@cyopo/Services/api/user/UserAPIService";

const fields: Array<{
  key: keyof ChangePasswordData;
  label: string;
  showKey: "current" | "new" | "confirm";
  placeholder: string;
}> = [
  { key: "currentPassword", label: "Current password", showKey: "current", placeholder: "Enter current password" },
  { key: "newPassword", label: "New password", showKey: "new", placeholder: "At least 8 characters" },
  { key: "confirmPassword", label: "Confirm password", showKey: "confirm", placeholder: "Repeat new password" },
];

const PasswordSection: React.FC = () => {
  const { state, handlers } = usePasswordSection();

  return (
    <div className='bg-surface border border-outline-variant/20 rounded-2xl p-6'>
      <h2 className='font-semibold text-on-surface mb-5 flex items-center gap-2'>
        <span className='material-symbols-outlined text-primary text-[20px]'>lock</span>
        Password & Security
      </h2>

      <div className='flex flex-col gap-4 max-w-md'>
        {fields.map(({ key, label, showKey, placeholder }) => (
          <div key={key} className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>{label}</label>
            <div
              className={[
                "flex items-center border border-outline-variant/30 rounded-xl",
                "bg-surface overflow-hidden transition-all duration-200",
                "focus-within:ring-2 focus-within:ring-primary/20",
                "focus-within:border-primary/40",
              ].join(" ")}>
              <input
                type={state.showPasswords[showKey] ? "text" : "password"}
                value={state.form[key]}
                onChange={(e) => handlers.handleFieldChange(key, e.target.value)}
                placeholder={placeholder}
                className={[
                  "flex-1 px-4 py-2.5 text-sm bg-transparent",
                  "text-on-surface placeholder:text-on-surface-variant/50",
                  "focus:outline-none",
                ].join(" ")}
              />
              <button
                type='button'
                onClick={() => handlers.handleToggleShow(showKey)}
                className='pr-3 text-on-surface-variant hover:text-on-surface transition-colors'>
                <span className='material-symbols-outlined text-[18px]'>{state.showPasswords[showKey] ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
          </div>
        ))}

        <Button variant='primary' size='md' loading={state.isSaving} onClick={handlers.handleSubmit} className='self-start'>
          Change password
        </Button>
      </div>
    </div>
  );
};

export default PasswordSection;
