import React from "react";
import { Plus, X, ChevronDown, ChevronUp, Briefcase, GraduationCap } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useExperienceStep from "../controller/useExperienceStep";
import {
  EXPERIENCE_STEP_TITLE,
  EXPERIENCE_STEP_SUBTITLE,
  EXPERIENCE_EMPTY_TITLE,
  EXPERIENCE_EMPTY_SUB,
  EXPERIENCE_EMPTY_CTA,
  EXPERIENCE_TYPES,
} from "../ExperienceStep.constants";
import TabSwitcher from "@cyopo/Components/tab-switcher/TabSwitcher";

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

      {/* Tab switcher */}
      <div className='mb-6'>
        <TabSwitcher
          tabs={[
            { id: "experience", label: "Work Experience", icon: <Briefcase size={14} /> },
            { id: "education", label: "Education", icon: <GraduationCap size={14} /> },
          ]}
          activeTab={state.activeTab}
          onChange={(id) => handlers.setActiveTab(id as "experience" | "education")}
        />
      </div>

      {/* ─── Work Experience Tab ──────────────────────────────────── */}
      {state.activeTab === "experience" && (
        <div>
          {/* Add buttons */}
          <div className='flex flex-wrap justify-center gap-3 mb-6'>
            <Button variant='secondary' size='md' leftIcon={<Plus size={16} />} onClick={handlers.handleAddExperience}>
              Add Work Experience
            </Button>
            <Button variant='secondary' size='md' leftIcon={<Plus size={16} />} onClick={handlers.handleAddInternship}>
              Add Internship
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
              const typeLabel = EXPERIENCE_TYPES.find((t) => t.value === (exp.type ?? "FULL_TIME"))?.label ?? "Full Time";

              return (
                <div key={index} className='bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden'>
                  {/* Accordion header */}
                  <div
                    className='flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-surface-container transition-colors'
                    onClick={() => handlers.handleToggleExpand(index)}>
                    <div className='flex items-center gap-3 min-w-0'>
                      <div className='w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0'>
                        <Briefcase size={15} className='text-primary' />
                      </div>
                      <span className='font-medium text-sm text-on-surface truncate'>{title}</span>
                      {/* Type badge */}
                      <span
                        className={[
                          "text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:inline-flex",
                          exp.type === "INTERNSHIP"
                            ? "bg-secondary-container text-on-secondary-container"
                            : "bg-surface-container text-on-surface-variant",
                        ].join(" ")}>
                        {typeLabel}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 flex-shrink-0'>
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
                      {/* Title + Company */}
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

                      {/* Employment type */}
                      <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-on-surface-variant'>Employment type</label>
                        <select
                          value={exp.type ?? "FULL_TIME"}
                          onChange={(e) => handlers.handleUpdateExperience(index, "type", e.target.value)}
                          className={inputCls}>
                          {EXPERIENCE_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Start + End date */}
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

                      {/* Current position checkbox */}
                      <label className='flex items-center gap-2 cursor-pointer w-fit'>
                        <input
                          type='checkbox'
                          checked={exp.isCurrent}
                          onChange={(e) => handlers.handleUpdateExperience(index, "isCurrent", e.target.checked)}
                          className='rounded'
                        />
                        <span className='text-sm text-on-surface'>
                          {exp.type === "INTERNSHIP" ? "This is my current internship" : "This is my current position"}
                        </span>
                      </label>

                      {/* Description */}
                      <div className='flex flex-col gap-1.5'>
                        <label className='text-xs font-medium text-on-surface-variant'>
                          {exp.type === "INTERNSHIP" ? "Internship description" : "Job description"}
                        </label>
                        <textarea
                          value={exp.description ?? ""}
                          onChange={(e) => handlers.handleUpdateExperience(index, "description", e.target.value)}
                          placeholder={
                            exp.type === "INTERNSHIP"
                              ? "Describe your internship responsibilities and learnings..."
                              : "Describe your role and responsibilities..."
                          }
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
      )}

      {/* ─── Education Tab ────────────────────────────────────────── */}
      {state.activeTab === "education" && (
        <div>
          <div className='flex justify-center gap-3 mb-6'>
            <Button variant='secondary' size='md' leftIcon={<Plus size={16} />} onClick={handlers.handleAddEducation}>
              Add Education
            </Button>
          </div>

          {state.educations.length === 0 && (
            <div className='flex flex-col items-center justify-center py-16 text-center bg-surface border border-outline-variant/20 rounded-2xl'>
              <div className='w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center mb-4'>
                <GraduationCap size={24} className='text-on-surface-variant' />
              </div>
              <p className='font-medium text-on-surface mb-1'>No education added yet</p>
              <p className='text-sm text-on-surface-variant max-w-xs mb-5'>Add your academic background and qualifications.</p>
              <Button variant='primary' size='sm' leftIcon={<Plus size={14} />} onClick={handlers.handleAddEducation}>
                Add education
              </Button>
            </div>
          )}

          <div className='flex flex-col gap-4'>
            {state.educations.map((edu, index) => (
              <div key={index} className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0'>
                      <GraduationCap size={15} className='text-primary' />
                    </div>
                    <span className='font-medium text-sm text-on-surface'>{edu.institution || `Education #${index + 1}`}</span>
                  </div>
                  <button
                    onClick={() => handlers.handleRemoveEducation(index)}
                    className='w-7 h-7 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container transition-colors'>
                    <X size={14} />
                  </button>
                </div>

                <div className='flex flex-col gap-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Institution</label>
                      <input
                        type='text'
                        value={edu.institution}
                        onChange={(e) => handlers.handleUpdateEducation(index, "institution", e.target.value)}
                        placeholder='University of Example'
                        className={inputCls}
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Degree</label>
                      <input
                        type='text'
                        value={edu.degree}
                        onChange={(e) => handlers.handleUpdateEducation(index, "degree", e.target.value)}
                        placeholder='Bachelor of Engineering'
                        className={inputCls}
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Field of Study</label>
                      <input
                        type='text'
                        value={edu.field ?? ""}
                        onChange={(e) => handlers.handleUpdateEducation(index, "field", e.target.value)}
                        placeholder='Computer Science'
                        className={inputCls}
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Grade / GPA</label>
                      <input
                        type='text'
                        value={edu.grade ?? ""}
                        onChange={(e) => handlers.handleUpdateEducation(index, "grade", e.target.value)}
                        placeholder='3.8 / 4.0'
                        className={inputCls}
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Start Year</label>
                      <input
                        type='text'
                        value={edu.startDate ?? ""}
                        onChange={(e) => handlers.handleUpdateEducation(index, "startDate", e.target.value)}
                        placeholder='2018'
                        className={inputCls}
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>End Year</label>
                      <input
                        type='text'
                        value={edu.endDate ?? ""}
                        onChange={(e) => handlers.handleUpdateEducation(index, "endDate", e.target.value)}
                        placeholder='2022'
                        disabled={edu.isCurrent ?? false}
                        className={[inputCls, edu.isCurrent ? "opacity-50 cursor-not-allowed" : ""].join(" ")}
                      />
                    </div>
                  </div>

                  <label className='flex items-center gap-2 cursor-pointer w-fit'>
                    <input
                      type='checkbox'
                      checked={edu.isCurrent ?? false}
                      onChange={(e) => handlers.handleUpdateEducation(index, "isCurrent", e.target.checked)}
                      className='rounded'
                    />
                    <span className='text-sm text-on-surface'>Currently studying here</span>
                  </label>

                  <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-on-surface-variant'>Description (optional)</label>
                    <textarea
                      value={edu.description ?? ""}
                      onChange={(e) => handlers.handleUpdateEducation(index, "description", e.target.value)}
                      placeholder='Activities, achievements, relevant coursework...'
                      rows={3}
                      className={[inputCls, "resize-none"].join(" ")}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceStep;
