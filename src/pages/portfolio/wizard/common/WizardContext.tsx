import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import {
  selectWizardStep,
  selectWizardFormData,
  selectWizardIsDirty,
  selectWizardLastSaved,
  selectWizardDraftId,
} from "./redux/selectors/Wizard.selector";
import {
  wizardGoNext,
  wizardGoPrev,
  wizardGoToStep,
  wizardReset,
  wizardSetLastSaved,
  wizardUpdateTemplate,
  wizardUpdateProfile,
  wizardUpdateSkills,
  wizardUpdateExperience,
  wizardUpdateProjects,
  wizardUpdateReview,
  wizardSetDraftId,
  wizardUpdateEducation,
} from "./redux/actions/Wizard.actions";
import { addPortfolio, updatePortfolio } from "@cyopo/Pages/portfolio/common/redux/actions/Portfolio.actions";
import { PortfolioAPIService } from "@cyopo/Services/api/portfolio/PortfolioAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import Spinner from "@cyopo/Services/spinner/Spinner";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import { PortfolioFormContext, usePortfolioFormContext } from "@cyopo/Pages/portfolio/common/context/PortfolioFormContext";
import type {
  WizardTemplateData,
  WizardProfileData,
  WizardSkillsData,
  WizardExperienceData,
  WizardProjectsData,
  WizardReviewData,
  WizardEducationData,
} from "./wizard.model.d";

export { usePortfolioFormContext as useWizardContext };

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

interface Props {
  children: React.ReactNode;
}

