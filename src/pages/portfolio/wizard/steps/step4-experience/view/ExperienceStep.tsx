import React from "react";
import { Plus, X, ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useExperienceStep from "../controller/useExperienceStep";
import {
  EXPERIENCE_STEP_TITLE,
  EXPERIENCE_STEP_SUBTITLE,
  EXPERIENCE_EMPTY_TITLE,
  EXPERIENCE_EMPTY_SUB,
  EXPERIENCE_EMPTY_CTA,
} from "../ExperienceStep.constants";

const inputCls = [
  "w-full px-3 py-2.5 rounded-xl text-sm",
  "bg-background border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
  "transition-all duration-200",
].join(" ");

const ExperienceStep: React.FC = () => {
  const { state, handlers } = useExperienceStep();

  return (
    <div>
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='font-headline font-bold text-on-surface text-xl sm:text-2xl mb-2'>{EXPERIENCE_STEP_TITLE}</h2>
        <p className='text-sm text-on-surface-variant'>{EXPERIENCE_STEP_SUBTITLE}</p>
      </div>

      {/* Add button */}
      <div className='flex justify-center gap-3 mb-6'>
        <Button variant='secondary' size='md' leftIcon={<Plus size={16} />} onClick={handlers.handleAddExperience}>
          Add Work Experience
        </Button>
      </div>

      {/* Empty state */}
      {state.isEmpty && (
        <div className='flex flex-col items-center justify-center py-16 text-center bg-surface border border-outline-variant/20 rounded-2xl'>
          <div className='w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center mb-4'>
            <Briefcase size={24} className='text-on-surface-variant' />
          </div>
          <p className='font-medium text-on-surface mb-1'>{EXPERIENCE_EMPTY_TITLE}</p>
          <p className='text-sm text-on-surface-variant max-w-xs mb-5'>{EXPERIENCE_EMPTY_SUB}</p>
          <Button variant='primary' size='sm' leftIcon={<Plus size={14} />} onClick={handlers.handleAddExperience}>
            {EXPERIENCE_EMPTY_CTA}
          </Button>
        </div>
      )}

      {/* Experience cards */}
      <div className='flex flex-col gap-4'>
        {state.experiences.map((exp, index) => {
          const isExpanded = state.expandedIndex === index;
          const title = exp.title && exp.company ? `${exp.title} at ${exp.company}` : `Experience #${index + 1}`;

          return (
            <div key={index} className='bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden'>
              {/* Accordion header */}
              <div
                className='flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-surface-container transition-colors'
                onClick={() => handlers.handleToggleExpand(index)}>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0'>
                    <Briefcase size={15} className='text-primary' />
                  </div>
                  <span className='font-medium text-sm text-on-surface'>{title}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlers.handleRemoveExperience(index);
                    }}
                    className='w-7 h-7 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container transition-colors'>
                    <X size={14} />
                  </button>
                  {isExpanded ? (
                    <ChevronUp size={16} className='text-on-surface-variant' />
                  ) : (
                    <ChevronDown size={16} className='text-on-surface-variant' />
                  )}
                </div>
              </div>

              {/* Accordion content */}
              {isExpanded && (
                <div className='px-5 pb-5 border-t border-outline-variant/20 pt-5 flex flex-col gap-4'>
                  {/* Row 1 */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Job title</label>
                      <input
                        type='text'
                        value={exp.title}
                        onChange={(e) => handlers.handleUpdateExperience(index, "title", e.target.value)}
                        placeholder='Senior Developer'
                        className={inputCls}
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Company</label>
                      <input
                        type='text'
                        value={exp.company}
                        onChange={(e) => handlers.handleUpdateExperience(index, "company", e.target.value)}
                        placeholder='Acme Corp'
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-on-surface-variant'>Location</label>
                    <input
                      type='text'
                      value={exp.location ?? ""}
                      onChange={(e) => handlers.handleUpdateExperience(index, "location", e.target.value)}
                      placeholder='San Francisco, CA or Remote'
                      className={inputCls}
                    />
                  </div>

                  {/* Dates */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Start date</label>
                      <input
                        type='date'
                        value={exp.startDate}
                        onChange={(e) => handlers.handleUpdateExperience(index, "startDate", e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>End date</label>
                      <input
                        type='date'
                        value={exp.endDate ?? ""}
                        onChange={(e) => handlers.handleUpdateExperience(index, "endDate", e.target.value)}
                        disabled={exp.isCurrent}
                        className={[inputCls, exp.isCurrent ? "opacity-50 cursor-not-allowed" : ""].join(" ")}
                      />
                    </div>
                  </div>

                  {/* Current position */}
                  <label className='flex items-center gap-2 cursor-pointer w-fit'>
                    <input
                      type='checkbox'
                      checked={exp.isCurrent}
                      onChange={(e) => handlers.handleUpdateExperience(index, "isCurrent", e.target.checked)}
                      className='rounded'
                    />
                    <span className='text-sm text-on-surface'>This is my current position</span>
                  </label>

                  {/* Description */}
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-on-surface-variant'>Job description</label>
                    <textarea
                      value={exp.description ?? ""}
                      onChange={(e) => handlers.handleUpdateExperience(index, "description", e.target.value)}
                      placeholder='Describe your role and responsibilities...'
                      rows={3}
                      className={[inputCls, "resize-none"].join(" ")}
                    />
                  </div>

                  {/* Achievements */}
                  <div>
                    <div className='flex items-center justify-between mb-2'>
                      <label className='text-xs font-medium text-on-surface-variant'>Key achievements</label>
                      <button
                        onClick={() => handlers.handleAddAchievement(index)}
                        className='text-xs text-primary flex items-center gap-1 hover:underline'>
                        <Plus size={12} /> Add achievement
                      </button>
                    </div>
                    <div className='flex flex-col gap-2'>
                      {(exp.achievements ?? []).map((ach, achIdx) => (
                        <div key={achIdx} className='flex items-center gap-2'>
                          <input
                            type='text'
                            value={ach}
                            onChange={(e) => handlers.handleUpdateAchievement(index, achIdx, e.target.value)}
                            placeholder='e.g. Reduced page load time by 40%'
                            className={[inputCls, "flex-1"].join(" ")}
                          />
                          <button
                            onClick={() => handlers.handleRemoveAchievement(index, achIdx)}
                            className='text-on-surface-variant hover:text-error transition-colors flex-shrink-0'>
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceStep;
