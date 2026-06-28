import React from "react";
import { X, Plus } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useTemplateForm from "../controller/useTemplateForm";
import type { TemplateData } from "@cyopo/Models/admin/admin.models";

interface Props {
  template: TemplateData | null;
  onSuccess: (saved: TemplateData) => void;
  onClose: () => void;
}

const inputCls = [
  "w-full px-4 py-2.5 rounded-xl text-sm",
  "bg-surface border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20",
  "focus:border-primary/40 transition-all duration-200",
].join(" ");

const TemplateFormModal: React.FC<Props> = ({ template, onSuccess, onClose }) => {
  const { state, handlers } = useTemplateForm(template, onSuccess);

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-end' onClick={onClose}>
      <div className='bg-surface h-full w-full max-w-lg flex flex-col shadow-2xl overflow-hidden' onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 flex-shrink-0'>
          <h2 className='font-semibold text-on-surface'>{state.isEdit ? "Edit Template" : "New Template"}</h2>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors'>
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className='flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5'>
          {/* Title */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>
              Title <span className='text-error'>*</span>
            </label>
            <input
              type='text'
              value={state.values.title}
              onChange={(e) => handlers.handleChange("title", e.target.value)}
              placeholder='Minimal Light Template'
              className={[inputCls, state.errors.title ? "border-error/60" : ""].join(" ")}
            />
            {state.errors.title && <p className='text-xs text-error'>{state.errors.title}</p>}
          </div>

          {/* Slug */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>
              Slug <span className='text-error'>*</span>
              <span className='ml-1 font-normal text-on-surface-variant/60'>(lowercase, hyphens only — e.g. minimal-light)</span>
            </label>
            <input
              type='text'
              value={state.values.slug}
              onChange={(e) => handlers.handleChange("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              placeholder='minimal-light'
              disabled={state.isEdit}
              className={[inputCls, state.errors.slug ? "border-error/60" : "", state.isEdit ? "opacity-50 cursor-not-allowed" : ""].join(" ")}
            />
            {state.errors.slug && <p className='text-xs text-error'>{state.errors.slug}</p>}
            {state.isEdit && <p className='text-xs text-on-surface-variant/60'>Slug cannot be changed after creation</p>}
          </div>

          {/* Description */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>
              Description <span className='text-error'>*</span>
            </label>
            <textarea
              value={state.values.description}
              onChange={(e) => handlers.handleChange("description", e.target.value)}
              placeholder='A clean minimal template...'
              rows={3}
              className={[inputCls, "resize-none", state.errors.description ? "border-error/60" : ""].join(" ")}
            />
            {state.errors.description && <p className='text-xs text-error'>{state.errors.description}</p>}
          </div>

          {/* Thumbnail upload */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>
              Thumbnail <span className='text-error'>*</span>
            </label>

            {/* Preview */}
            {state.thumbnailPreview ? (
              <div className='relative group'>
                <img
                  src={state.thumbnailPreview}
                  alt='Thumbnail preview'
                  className='w-full h-36 object-cover rounded-xl border border-outline-variant/20'
                />
                {/* Change button overlay */}
                <label
                  className={[
                    "absolute inset-0 flex items-center justify-center",
                    "bg-black/40 rounded-xl opacity-0 group-hover:opacity-100",
                    "transition-opacity cursor-pointer",
                    state.isUploadingThumb ? "opacity-100 pointer-events-none" : "",
                  ].join(" ")}>
                  {state.isUploadingThumb ? (
                    <span className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  ) : (
                    <span className='text-white text-sm font-medium flex items-center gap-2'>
                      <span className='material-symbols-outlined text-[18px]'>upload</span>
                      Change image
                    </span>
                  )}
                  <input
                    type='file'
                    accept='image/jpeg,image/png,image/webp,image/gif'
                    className='hidden'
                    onChange={handlers.handleThumbnailChange}
                  />
                </label>
              </div>
            ) : (
              /* Empty upload area */
              <label
                className={[
                  "flex flex-col items-center justify-center gap-2",
                  "h-36 border-2 border-dashed rounded-xl cursor-pointer",
                  "transition-all duration-200",
                  state.errors.thumbnail
                    ? "border-error/60 bg-error-container/10"
                    : "border-outline-variant/40 hover:border-primary/40 hover:bg-surface-container",
                ].join(" ")}>
                <span className='material-symbols-outlined text-3xl text-on-surface-variant/40'>add_photo_alternate</span>
                <p className='text-sm text-on-surface-variant'>Click to upload thumbnail</p>
                <p className='text-xs text-on-surface-variant/60'>JPG, PNG, WebP · Max 3MB</p>
                <input type='file' accept='image/jpeg,image/png,image/webp,image/gif' className='hidden' onChange={handlers.handleThumbnailChange} />
              </label>
            )}

            {state.errors.thumbnail && <p className='text-xs text-error'>{state.errors.thumbnail}</p>}
          </div>

          {/* Font */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>
              Font <span className='text-error'>*</span>
            </label>
            <input
              type='text'
              value={state.values.font}
              onChange={(e) => handlers.handleChange("font", e.target.value)}
              placeholder='Inter'
              className={[inputCls, state.errors.font ? "border-error/60" : ""].join(" ")}
            />
            {state.errors.font && <p className='text-xs text-error'>{state.errors.font}</p>}
          </div>

          {/* Colors */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>
                Primary Color <span className='text-error'>*</span>
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='color'
                  value={state.values.primaryColor}
                  onChange={(e) => handlers.handleChange("primaryColor", e.target.value)}
                  className='w-10 h-10 rounded-lg border border-outline-variant/30 cursor-pointer p-1 bg-surface'
                />
                <input
                  type='text'
                  value={state.values.primaryColor}
                  onChange={(e) => handlers.handleChange("primaryColor", e.target.value)}
                  placeholder='#6750a4'
                  className={[inputCls, "flex-1"].join(" ")}
                />
              </div>
              {state.errors.primaryColor && <p className='text-xs text-error'>{state.errors.primaryColor}</p>}
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>
                Secondary Color <span className='text-error'>*</span>
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='color'
                  value={state.values.secondaryColor}
                  onChange={(e) => handlers.handleChange("secondaryColor", e.target.value)}
                  className='w-10 h-10 rounded-lg border border-outline-variant/30 cursor-pointer p-1 bg-surface'
                />
                <input
                  type='text'
                  value={state.values.secondaryColor}
                  onChange={(e) => handlers.handleChange("secondaryColor", e.target.value)}
                  placeholder='#625b71'
                  className={[inputCls, "flex-1"].join(" ")}
                />
              </div>
              {state.errors.secondaryColor && <p className='text-xs text-error'>{state.errors.secondaryColor}</p>}
            </div>
          </div>

          {/* Premium + Status */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>Plan</label>
              <select
                value={state.values.premium ? "true" : "false"}
                onChange={(e) => handlers.handleChange("premium", e.target.value === "true")}
                className={inputCls}>
                <option value='false'>Free</option>
                <option value='true'>Premium</option>
              </select>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>Status</label>
              <select value={state.values.status} onChange={(e) => handlers.handleChange("status", e.target.value)} className={inputCls}>
                <option value='ACTIVE'>Active</option>
                <option value='INACTIVE'>Inactive</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>
              Tags <span className='text-error'>*</span>
              <span className='ml-1 font-normal text-on-surface-variant/60'>(max 10)</span>
            </label>
            <div className='flex gap-2'>
              <input
                type='text'
                value={state.values.tagInput}
                onChange={(e) => handlers.handleChange("tagInput", e.target.value)}
                onKeyDown={handlers.handleTagKeyDown}
                placeholder='e.g. minimal, dark, creative'
                className={[inputCls, "flex-1"].join(" ")}
              />
              <button
                type='button'
                onClick={handlers.handleAddTag}
                className='px-3 py-2 bg-primary text-on-primary rounded-xl hover:opacity-90 transition-opacity'>
                <Plus size={15} />
              </button>
            </div>
            {state.errors.tags && <p className='text-xs text-error'>{state.errors.tags}</p>}
            {state.values.tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-1'>
                {state.values.tags.map((tag) => (
                  <span
                    key={tag}
                    className='flex items-center gap-1.5 px-3 py-1 bg-secondary-container text-on-secondary-container text-xs rounded-full'>
                    {tag}
                    <button type='button' onClick={() => handlers.handleRemoveTag(tag)} className='hover:text-error transition-colors'>
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center gap-3 px-6 py-4 border-t border-outline-variant/20 flex-shrink-0'>
          <Button variant='primary' size='md' loading={state.isSaving} disabled={!state.canSubmit} onClick={handlers.handleSubmit} className='flex-1'>
            {state.isEdit ? "Save Changes" : "Create Template"}
          </Button>
          <Button variant='secondary' size='md' onClick={onClose} className='flex-1'>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateFormModal;
