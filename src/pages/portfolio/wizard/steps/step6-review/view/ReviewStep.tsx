import React from "react";
import { Check, AlertTriangle } from "lucide-react";
import useReviewStep from "../controller/useReviewStep";
import { REVIEW_STEP_TITLE, REVIEW_STEP_SUBTITLE } from "../ReviewStep.constants";

const inputCls = [
  "w-full px-3 py-2.5 rounded-xl text-sm",
  "bg-surface border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
  "transition-all duration-200",
].join(" ");

const COMPLETION_LABELS: Record<string, string> = {
  template: "Template",
  profile: "Profile",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
};

const ReviewStep: React.FC = () => {
  const { state, handlers } = useReviewStep();
  const { review, completion, formData } = state;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Left column */}
      <div className='flex flex-col gap-4'>
        {/* Header */}
        <div>
          <h2 className='font-headline font-bold text-on-surface text-xl sm:text-2xl mb-1'>{REVIEW_STEP_TITLE}</h2>
          <p className='text-sm text-on-surface-variant'>{REVIEW_STEP_SUBTITLE}</p>
        </div>

        {/* Completion card */}
        <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
          <h3 className='font-medium text-on-surface text-sm mb-3 flex items-center gap-2'>
            <span className='material-symbols-outlined text-success text-[18px]'>task_alt</span>
            Portfolio completion
          </h3>
          <div className='h-2 bg-surface-container-highest rounded-full mb-3'>
            <div className='h-full bg-success rounded-full transition-all duration-500' style={{ width: `${state.completionPct}%` }} />
          </div>
          <div className='flex flex-wrap gap-2'>
            {Object.entries(completion).map(([key, done]) => (
              <span
                key={key}
                className={[
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                  done
                    ? "bg-success-container text-success border border-success/20"
                    : "bg-surface-container text-on-surface-variant border border-outline-variant/20",
                ].join(" ")}>
                {done ? <Check size={11} /> : <AlertTriangle size={11} />}
                {COMPLETION_LABELS[key]}
              </span>
            ))}
          </div>
        </div>

        {/* URL card */}
        <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
          <h3 className='font-medium text-on-surface text-sm mb-3 flex items-center gap-2'>
            <span className='material-symbols-outlined text-primary text-[18px]'>link</span>
            Portfolio URL
          </h3>
          <div className='flex flex-col gap-1.5 mb-4'>
            <label className='text-xs font-medium text-on-surface-variant'>Your slug</label>
            <div className='flex rounded-xl overflow-hidden border border-outline-variant/30 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 transition-all'>
              <span className='px-3 py-2.5 bg-surface-container text-on-surface-variant text-sm flex-shrink-0 border-r border-outline-variant/30'>
                cyopo.com/
              </span>
              <input
                type='text'
                value={review.slug}
                onChange={handlers.handleSlugChange}
                placeholder='your-portfolio'
                className='flex-1 px-3 py-2.5 text-sm text-primary font-medium bg-transparent focus:outline-none'
              />
              {state.isCheckingSlug && (
                <span className='px-3 flex items-center'>
                  <div className='w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin' />
                </span>
              )}
              {!state.isCheckingSlug && state.slugAvailable === true && (
                <span className='px-3 flex items-center text-success'>
                  <Check size={16} />
                </span>
              )}
              {!state.isCheckingSlug && state.slugAvailable === false && (
                <span className='px-3 flex items-center text-error'>
                  <AlertTriangle size={16} />
                </span>
              )}
            </div>
            {state.slugAvailable === true && (
              <p className='text-xs text-success flex items-center gap-1'>
                <Check size={11} /> URL is available
              </p>
            )}
            {state.slugAvailable === false && (
              <p className='text-xs text-error flex items-center gap-1'>
                <AlertTriangle size={11} /> URL is taken — try another
              </p>
            )}
          </div>

          {/* Custom domain */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center justify-between'>
              <label className='text-xs font-medium text-on-surface-variant'>Custom domain</label>
              <span className='text-[10px] px-2 py-0.5 bg-tertiary-container text-on-tertiary-container rounded-full font-medium'>
                Premium feature
              </span>
            </div>
            <input
              type='text'
              value={review.customDomain}
              onChange={(e) => handlers.handleChange("customDomain", e.target.value)}
              placeholder='myportfolio.com'
              className={inputCls}
            />
            <p className='text-xs text-on-surface-variant'>Connect your own domain. Upgrade to premium to enable.</p>
          </div>
        </div>

        {/* Settings card */}
        <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
          <h3 className='font-medium text-on-surface text-sm mb-3 flex items-center gap-2'>
            <span className='material-symbols-outlined text-primary text-[18px]'>settings</span>
            Portfolio settings
          </h3>

          <div className='flex flex-col gap-1.5 mb-4'>
            <label className='text-xs font-medium text-on-surface-variant'>Portfolio name</label>
            <input
              type='text'
              value={review.portfolioName}
              onChange={(e) => handlers.handleChange("portfolioName", e.target.value)}
              placeholder='My Portfolio'
              className={inputCls}
            />
          </div>

          {[
            { key: "isPublic", label: "Make portfolio public", desc: "Visible to everyone with the link" },
            { key: "showContact", label: "Show contact information", desc: "Display your email and phone" },
            { key: "allowMessages", label: "Allow contact messages", desc: "Let visitors send you messages" },
            { key: "showSkillLevels", label: "Show skill proficiency levels", desc: "Display Beginner, Advanced, Expert on skills" },
          ].map((setting) => (
            <div key={setting.key} className='flex items-center justify-between py-3 border-b border-outline-variant/10 last:border-b-0'>
              <div>
                <p className='text-sm font-medium text-on-surface'>{setting.label}</p>
                <p className='text-xs text-on-surface-variant'>{setting.desc}</p>
              </div>
              <button
                onClick={() => handlers.handleChange(setting.key, !(review as any)[setting.key])}
                className={[
                  "w-10 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0",
                  (review as any)[setting.key] ? "bg-primary" : "bg-outline-variant",
                ].join(" ")}>
                <div
                  className={[
                    "w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 shadow-sm",
                    (review as any)[setting.key] ? "left-5" : "left-1",
                  ].join(" ")}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — mini preview */}
      <div className='flex flex-col gap-4'>
        <div className='bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden sticky top-4'>
          <div className='px-4 py-3 border-b border-outline-variant/20 flex items-center justify-between'>
            <h3 className='font-medium text-sm text-on-surface'>Portfolio preview</h3>
            <span className='text-xs text-primary'>Full preview →</span>
          </div>

          <div className='p-4 flex flex-col gap-3'>
            {/* Hero */}
            <div className='bg-surface-container rounded-xl p-4 flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold flex-shrink-0'>
                {state.profile.name?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div>
                <p className='font-medium text-sm text-on-surface'>{state.profile.name || "Your name"}</p>
                <p className='text-xs text-on-surface-variant'>{state.profile.title || "Your title"}</p>
                <p className='text-xs text-on-surface-variant'>{state.profile.location || ""}</p>
              </div>
            </div>

            {/* Skills preview */}
            {formData.skills.skills.length > 0 && (
              <div className='bg-surface-container rounded-xl p-3'>
                <p className='text-xs font-medium text-on-surface mb-2'>Skills</p>
                <div className='flex flex-wrap gap-1.5'>
                  {formData.skills.skills.slice(0, 6).map((skill, i) => (
                    <span
                      key={i}
                      className='text-[10px] bg-surface border border-outline-variant/20 rounded-full px-2 py-0.5 text-on-surface-variant'>
                      {skill.name}
                    </span>
                  ))}
                  {formData.skills.skills.length > 6 && (
                    <span className='text-[10px] text-on-surface-variant'>+{formData.skills.skills.length - 6} more</span>
                  )}
                </div>
              </div>
            )}

            {/* Experience preview */}
            {formData.experience.experiences.length > 0 && (
              <div className='bg-surface-container rounded-xl p-3'>
                <p className='text-xs font-medium text-on-surface mb-2'>Experience</p>
                <div className='flex flex-col gap-2'>
                  {formData.experience.experiences.slice(0, 2).map((exp, i) => (
                    <div key={i} className='border-l-2 border-primary pl-2'>
                      <p className='text-xs font-medium text-on-surface'>{exp.title}</p>
                      <p className='text-[10px] text-on-surface-variant'>{exp.company}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects preview */}
            {formData.projects.projects.length > 0 && (
              <div className='bg-surface-container rounded-xl p-3'>
                <p className='text-xs font-medium text-on-surface mb-2'>Projects</p>
                <div className='flex flex-col gap-1'>
                  {formData.projects.projects.slice(0, 2).map((proj, i) => (
                    <p key={i} className='text-xs text-on-surface-variant'>
                      • {proj.title}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Missing sections warning */}
            {!completion.projects && (
              <div className='bg-warning-container border border-warning/20 rounded-xl p-3 flex items-start gap-2'>
                <AlertTriangle size={14} className='text-warning flex-shrink-0 mt-0.5' />
                <p className='text-xs text-warning'>Projects section is empty. Go back to add projects.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
