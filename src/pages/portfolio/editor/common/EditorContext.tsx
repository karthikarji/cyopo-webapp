import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import {
  editorSetPortfolio,
  editorSetLoading,
  editorSetSaving,
  editorSetDirty,
  editorSetLastSaved,
  editorSetError,
  editorReset,
} from "./redux/actions/Editor.actions";
import { selectEditorPortfolio, selectEditorLoading, selectEditorIsDirty, selectEditorLastSaved } from "./redux/selectors/Editor.selector";
import { updatePortfolio as updatePortfolioAction } from "@cyopo/Pages/portfolio/common/redux/actions/Portfolio.actions";
import { PortfolioAPIService } from "@cyopo/Services/api/portfolio/PortfolioAPIService";
import { PortfolioFormContext, usePortfolioFormContext } from "@cyopo/Pages/portfolio/common/context/PortfolioFormContext";
import Notify from "@cyopo/Services/notification/Notify";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type {
  WizardFormData,
  WizardTemplateData,
  WizardProfileData,
  WizardSkillsData,
  WizardExperienceData,
  WizardProjectsData,
  WizardReviewData,
  WizardEducationData,
} from "@cyopo/Pages/portfolio/wizard/common/wizard.model.d";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

export { usePortfolioFormContext as useEditorContext };

const portfolioToFormData = (portfolio: Portfolio): WizardFormData => ({
  template: {
    templateId: portfolio.templateId,
    templateName: "",
  },
  profile: {
    name: portfolio.profile?.name ?? "",
    title: portfolio.profile?.title ?? "",
    bio: portfolio.profile?.bio ?? "",
    email: portfolio.profile?.email ?? "",
    phone: portfolio.profile?.phone ?? "",
    location: portfolio.profile?.location ?? "",
    website: portfolio.profile?.website ?? "",
    profilePhoto: portfolio.profile?.profilePhoto ?? "",
    socialMedia: portfolio.profile?.socialMedia ?? [],
  },
  skills: {
    skills: portfolio.skills ?? [],
    certifications: portfolio.certifications ?? [],
  },
  experience: {
    experiences: portfolio.experiences ?? [],
  },
  education: {
    educations: portfolio.educations ?? [],
  },
  projects: {
    projects: portfolio.projects ?? [],
  },
  review: {
    portfolioName: portfolio.name,
    slug: portfolio.slug,
    isPublic: portfolio.settings?.isPublic ?? false,
    showContact: portfolio.settings?.showContactInfo ?? true,
    allowMessages: portfolio.settings?.allowComments ?? false,
    showSkillLevels: portfolio.settings?.showSkillLevels ?? true,
    customDomain: portfolio.settings?.customDomain ?? "",
  },
});

interface Props {
  children: React.ReactNode;
}

