import React from "react";
import type { NotificationPreferences } from "@cyopo/Services/api/user/UserAPIService";

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, checked, disabled, onChange }) => (
  <div className='flex items-center justify-between gap-4 py-4 border-b border-outline-variant/10 last:border-0'>
    <div className='flex-1'>
      <p className='text-sm font-medium text-on-surface'>{label}</p>
      <p className='text-xs text-on-surface-variant mt-0.5'>{description}</p>
    </div>
    <button
      role='switch'
      aria-checked={checked}
      onClick={onChange}
      disabled={disabled}
      className={[
        "relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0",
        "focus:outline-none focus:ring-2 focus:ring-primary/30",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        checked ? "bg-primary" : "bg-outline-variant",
      ].join(" ")}>
      <span
        className={[
          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow",
          "transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  </div>
);

interface Props {
  preferences: NotificationPreferences;
  isSaving: boolean;
  onToggle: (field: keyof NotificationPreferences) => void;
}

const NotificationsSection: React.FC<Props> = ({ preferences, isSaving, onToggle }) => (
  <div className='bg-surface border border-outline-variant/20 rounded-2xl p-6'>
    <h2 className='font-semibold text-on-surface mb-2 flex items-center gap-2'>
      <span className='material-symbols-outlined text-primary text-[20px]'>notifications</span>
      Notifications
    </h2>

    <div className='max-w-md'>
      <ToggleRow
        label='Message notifications'
        description='Get an email when someone sends you a contact message'
        checked={preferences.emailOnMessage}
        disabled={isSaving}
        onChange={() => onToggle("emailOnMessage")}
      />
      <ToggleRow
        label='Weekly digest'
        description='Receive a weekly summary of your portfolio views and messages'
        checked={preferences.weeklyDigest}
        disabled={isSaving}
        onChange={() => onToggle("weeklyDigest")}
      />
    </div>
  </div>
);

export default NotificationsSection;
