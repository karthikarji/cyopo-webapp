import React from "react";
import { Plus, X, ChevronDown, ChevronUp, FolderOpen } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useProjectsStep from "../controller/useProjectsStep";
import { PROJECTS_STEP_TITLE, PROJECTS_STEP_SUBTITLE, PROJECTS_EMPTY_TITLE, PROJECTS_EMPTY_SUB, PROJECTS_EMPTY_CTA } from "../ProjectsStep.constants";
import Notify from "@cyopo/Services/notification/Notify";

const inputCls = [
  "w-full px-3 py-2.5 rounded-xl text-sm",
  "bg-background border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
  "transition-all duration-200",
].join(" ");

const ProjectsStep: React.FC = () => {
  const { state, handlers } = useProjectsStep();

  return (
    <div>
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='font-headline font-bold text-on-surface text-xl sm:text-2xl mb-2'>{PROJECTS_STEP_TITLE}</h2>
        <p className='text-sm text-on-surface-variant'>{PROJECTS_STEP_SUBTITLE}</p>
      </div>

      {/* Add button */}
      <div className='flex justify-center mb-6'>
        <Button variant='secondary' size='md' leftIcon={<Plus size={16} />} onClick={handlers.handleAddProject}>
          Add Project
        </Button>
      </div>

      {/* Empty state */}
      {state.isEmpty && (
        <div className='flex flex-col items-center justify-center py-16 text-center bg-surface border border-outline-variant/20 rounded-2xl'>
          <div className='w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center mb-4'>
            <FolderOpen size={24} className='text-on-surface-variant' />
          </div>
          <p className='font-medium text-on-surface mb-1'>{PROJECTS_EMPTY_TITLE}</p>
          <p className='text-sm text-on-surface-variant max-w-xs mb-5'>{PROJECTS_EMPTY_SUB}</p>
          <Button variant='primary' size='sm' leftIcon={<Plus size={14} />} onClick={handlers.handleAddProject}>
            {PROJECTS_EMPTY_CTA}
          </Button>
        </div>
      )}

      {/* Project cards */}
      <div className='flex flex-col gap-4'>
        {state.projects.map((project, index) => {
          const isExpanded = state.expandedIndex === index;
          const title = project.title || `Project #${index + 1}`;
          const photos = state.projectPhotos[project.id ?? ""] ?? [];
          const isUploading = state.uploadingPhotos[project.id ?? ""];

          return (
            <div key={index} className='bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden'>
              {/* Accordion header */}
              <div
                className='flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-surface-container transition-colors'
                onClick={() => handlers.handleToggleExpand(index)}>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0'>
                    <FolderOpen size={15} className='text-primary' />
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium text-sm text-on-surface'>{title}</span>
                    {project.featured && (
                      <span className='text-[10px] bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full font-medium'>
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlers.handleRemoveProject(index);
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
                  {/* Title */}
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-on-surface-variant'>Project title</label>
                    <input
                      type='text'
                      value={project.title}
                      onChange={(e) => handlers.handleUpdateProject(index, "title", e.target.value)}
                      placeholder='E-Commerce Platform'
                      className={inputCls}
                    />
                  </div>

                  {/* Description */}
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-on-surface-variant'>Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handlers.handleUpdateProject(index, "description", e.target.value)}
                      placeholder='Describe what this project does and your role in it...'
                      rows={3}
                      className={[inputCls, "resize-none"].join(" ")}
                    />
                  </div>

                  {/* URLs */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Demo URL</label>
                      <input
                        type='url'
                        value={project.demoUrl ?? ""}
                        onChange={(e) => handlers.handleUpdateProject(index, "demoUrl", e.target.value)}
                        placeholder='https://demo.example.com'
                        className={inputCls}
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>GitHub URL</label>
                      <input
                        type='url'
                        value={project.githubUrl ?? ""}
                        onChange={(e) => handlers.handleUpdateProject(index, "githubUrl", e.target.value)}
                        placeholder='https://github.com/user/repo'
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Completed date + featured */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-medium text-on-surface-variant'>Completed date</label>
                      <input
                        type='date'
                        value={project.completedDate ?? ""}
                        onChange={(e) => handlers.handleUpdateProject(index, "completedDate", e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div className='flex items-center'>
                      <label className='flex items-center gap-2 cursor-pointer mt-4'>
                        <input
                          type='checkbox'
                          checked={project.featured}
                          onChange={(e) => handlers.handleUpdateProject(index, "featured", e.target.checked)}
                          className='rounded'
                        />
                        <span className='text-sm text-on-surface'>Mark as featured project</span>
                      </label>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className='text-xs font-medium text-on-surface-variant mb-2 block'>Technologies</label>
                    <div className='flex gap-2 mb-2'>
                      <input
                        type='text'
                        value={state.techInput[index] ?? ""}
                        onChange={(e) => handlers.handleTechInputChange(index, e.target.value)}
                        onKeyDown={(e) => handlers.handleTechKeyDown(index, e)}
                        placeholder='Type tech and press Enter'
                        className={[inputCls, "flex-1"].join(" ")}
                      />
                      <button
                        onClick={() => handlers.handleAddTech(index)}
                        className='px-3 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0'>
                        <Plus size={15} />
                      </button>
                    </div>
                    {project.technologies.length > 0 && (
                      <div className='flex flex-wrap gap-2'>
                        {project.technologies.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className='flex items-center gap-1.5 bg-surface-container border border-outline-variant/20 rounded-full px-3 py-1 text-xs font-medium text-on-surface'>
                            {tech}
                            <button
                              onClick={() => handlers.handleRemoveTech(index, techIdx)}
                              className='text-on-surface-variant hover:text-error transition-colors'>
                              <X size={11} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ─── Photos section ──────────────────────────────── */}
                  <div>
                    <div className='flex items-center justify-between mb-3'>
                      <label className='text-xs font-medium text-on-surface-variant'>
                        Project Photos
                        <span className='ml-1 text-on-surface-variant/50'>({photos.length}/5)</span>
                      </label>

                      {/* Upload button */}
                      <label
                        className={[
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
                          "border border-outline-variant/30 text-on-surface-variant",
                          "hover:bg-surface-container cursor-pointer transition-colors",
                          isUploading ? "opacity-50 pointer-events-none" : "",
                        ].join(" ")}>
                        {isUploading ? (
                          <>
                            <span className='w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin' />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <span className='material-symbols-outlined text-[14px]'>add_photo_alternate</span>
                            Add Photos
                          </>
                        )}
                        <input
                          type='file'
                          multiple
                          accept='image/jpeg,image/png,image/webp,image/gif'
                          className='hidden'
                          onChange={async (e) => {
                            const files = Array.from(e.target.files ?? []);
                            if (project.id) {
                              await handlers.handleUploadPhotos(project.id, files);
                            } else {
                              Notify.warn("Save the portfolio first before uploading photos");
                            }
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>

                    {/* Photo grid */}
                    {photos.length > 0 ? (
                      <div className='grid grid-cols-3 sm:grid-cols-5 gap-2'>
                        {photos.map((photo) => {
                          const isDeleting = state.deletingPhotoId === photo.id;
                          const isThumbbing = state.thumbnailPhotoId === photo.id;
                          const isBusy = isDeleting || isThumbbing;

                          return (
                            <div
                              key={photo.id}
                              className={[
                                "relative rounded-xl overflow-hidden aspect-square group",
                                "border-2 transition-all duration-200",
                                photo.isThumbnail ? "border-primary" : "border-outline-variant/20 hover:border-outline-variant/50",
                              ].join(" ")}>
                              <img
                                src={photo.fileUrl}
                                alt={photo.fileName}
                                className={["w-full h-full object-cover", isBusy ? "opacity-50" : ""].join(" ")}
                              />

                              {/* Spinner overlay while deleting or setting thumbnail */}
                              {isBusy && (
                                <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                                  <span className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
                                </div>
                              )}

                              {/* Cover badge — hidden while busy */}
                              {photo.isThumbnail && !isBusy && (
                                <div className='absolute top-1 left-1 px-1.5 py-0.5 bg-primary text-on-primary text-[9px] font-bold rounded-md'>
                                  Cover
                                </div>
                              )}

                              {/* Hover actions — hidden while busy */}
                              {!isBusy && (
                                <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5'>
                                  {!photo.isThumbnail && project.id && (
                                    <button
                                      onClick={() => handlers.handleSetThumbnail(project.id!, photo.id)}
                                      title='Set as cover'
                                      className='w-7 h-7 bg-white/20 hover:bg-primary rounded-lg flex items-center justify-center transition-colors'>
                                      <span className='material-symbols-outlined text-white text-[13px]'>star</span>
                                    </button>
                                  )}
                                  {project.id && (
                                    <button
                                      onClick={() => handlers.handleDeletePhoto(project.id!, photo.id)}
                                      title='Delete photo'
                                      className='w-7 h-7 bg-white/20 hover:bg-error rounded-lg flex items-center justify-center transition-colors'>
                                      <X size={12} className='text-white' />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Empty photo state */
                      <div className='flex flex-col items-center justify-center py-8 bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-xl text-center'>
                        <span className='material-symbols-outlined text-on-surface-variant/40 text-3xl mb-2'>add_photo_alternate</span>
                        <p className='text-xs text-on-surface-variant'>No photos yet — add up to 5</p>
                        <p className='text-[10px] text-on-surface-variant/50 mt-0.5'>First photo becomes the cover thumbnail</p>
                      </div>
                    )}
                  </div>
                  {/* ─── End photos section ──────────────────────────── */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsStep;
