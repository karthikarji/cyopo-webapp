import React from "react";
import { useWizardContext } from "../common/WizardContext";
import { WIZARD_STEPS, TOTAL_STEPS } from "../common/wizard.constants";

const WizardProgress: React.FC = () => {
  const { currentStep, goToStep } = useWizardContext();
  const percentage = Math.round((currentStep / TOTAL_STEPS) * 100);

  return (
    <div className='px-6 pt-5 pb-0 bg-surface flex-shrink-0'>
      {/* Step label + percentage */}
      <div className='flex items-center justify-between mb-3'>
        <p className='text-sm font-medium text-on-surface'>
          Step {currentStep} of {TOTAL_STEPS} — <span className='text-on-surface-variant'>{WIZARD_STEPS[currentStep - 1]?.label}</span>
        </p>
        <span className='text-sm font-medium text-primary'>{percentage}% complete</span>
      </div>

      {/* Progress bar */}
      <div className='h-1 bg-surface-container-highest rounded-full mb-4'>
        <div className='h-full bg-primary rounded-full transition-all duration-500' style={{ width: `${percentage}%` }} />
      </div>

      {/* Step pills */}
      <div className='flex gap-2 overflow-x-auto pb-4 scrollbar-hide'>
        {WIZARD_STEPS.map((step) => {
          const isDone = step.step < currentStep;
          const isActive = step.step === currentStep;

          return (
            <button
              key={step.id}
              onClick={() => isDone && goToStep(step.step)}
              disabled={!isDone}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                "text-xs font-medium whitespace-nowrap flex-shrink-0",
                "transition-all duration-200",
                isDone
                  ? "bg-success-container text-success border border-success/20 cursor-pointer hover:opacity-90"
                  : isActive
                    ? "bg-secondary-container text-on-secondary-container border border-primary/20"
                    : "bg-surface-container text-on-surface-variant border border-outline-variant/20 cursor-default",
              ].join(" ")}>
              {/* Step number or checkmark */}
              <span
                className={[
                  "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold",
                  isDone ? "bg-success text-white" : isActive ? "bg-primary text-on-primary" : "bg-outline-variant text-on-surface-variant",
                ].join(" ")}>
                {isDone ? <span className='material-symbols-outlined text-[11px]'>check</span> : step.step}
              </span>
              {step.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WizardProgress;