export const WizardProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ─── Redux state ──────────────────────────────────────────────────
  const currentStep = useAppSelector(selectWizardStep);
  const formData = useAppSelector(selectWizardFormData);
  const isDirty = useAppSelector(selectWizardIsDirty);
  const lastSaved = useAppSelector(selectWizardLastSaved);
  const draftPortfolioId = useAppSelector(selectWizardDraftId);

  // ─── Local file state — not in Redux ─────────────────────────────
  // Profile photo — stored as File until portfolio is saved
  // Uploaded to Cloudinary AFTER portfolio create/update (Option D)
  // to avoid orphaned files if user closes without saving
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

  // Resume file state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [resumeIsDirty, setResumeIsDirty] = useState(false);
  const [resumeRemoved, setResumeRemoved] = useState(false);

  // ─── Navigation ───────────────────────────────────────────────────
  const goNext = useCallback(() => dispatch(wizardGoNext()), [dispatch]);
  const goPrev = useCallback(() => dispatch(wizardGoPrev()), [dispatch]);
  const goToStep = useCallback((s: number) => dispatch(wizardGoToStep(s)), [dispatch]);

  // ─── Form updates → Redux ─────────────────────────────────────────
  const updateTemplate = useCallback((d: Partial<WizardTemplateData>) => dispatch(wizardUpdateTemplate(d)), [dispatch]);
  const updateProfile = useCallback((d: Partial<WizardProfileData>) => dispatch(wizardUpdateProfile(d)), [dispatch]);
  const updateSkills = useCallback((d: Partial<WizardSkillsData>) => dispatch(wizardUpdateSkills(d)), [dispatch]);
  const updateExperience = useCallback((d: Partial<WizardExperienceData>) => dispatch(wizardUpdateExperience(d)), [dispatch]);
  const updateProjects = useCallback((d: Partial<WizardProjectsData>) => dispatch(wizardUpdateProjects(d)), [dispatch]);
  const updateReview = useCallback((d: Partial<WizardReviewData>) => dispatch(wizardUpdateReview(d)), [dispatch]);
  const updateEducation = useCallback((d: Partial<WizardEducationData>) => dispatch(wizardUpdateEducation(d)), [dispatch]);

  // ─── Exit ─────────────────────────────────────────────────────────
  const handleExit = useCallback(() => {
    dispatch(wizardSetDraftId(null));
    dispatch(wizardReset());
    navigate(ROUTES.PORTFOLIOS);
  }, [dispatch, navigate]);

  // ─── Save Draft ───────────────────────────────────────────────────
  const handleSaveDraft = useCallback(async () => {
    if (!formData.template.templateId) {
      Notify.warn("Please select a template first");
      return;
    }

    const payload = {
      name: formData.review.portfolioName || `${formData.profile.name || "My"}'s Portfolio`,
      templateId: formData.template.templateId,
      slug: formData.review.slug || slugify(formData.profile.name || "my-portfolio"),
      profile: {
        name: formData.profile.name || "My Portfolio",
        title: formData.profile.title || "",
        bio: formData.profile.bio || "",
        email: formData.profile.email || "",
        phone: formData.profile.phone || undefined,
        location: formData.profile.location || undefined,
        website: formData.profile.website || undefined,
        // blob: URL is a temporary browser preview — never send to backend
        // real Cloudinary URL will be set after upload in Step 2 below
        profilePhoto: formData.profile.profilePhoto?.startsWith("blob:") ? undefined : formData.profile.profilePhoto || undefined,
        socialMedia: formData.profile.socialMedia || [],
      },
      skills: formData.skills.skills ?? [],
      certifications: formData.skills.certifications ?? [],
      customSkillCategories: formData.skills.customCategories ?? [],
      experiences: formData.experience.experiences.map((exp) => ({
        ...exp,
        startDate: exp.startDate || undefined,
        endDate: exp.endDate || undefined,
        location: exp.location || undefined,
      })),
      projects: formData.projects.projects.map((proj) => ({
        ...proj,
        completedDate: proj.completedDate || undefined,
        demoUrl: proj.demoUrl || undefined,
        githubUrl: proj.githubUrl || undefined,
      })),
      educations: formData.education.educations.map((edu) => ({
        ...edu,
        endDate: edu.endDate || undefined,
      })),
      settings: {
        isPublic: false,
        showContactInfo: formData.review.showContact ?? true,
        allowComments: formData.review.allowMessages ?? false,
        showSkillLevels: formData.review.showSkillLevels ?? true,
        customDomain: formData.review.customDomain || undefined,
      },
    };

    try {
      let portfolio;

      if (draftPortfolioId) {
        // Draft already exists — update it
        portfolio = await Spinner.on(PortfolioAPIService.updatePortfolio(draftPortfolioId, payload));
        dispatch(updatePortfolio(portfolio));
      } else {
        // First save — create new draft
        portfolio = await Spinner.on(PortfolioAPIService.createPortfolio(payload));
        dispatch(addPortfolio(portfolio));
        dispatch(wizardSetDraftId(portfolio.id));
      }

      // Portfolio ID for all subsequent calls
      const pid = draftPortfolioId ?? portfolio.id;

      // Step 2 — Upload profile photo AFTER portfolio exists
      // Option D: we stored the File locally on pick, upload now
      // This prevents orphaned Cloudinary files if user never saves
      if (profilePhotoFile) {
        const url = await PortfolioAPIService.uploadProfilePhoto(pid, profilePhotoFile);
        updateProfile({ profilePhoto: url }); // replace blob: with Cloudinary URL
        setProfilePhotoFile(null); // clear file from state
      }

      // Step 3 — Delete resume if user removed it
      if (resumeRemoved) {
        await PortfolioAPIService.deleteResume(pid);
        setResumeFileName(null);
        setResumeRemoved(false);
      }

      // Step 4 — Upload resume if user picked a new file
      if (resumeIsDirty && resumeFile) {
        await PortfolioAPIService.uploadResume(pid, resumeFile);
        setResumeFileName(resumeFile.name);
        setResumeIsDirty(false);
        setResumeFile(null);
      }

      dispatch(wizardSetLastSaved(new Date().toISOString()));
      Notify.success("Draft saved — you can continue filling in details");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to save draft");
    }
  }, [formData, draftPortfolioId, profilePhotoFile, resumeFile, resumeIsDirty, resumeRemoved, dispatch, updateProfile]);

  // ─── Publish ──────────────────────────────────────────────────────
  const handlePublish = useCallback(async () => {
    if (!formData.template.templateId) {
      Notify.warn("Please select a template first");
      goToStep(1);
      return;
    }
    if (!formData.profile.name || !formData.profile.email) {
      Notify.warn("Please fill in your profile information");
      goToStep(2);
      return;
    }

    const payload = {
      name: formData.review.portfolioName || `${formData.profile.name}'s Portfolio`,
      templateId: formData.template.templateId,
      slug: formData.review.slug || slugify(formData.profile.name),
      profile: {
        name: formData.profile.name,
        title: formData.profile.title,
        bio: formData.profile.bio,
        email: formData.profile.email,
        phone: formData.profile.phone || undefined,
        location: formData.profile.location || undefined,
        website: formData.profile.website || undefined,
        // Same as handleSaveDraft — strip blob: URLs
        profilePhoto: formData.profile.profilePhoto?.startsWith("blob:") ? undefined : formData.profile.profilePhoto || undefined,
        socialMedia: formData.profile.socialMedia,
      },
      skills: formData.skills.skills,
      customSkillCategories: formData.skills.customCategories ?? [],
      certifications: formData.skills.certifications,
      experiences: formData.experience.experiences.map((exp) => ({
        ...exp,
        startDate: exp.startDate || undefined,
        endDate: exp.endDate || undefined,
        location: exp.location || undefined,
      })),
      projects: formData.projects.projects.map((proj) => ({
        ...proj,
        completedDate: proj.completedDate || undefined,
        demoUrl: proj.demoUrl || undefined,
        githubUrl: proj.githubUrl || undefined,
      })),
      educations: formData.education.educations.map((edu) => ({
        ...edu,
        endDate: edu.endDate || undefined,
      })),
      settings: {
        isPublic: formData.review.isPublic,
        showContactInfo: formData.review.showContact,
        allowComments: formData.review.allowMessages,
        showSkillLevels: formData.review.showSkillLevels,
        customDomain: formData.review.customDomain || undefined,
      },
    };

    try {
      let portfolio;

      if (draftPortfolioId) {
        // Draft exists — update then publish
        portfolio = await Spinner.on(PortfolioAPIService.updatePortfolio(draftPortfolioId, payload));
        dispatch(updatePortfolio(portfolio));
      } else {
        // No draft — create fresh
        portfolio = await Spinner.on(PortfolioAPIService.createPortfolio(payload));
        dispatch(addPortfolio(portfolio));
      }

      const pid = draftPortfolioId ?? portfolio.id;

      // Step 2 — Upload profile photo (same pattern as handleSaveDraft)
      if (profilePhotoFile) {
        const url = await PortfolioAPIService.uploadProfilePhoto(pid, profilePhotoFile);
        updateProfile({ profilePhoto: url });
        setProfilePhotoFile(null);
      }

      // Step 3 — Delete resume if removed
      if (resumeRemoved) {
        await PortfolioAPIService.deleteResume(pid);
        setResumeFileName(null);
        setResumeRemoved(false);
      }

      // Step 4 — Upload resume if new file picked
      if (resumeIsDirty && resumeFile) {
        await PortfolioAPIService.uploadResume(pid, resumeFile);
        setResumeFileName(resumeFile.name);
        setResumeIsDirty(false);
        setResumeFile(null);
      }

      // Step 5 — Publish if isPublic toggled on
      if (formData.review.isPublic) {
        await PortfolioAPIService.updateStatus(portfolio.id, "PUBLISHED");
      }

      dispatch(wizardSetDraftId(null));
      dispatch(wizardReset());
      Notify.success("Portfolio created successfully! 🎉");
      navigate(ROUTES.PORTFOLIOS);
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to create portfolio");
    }
  }, [formData, draftPortfolioId, profilePhotoFile, resumeFile, resumeIsDirty, resumeRemoved, dispatch, navigate, goToStep, updateProfile]);

  // ─── Provider ─────────────────────────────────────────────────────
  return (
    <PortfolioFormContext.Provider
      value={{
        currentStep,
        formData,
        isLoading: false,
        isDirty,
        lastSaved,
        portfolioId: draftPortfolioId,

        // Profile photo file — wizard stores locally, uploads on save
        profilePhotoFile,
        setProfilePhotoFile,

        // Resume state
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
        handleSaveDraft,
        handleExit,
        handlePublish,
      }}>
      {children}
    </PortfolioFormContext.Provider>
  );
};
