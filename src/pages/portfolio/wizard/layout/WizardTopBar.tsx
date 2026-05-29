import React from "react";
import { X, Save } from "lucide-react";
import { useWizardContext } from "../common/WizardContext";

const WizardTopBar: React.FC = () => {
  const { handleSaveDraft, handleExit, isDirty, lastSaved } = useWizardContext();

  const lastSavedLabel = lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString()}` : isDirty ? "Unsaved changes" : "";

  return (
    <div className='flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 border-b border-outline-variant/20 bg-surface flex-shrink-0'>
      {/* Logo + title */}
      <div className='flex items-center gap-1.5 font-headline font-bold text-primary'>
        <span className='material-symbols-outlined text-lg sm:text-xl flex-shrink-0' style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
        {/* On mobile show shortened title */}
        <span className='text-sm sm:text-lg leading-tight'>
          <span className='sm:hidden'>New Portfolio</span>
          <span className='hidden sm:inline'>Create new portfolio</span>
        </span>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2 sm:gap-3'>
        {/* Saved status — hidden on very small screens */}
        {lastSavedLabel && (
          <span className={["text-xs hidden xs:flex items-center gap-1", isDirty ? "text-warning" : "text-success"].join(" ")}>
            <span className='material-symbols-outlined text-[14px]'>{isDirty ? "edit" : "check_circle"}</span>
            <span className='hidden sm:inline'>{lastSavedLabel}</span>
          </span>
        )}

        {/* Save draft */}
        <button
          onClick={handleSaveDraft}
          className='flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container transition-colors'>
          <Save size={14} />
          <span>Save draft</span>
        </button>

        {/* Exit */}
        <button
          onClick={handleExit}
          className='flex items-center gap-1 text-xs sm:text-sm text-on-surface-variant hover:text-on-surface transition-colors'>
          <X size={15} />
          <span>Exit</span>
        </button>
      </div>
    </div>
  );
};

export default WizardTopBar;
