import React from "react";
import { Check } from "lucide-react";
import useTemplateStep from "../controller/useTemplateStep";
import { TEMPLATE_STEP_TITLE, TEMPLATE_STEP_SUBTITLE, TEMPLATE_FILTERS } from "../TemplateStep.constants";
import type { WizardTemplate } from "../TemplateStep.model.d";

const TemplateMiniPreview: React.FC<{ template: WizardTemplate }> = ({ template }) => (
  <div className='w-full h-full p-3 flex flex-col gap-2' style={{ background: template.gradient }}>
    <div className='flex items-center gap-1.5'>
      <div className='w-4 h-4 rounded-full flex-shrink-0' style={{ background: template.accent }} />
      <div className='flex-1 flex flex-col gap-1'>
        <div className='h-1.5 rounded-full w-3/4 opacity-30' style={{ background: template.accent }} />
        <div className='h-1 rounded-full w-1/2 opacity-20' style={{ background: template.accent }} />
      </div>
    </div>
    <div className='flex gap-1.5 flex-1'>
      <div className='flex-1 rounded-lg opacity-10' style={{ background: template.accent }} />
      <div className='flex-1 rounded-lg opacity-10' style={{ background: template.accent }} />
    </div>
    <div className='flex gap-1'>
      {[70, 50, 60].map((w, i) => (
        <div key={i} className='h-1 rounded-full opacity-15' style={{ background: template.accent, width: `${w}%` }} />
      ))}
    </div>
  </div>
);

const TemplateStep: React.FC = () => {
  const { state, handlers } = useTemplateStep();

  return (
    <div>
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='font-headline font-bold text-on-surface text-xl sm:text-2xl mb-2'>{TEMPLATE_STEP_TITLE}</h2>
        <p className='text-sm text-on-surface-variant'>{TEMPLATE_STEP_SUBTITLE}</p>
      </div>

      {/* Filters */}
      <div className='flex items-center gap-2 justify-center mb-6 flex-wrap'>
        {TEMPLATE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => handlers.handleFilterChange(f.value as any)}
            className={[
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              state.activeFilter === f.value
                ? "bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high",
            ].join(" ")}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Template grid */}
      {state.isLoading ? (
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='rounded-xl overflow-hidden animate-pulse'>
              <div className='h-28 bg-surface-container-high' />
              <div className='p-3 bg-surface flex flex-col gap-2'>
                <div className='h-3 bg-surface-container-high rounded w-3/4' />
                <div className='h-3 bg-surface-container-high rounded w-1/3' />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {state.templates.map((template) => {
            const isSelected = state.selectedId === template.id;
            return (
              <button
                key={template.id}
                onClick={() => handlers.handleSelectTemplate(template)}
                className={[
                  "relative rounded-xl overflow-hidden text-left",
                  "border-2 transition-all duration-200",
                  "hover:shadow-md hover:scale-[1.02]",
                  isSelected ? "border-primary shadow-md shadow-primary/20" : "border-outline-variant/30 hover:border-primary/40",
                ].join(" ")}>
                {/* Preview thumbnail */}
                <div className='h-28 overflow-hidden'>
                  <div className='w-full h-full hover:scale-105 transition-transform duration-500'>
                    <TemplateMiniPreview template={template} />
                  </div>
                </div>

                {/* Selected checkmark */}
                {isSelected && (
                  <div className='absolute top-2 right-2 w-6 h-6 rounded-full bg-primary dark:bg-primary-fixed-dim flex items-center justify-center'>
                    <Check size={13} className='text-on-primary dark:text-on-primary-fixed' />
                  </div>
                )}

                {/* Premium badge */}
                {template.isPremium && (
                  <div className='absolute top-2 left-2 flex items-center gap-1 bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full text-[10px] font-bold'>
                    <span className='material-symbols-outlined text-[11px]' style={{ fontVariationSettings: "'FILL' 1" }}>
                      workspace_premium
                    </span>
                    Premium
                  </div>
                )}

                {/* Info */}
                <div className='p-3 bg-surface'>
                  <p className='font-medium text-sm text-on-surface mb-0.5'>{template.name}</p>
                  <p className='text-xs text-on-surface-variant'>{template.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected info */}
      {state.selectedId && (
        <div className='mt-6 flex items-center justify-center gap-2 text-sm text-on-surface-variant'>
          <div className='w-2 h-2 rounded-full bg-primary' />
          <span>
            <span className='font-medium text-on-surface'>{state.templates.find((t) => t.id === state.selectedId)?.name}</span> selected — click Next
            to continue
          </span>
        </div>
      )}
    </div>
  );
};

export default TemplateStep;
