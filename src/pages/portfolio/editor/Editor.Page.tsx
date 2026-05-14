import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Save, Globe, GlobeLock, ArrowLeft } from "lucide-react";
import { EditorProvider, useEditorContext } from "./common/EditorContext";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectEditorPortfolio, selectEditorSaving, selectEditorIsDirty, selectEditorLastSaved } from "./common/redux/selectors/Editor.selector";
import Button from "@cyopo/Components/button/Button";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import { useNavigate } from "react-router-dom";

// Reuse wizard steps directly — no copy
import TemplateStep from "@cyopo/Pages/portfolio/wizard/steps/step1-template/view/TemplateStep";
import ProfileStep from "@cyopo/Pages/portfolio/wizard/steps/step2-profile/view/ProfileStep";
import SkillsStep from "@cyopo/Pages/portfolio/wizard/steps/step3-skills/view/SkillsStep";
import ExperienceStep from "@cyopo/Pages/portfolio/wizard/steps/step4-experience/view/ExperienceStep";
import ProjectsStep from "@cyopo/Pages/portfolio/wizard/steps/step5-projects/view/ProjectsStep";
import ReviewStep from "@cyopo/Pages/portfolio/wizard/steps/step6-review/view/ReviewStep";

const EDITOR_TABS = [
  { id: 1, label: "Template", icon: "style" },
  { id: 2, label: "Profile", icon: "account_circle" },
  { id: 3, label: "Skills", icon: "psychology" },
  { id: 4, label: "Experience", icon: "work" },
  { id: 5, label: "Projects", icon: "folder_special" },
  { id: 6, label: "Settings", icon: "settings" },
];

const STEP_COMPONENTS: Record<number, React.FC> = {
  1: TemplateStep,
  2: ProfileStep,
  3: SkillsStep,
  4: ExperienceStep,
  5: ProjectsStep,
  6: ReviewStep,
};

const EditorContent: React.FC = () => {
  const navigate = useNavigate();
  const { currentStep, goToStep, handleSaveDraft, handlePublish } = useEditorContext();

  const portfolio = useAppSelector(selectEditorPortfolio);
  const isSaving = useAppSelector(selectEditorSaving);
  const isDirty = useAppSelector(selectEditorIsDirty);
  const lastSaved = useAppSelector(selectEditorLastSaved);

  const isPublished = portfolio?.status === "PUBLISHED";
  const StepComponent = STEP_COMPONENTS[currentStep];

  const lastSavedLabel = lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString()}` : isDirty ? "Unsaved changes" : "All changes saved";

  return (
    <div>
      {/* Editor page header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => navigate(ROUTES.PORTFOLIOS)}
            className='w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors'>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className='font-headline font-bold text-on-surface text-xl sm:text-2xl truncate max-w-xs sm:max-w-sm'>
              {portfolio?.name ?? "Editing portfolio"}
            </h1>
            <p className={["text-xs mt-0.5 flex items-center gap-1", isDirty ? "text-warning" : "text-success"].join(" ")}>
              <span className='material-symbols-outlined text-[12px]'>{isDirty ? "edit" : "check_circle"}</span>
              {lastSavedLabel}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2 flex-shrink-0'>
          <Button variant='secondary' size='sm' leftIcon={<Save size={14} />} onClick={handleSaveDraft} loading={isSaving} disabled={!isDirty}>
            Save
          </Button>
          <Button
            variant={isPublished ? "ghost" : "primary"}
            size='sm'
            leftIcon={isPublished ? <GlobeLock size={14} /> : <Globe size={14} />}
            onClick={handlePublish}
            loading={isSaving}>
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
        </div>
      </div>

      {/* Tab navigation + content */}
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Sidebar tabs — desktop */}
        <div className='hidden lg:flex flex-col gap-1 w-48 flex-shrink-0'>
          {EDITOR_TABS.map((tab) => {
            const isActive = currentStep === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => goToStep(tab.id)}
                className={[
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                  "transition-all duration-200 text-left",
                  isActive
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                ].join(" ")}>
                <span
                  className='material-symbols-outlined text-[18px]'
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Mobile tabs — horizontal scroll */}
        <div className='flex lg:hidden gap-2 overflow-x-auto pb-2 flex-shrink-0'>
          {EDITOR_TABS.map((tab) => {
            const isActive = currentStep === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => goToStep(tab.id)}
                className={[
                  "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex-shrink-0",
                  "transition-all duration-200",
                  isActive ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container text-on-surface-variant",
                ].join(" ")}>
                <span className='material-symbols-outlined text-[15px]'>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Step content */}
        <div className='flex-1 min-w-0'>
          <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5 sm:p-6'>{StepComponent ? <StepComponent /> : null}</div>

          {/* Mobile save button */}
          <div className='flex gap-3 mt-4 lg:hidden'>
            <Button
              variant='secondary'
              size='md'
              leftIcon={<Save size={15} />}
              onClick={handleSaveDraft}
              loading={isSaving}
              disabled={!isDirty}
              className='flex-1'>
              Save changes
            </Button>
            <Button
              variant={isPublished ? "ghost" : "primary"}
              size='md'
              leftIcon={isPublished ? <GlobeLock size={15} /> : <Globe size={15} />}
              onClick={handlePublish}
              loading={isSaving}
              className='flex-1'>
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditorPage: React.FC = () => {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
};

export default EditorPage;