export const EditorProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const portfolio = useAppSelector(selectEditorPortfolio);
  const isLoading = useAppSelector(selectEditorLoading);
  const isDirty = useAppSelector(selectEditorIsDirty);
  const lastSaved = useAppSelector(selectEditorLastSaved);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData | null>(null);

  // ─── Profile photo — editor uploads immediately on pick ───────────
  // profilePhotoFile is not used in editor (upload fires on pick, not on save)
  // We still expose it in context to satisfy IPortfolioFormContext interface
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

  // ─── Resume local state ───────────────────────────────────────────
  // Raw setters — used internally after save to reset without re-triggering dirty
  const [resumeFile, setResumeFileRaw] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [resumeIsDirty, setResumeIsDirtyRaw] = useState(false);
  const [resumeRemoved, setResumeRemovedRaw] = useState(false);

  // Wrapped setters — exposed via context, dispatch editorSetDirty(true)
  const setResumeFile = useCallback(
    (file: File | null) => {
      setResumeFileRaw(file);
      if (file) dispatch(editorSetDirty(true));
    },
    [dispatch],
  );

  const setResumeIsDirty = useCallback(
    (dirty: boolean) => {
      setResumeIsDirtyRaw(dirty);
      if (dirty) dispatch(editorSetDirty(true));
    },
    [dispatch],
  );

  const setResumeRemoved = useCallback(
    (removed: boolean) => {
      setResumeRemovedRaw(removed);
      if (removed) dispatch(editorSetDirty(true));
    },
    [dispatch],
  );

  // ─── Load portfolio on mount ──────────────────────────────────────
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        dispatch(editorSetLoading(true));
        const data = await PortfolioAPIService.getPortfolioById(id);
        dispatch(editorSetPortfolio(data));
        setFormData(portfolioToFormData(data));
        // Pre-fill resume filename so UI shows existing resume
        if (data.resumeFileName) {
          setResumeFileName(data.resumeFileName);
        }
      } catch (err: any) {
        dispatch(editorSetError(err?.message ?? "Failed to load portfolio"));
        Notify.error("Failed to load portfolio");
      }
    };
    load();
    return () => {
      dispatch(editorReset());
    };
  }, [id, dispatch]);

  // ─── Form section updaters ────────────────────────────────────────
  const updateSection = useCallback(
    (section: keyof WizardFormData, data: any) => {
      setFormData((prev) => {
        if (!prev) return prev;
        return { ...prev, [section]: { ...prev[section], ...data } };
      });
      dispatch(editorSetDirty(true));
    },
    [dispatch],
  );

  const updateTemplate = useCallback((d: Partial<WizardTemplateData>) => updateSection("template", d), [updateSection]);
  const updateProfile = useCallback((d: Partial<WizardProfileData>) => updateSection("profile", d), [updateSection]);
  const updateSkills = useCallback((d: Partial<WizardSkillsData>) => updateSection("skills", d), [updateSection]);
  const updateExperience = useCallback((d: Partial<WizardExperienceData>) => updateSection("experience", d), [updateSection]);
  const updateEducation = useCallback((d: Partial<WizardEducationData>) => updateSection("education", d), [updateSection]);
  const updateProjects = useCallback((d: Partial<WizardProjectsData>) => updateSection("projects", d), [updateSection]);
  const updateReview = useCallback((d: Partial<WizardReviewData>) => updateSection("review", d), [updateSection]);

  // ─── Navigation ───────────────────────────────────────────────────
  const goNext = useCallback(() => setCurrentStep((s) => Math.min(s + 1, 6)), []);
  const goPrev = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 1)), []);
  const goToStep = useCallback((s: number) => setCurrentStep(s), []);

  // ─── Save ─────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!id || !formData) return;
    try {
      dispatch(editorSetSaving(true));

      // Step 1 — always save portfolio data
      const updated = await PortfolioAPIService.updatePortfolio(id, {
        name: formData.review.portfolioName,
        slug: formData.review.slug,
        templateId: formData.template.templateId,
        profile: {
          name: formData.profile.name,
          title: formData.profile.title,
          bio: formData.profile.bio,
          email: formData.profile.email,
          phone: formData.profile.phone || undefined,
          location: formData.profile.location || undefined,
          website: formData.profile.website || undefined,
          profilePhoto: formData.profile.profilePhoto || undefined,
          socialMedia: formData.profile.socialMedia,
        },
        skills: formData.skills.skills,
        certifications: formData.skills.certifications,
        experiences: formData.experience.experiences.map(({ id: _id, ...exp }) => ({
          ...exp,
          startDate: exp.startDate || undefined,
          endDate: exp.endDate || undefined,
          location: exp.location || undefined,
        })),
        educations: formData.education.educations.map((edu) => ({
          ...edu,
          endDate: edu.endDate || undefined,
        })),
        projects: formData.projects.projects.map((proj) => ({
          ...proj,
          completedDate: proj.completedDate || undefined,
          demoUrl: proj.demoUrl || undefined,
          githubUrl: proj.githubUrl || undefined,
        })),
        settings: {
          isPublic: formData.review.isPublic,
          showContactInfo: formData.review.showContact,
          allowComments: formData.review.allowMessages,
          showSkillLevels: formData.review.showSkillLevels,
          customDomain: formData.review.customDomain || undefined,
        },
      });

      dispatch(editorSetPortfolio(updated));
      dispatch(updatePortfolioAction(updated));

      // Step 2 — delete resume if user removed it
      if (resumeRemoved) {
        await PortfolioAPIService.deleteResume(id);
        setResumeFileName(null);
        setResumeRemovedRaw(false); // raw — avoids re-triggering dirty
      }

      // Step 3 — upload resume if user picked a new file
      if (resumeIsDirty && resumeFile) {
        await PortfolioAPIService.uploadResume(id, resumeFile);
        setResumeFileName(resumeFile.name);
        setResumeIsDirtyRaw(false); // raw — avoids re-triggering dirty
        setResumeFileRaw(null); // raw — avoids re-triggering dirty
      }

      dispatch(editorSetLastSaved(new Date().toISOString()));
      Notify.success("Changes saved");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to save");
    } finally {
      dispatch(editorSetSaving(false));
    }
  }, [
    id,
    formData,
    resumeFile, // ← must be here so closure captures latest File object
    resumeIsDirty, // ← must be here
    resumeRemoved, // ← must be here
    dispatch,
  ]);

  // ─── Publish ──────────────────────────────────────────────────────
  const handlePublish = useCallback(async () => {
    if (!id || !formData) return;
    try {
      dispatch(editorSetSaving(true));
      await handleSave();
      const isPublished = portfolio?.status === "PUBLISHED";
      await PortfolioAPIService.updateStatus(id, isPublished ? "DRAFT" : "PUBLISHED");
      const refreshed = await PortfolioAPIService.getPortfolioById(id);
      dispatch(editorSetPortfolio(refreshed));
      dispatch(updatePortfolioAction(refreshed));
      Notify.success(isPublished ? "Portfolio unpublished" : "Portfolio published! 🎉");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to publish");
    } finally {
      dispatch(editorSetSaving(false));
    }
  }, [id, formData, portfolio, dispatch, handleSave]);

  // ─── Exit ─────────────────────────────────────────────────────────
  const handleExit = useCallback(() => {
    navigate(ROUTES.PORTFOLIOS);
  }, [navigate]);

  // ─── Loading state ────────────────────────────────────────────────
  if (isLoading || !formData) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin' />
          <span className='text-sm text-on-surface-variant'>Loading portfolio...</span>
        </div>
      </div>
    );
  }

  // ─── Provider ─────────────────────────────────────────────────────
  return (
    <PortfolioFormContext.Provider
      value={{
        currentStep,
        formData,
        isLoading,
        isDirty,
        lastSaved,
        portfolioId: id ?? null,

        // Profile photo — editor uploads immediately on pick
        // File object not stored here; exposed to satisfy interface
        profilePhotoFile,
        setProfilePhotoFile,

        // Resume state — wrapped setters dispatch editorSetDirty(true)
        // Raw setters used internally after save to avoid re-triggering dirty
        resumeFile,
        resumeFileName,
        resumeIsDirty,
        resumeRemoved,
        setResumeFile,
        setResumeFileName,
        setResumeIsDirty,
        setResumeRemoved,

        // Form updaters
        updateTemplate,
        updateProfile,
        updateSkills,
        updateExperience,
        updateEducation,
        updateProjects,
        updateReview,

        // Navigation
        goNext,
        goPrev,
        goToStep,

        // Actions
        handleSaveDraft: handleSave,
        handleExit,
        handlePublish,
      }}>
      {children}
    </PortfolioFormContext.Provider>
  );
};
