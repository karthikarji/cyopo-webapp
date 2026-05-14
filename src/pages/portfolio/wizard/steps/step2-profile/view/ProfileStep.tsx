import React from "react";
import { Upload, X, FileText, Plus } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useProfileStep from "../controller/useProfileStep";
import { PROFILE_STEP_TITLE, PROFILE_STEP_SUBTITLE, PROFILE_AI_HINT, PROFILE_AI_BTN, SOCIAL_PLATFORMS } from "../ProfileStep.constants";

const inputCls = [
  "w-full px-4 py-2.5 rounded-xl text-sm",
  "bg-surface border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
  "transition-all duration-200",
].join(" ");

const ProfileStep: React.FC = () => {
  const { state, handlers } = useProfileStep();
  const { profile } = state;

  return (
    <div>
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='font-headline font-bold text-on-surface text-xl sm:text-2xl mb-2'>{PROFILE_STEP_TITLE}</h2>
        <p className='text-sm text-on-surface-variant'>{PROFILE_STEP_SUBTITLE}</p>
      </div>

      {/* AI banner */}
      <div className='flex items-center justify-between gap-4 bg-secondary-container/40 border border-primary/20 rounded-xl px-4 py-3 mb-6'>
        <p className='text-sm text-on-surface-variant flex items-center gap-2'>
          <span className='material-symbols-outlined text-primary text-[18px]'>psychology</span>
          {PROFILE_AI_HINT}
        </p>
        <Button variant='primary' size='sm' loading={state.isAiLoading} onClick={handlers.handleAiFill} className='flex-shrink-0'>
          <span className='material-symbols-outlined text-[14px] mr-1'>auto_fix_high</span>
          {PROFILE_AI_BTN}
        </Button>
      </div>

      {/* Profile photo */}
      <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5 mb-4'>
        <h3 className='font-medium text-on-surface text-sm mb-4 flex items-center gap-2'>
          <span className='material-symbols-outlined text-primary text-[18px]'>account_circle</span>
          Profile photo
        </h3>
        <div className='flex items-center gap-4'>
          {/* Avatar preview */}
          <div className='w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg overflow-hidden flex-shrink-0'>
            {profile.profilePhoto ? (
              <img src={profile.profilePhoto} alt='Profile' className='w-full h-full object-cover' />
            ) : profile.name ? (
              profile.name[0]?.toUpperCase()
            ) : (
              "?"
            )}
          </div>

          {/* Upload label */}
          <div>
            <label className='text-sm border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface-variant hover:bg-surface-container transition-colors flex items-center gap-2 cursor-pointer'>
              <span className='material-symbols-outlined text-[16px]'>upload</span>
              Upload photo
              <input type='file' accept='image/jpeg,image/png,image/gif,image/webp' className='hidden' onChange={handlers.handlePhotoChange} />
            </label>
            <p className='text-xs text-on-surface-variant mt-1'>JPG, PNG or GIF · Max 2MB</p>
          </div>
        </div>
      </div>

      {/* Resume / CV upload */}
      <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5 mb-4'>
        <h3 className='font-medium text-on-surface text-sm mb-1 flex items-center gap-2'>
          <span className='material-symbols-outlined text-primary text-[18px]'>description</span>
          Resume / CV
          <span className='text-xs text-on-surface-variant font-normal ml-1'>Optional</span>
        </h3>
        <p className='text-xs text-on-surface-variant mb-4'>
          Upload your resume so visitors can download it from your portfolio. PDF or Word · Max 5MB
        </p>

        {state.showResume ? (
          <div className='flex items-center gap-3 px-4 py-3 bg-surface-container rounded-xl border border-outline-variant/20'>
            <div className='w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0'>
              <FileText size={18} className='text-primary' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-on-surface truncate'>{state.resumeFileName}</p>
              <p className='text-xs text-on-surface-variant'>{state.resumeIsDirty ? "Ready to upload" : "Uploaded"}</p>
            </div>
            <button
              onClick={handlers.handleResumeRemove}
              className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container transition-colors flex-shrink-0'>
              <X size={15} />
            </button>
          </div>
        ) : (
          <label className='flex flex-col items-center justify-center gap-2 px-4 py-6 bg-surface-container-low border-2 border-dashed border-outline-variant/40 rounded-xl cursor-pointer hover:border-primary/40 hover:bg-surface-container transition-all duration-200'>
            <div className='w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center'>
              <Upload size={18} className='text-on-surface-variant' />
            </div>
            <div className='text-center'>
              <p className='text-sm font-medium text-on-surface'>Click to upload resume</p>
              <p className='text-xs text-on-surface-variant mt-0.5'>PDF or Word document · Max 5MB</p>
            </div>
            <input
              type='file'
              accept='.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              className='hidden'
              onChange={handlers.handleResumeChange}
            />
          </label>
        )}
      </div>

      {/* Basic info */}
      <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5 mb-4'>
        <h3 className='font-medium text-on-surface text-sm mb-4 flex items-center gap-2'>
          <span className='material-symbols-outlined text-primary text-[18px]'>badge</span>
          Basic information
        </h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Full name</label>
            <input type='text' value={profile.name} onChange={handlers.handleChange("name")} placeholder='Alice Johnson' className={inputCls} />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Professional title</label>
            <input
              type='text'
              value={profile.title}
              onChange={handlers.handleChange("title")}
              placeholder='Senior Frontend Engineer'
              className={inputCls}
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Location</label>
            <input
              type='text'
              value={profile.location}
              onChange={handlers.handleChange("location")}
              placeholder='San Francisco, CA'
              className={inputCls}
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Website</label>
            <input
              type='url'
              value={profile.website}
              onChange={handlers.handleChange("website")}
              placeholder='https://yourwebsite.com'
              className={inputCls}
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Email</label>
            <input type='email' value={profile.email} onChange={handlers.handleChange("email")} placeholder='you@example.com' className={inputCls} />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Phone</label>
            <input type='tel' value={profile.phone} onChange={handlers.handleChange("phone")} placeholder='+1 555-000-0000' className={inputCls} />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5 mb-4'>
        <h3 className='font-medium text-on-surface text-sm mb-4 flex items-center gap-2'>
          <span className='material-symbols-outlined text-primary text-[18px]'>description</span>
          Professional bio
        </h3>
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs font-medium text-on-surface-variant'>About you</label>
          <textarea
            value={profile.bio}
            onChange={handlers.handleChange("bio")}
            placeholder='Tell the world what you do and what makes you unique...'
            rows={4}
            maxLength={1000}
            className={[inputCls, "resize-none"].join(" ")}
          />
          <p className='text-xs text-on-surface-variant text-right'>{state.bioLength} / 1000</p>
        </div>
      </div>

      {/* Social links */}
      {/* Social links */}
      <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
        <h3 className='font-medium text-on-surface text-sm mb-4 flex items-center gap-2'>
          <span className='material-symbols-outlined text-primary text-[18px]'>share</span>
          Social media links
        </h3>
        <div className='flex flex-col gap-3'>
          {profile.socialMedia.map((link, index) => (
            <div key={index} className='flex flex-col sm:flex-row gap-2'>
              <select
                value={link.platform}
                onChange={(e) => handlers.handleSocialChange(index, "platform", e.target.value)}
                className={[
                  "px-3 py-2.5 rounded-xl text-sm w-full sm:w-36 flex-shrink-0",
                  "bg-surface border border-outline-variant/30",
                  "text-on-surface",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
                  "transition-all duration-200",
                ].join(" ")}>
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input
                type='url'
                value={link.url}
                onChange={(e) => handlers.handleSocialChange(index, "url", e.target.value)}
                placeholder={`https://...`}
                className={[
                  "flex-1 min-w-0 px-3 py-2.5 rounded-xl text-sm",
                  "bg-surface border border-outline-variant/30",
                  "text-on-surface placeholder:text-on-surface-variant/50",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
                  "transition-all duration-200",
                ].join(" ")}
              />
              <button
                onClick={() => handlers.handleRemoveSocial(index)}
                className='w-full sm:w-9 h-10 sm:h-auto flex items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-error-container hover:text-error transition-colors flex-shrink-0'>
                <X size={15} />
                <span className='sm:hidden ml-2 text-sm'>Remove</span>
              </button>
            </div>
          ))}
          <button
            onClick={handlers.handleAddSocial}
            className='flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-primary/30 text-primary text-sm hover:bg-secondary-container/30 transition-colors w-fit'>
            <Plus size={15} />
            Add link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
