import React from "react";
import { X, Save } from "lucide-react";
import { useWizardContext } from "../common/WizardContext";

const WizardTopBar: React.FC = () => {
  const { handleSaveDraft, handleExit, isDirty, lastSaved } = useWizardContext();

  const lastSavedLabel = lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString()}` : isDirty ? "Unsaved changes" : "";

  return (
    <div className='flex items-center justify-between px-6 h-16 border-b border-outline-variant/20 bg-surface flex-shrink-0'>
      <div className='flex items-center gap-2 font-headline font-bold text-primary text-lg'>
        <span className='material-symbols-outlined text-xl' style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
        Create new portfolio
      </div>
      <div className='flex items-center gap-3'>
        {lastSavedLabel && (
          <span className={["text-xs", isDirty ? "text-warning" : "text-success"].join(" ")}>
            {isDirty ? (
              <span className='flex items-center gap-1'>
                <span className='material-symbols-outlined text-[14px]'>edit</span>
                {lastSavedLabel}
              </span>
            ) : (
              <span className='flex items-center gap-1'>
                <span className='material-symbols-outlined text-[14px]'>check_circle</span>
                {lastSavedLabel}
              </span>
            )}
          </span>
        )}
        <button
          onClick={handleSaveDraft}
          className='flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container transition-colors'>
          <Save size={15} />
          Save draft
        </button>
        <button onClick={handleExit} className='flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors'>
          <X size={16} />
          Exit
        </button>
      </div>
    </div>
  );
};

export default WizardTopBar;
