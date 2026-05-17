import React, { createContext, useContext, useCallback, useState } from "react";
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
import type {
  WizardContextValue,
  WizardTemplateData,
  WizardProfileData,
  WizardSkillsData,
  WizardExperienceData,
  WizardProjectsData,
  WizardReviewData,
  WizardEducationData,
} from "./wizard.model.d";

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

// const WizardContext = createContext<WizardContextValue | null>(null);

// export const useWizardContext = (): WizardContextValue => {
//   const ctx = useContext(WizardContext);
//   if (!ctx) throw new Error("useWizardContext must be used inside WizardProvider");
//   return ctx;
// };

import { PortfolioFormContext, usePortfolioFormContext } from "@cyopo/Pages/portfolio/common/context/PortfolioFormContext";

export { usePortfolioFormContext as useWizardContext };

interface Props {
  children: React.ReactNode;
}

export const WizardProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [resumeIsDirty, setResumeIsDirty] = useState(false);
  const [resumeRemoved, setResumeRemoved] = useState(false);

  // All state from Redux
  const currentStep = useAppSelector(selectWizardStep);
  const formData = useAppSelector(selectWizardFormData);
  const isDirty = useAppSelector(selectWizardIsDirty);
  const lastSaved = useAppSelector(selectWizardLastSaved);
  const draftPortfolioId = useAppSelector(selectWizardDraftId);

  // Navigation
  const goNext = useCallback(() => dispatch(wizardGoNext()), [dispatch]);
  const goPrev = useCallback(() => dispatch(wizardGoPrev()), [dispatch]);
  const goToStep = useCallback((s: number) => dispatch(wizardGoToStep(s)), [dispatch]);

  // Form updates — dispatched to Redux
  const updateTemplate = useCallback((data: Partial<WizardTemplateData>) => dispatch(wizardUpdateTemplate(data)), [dispatch]);
  const updateProfile = useCallback((data: Partial<WizardProfileData>) => dispatch(wizardUpdateProfile(data)), [dispatch]);
  const updateSkills = useCallback((data: Partial<WizardSkillsData>) => dispatch(wizardUpdateSkills(data)), [dispatch]);
  const updateExperience = useCallback((data: Partial<WizardExperienceData>) => dispatch(wizardUpdateExperience(data)), [dispatch]);
  const updateProjects = useCallback((data: Partial<WizardProjectsData>) => dispatch(wizardUpdateProjects(data)), [dispatch]);
  const updateReview = useCallback((data: Partial<WizardReviewData>) => dispatch(wizardUpdateReview(data)), [dispatch]);
  const updateEducation = useCallback((d: Partial<WizardEducationData>) => dispatch(wizardUpdateEducation(d)), [dispatch]);

  const handleExit = useCallback(() => {
    dispatch(wizardSetDraftId(null));
    dispatch(wizardReset());
    navigate(ROUTES.PORTFOLIOS);
  }, [dispatch, navigate]);

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
        profilePhoto: formData.profile.profilePhoto || undefined,
        socialMedia: formData.profile.socialMedia || [],
      },
      skills: formData.skills.skills ?? [],
      certifications: formData.skills.certifications ?? [],
      experiences: formData.experience.experiences ?? [],
      projects: formData.projects.projects ?? [],
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
        // Store the draft ID so next save updates instead of creating
        dispatch(wizardSetDraftId(portfolio.id));
      }

      // Resume handling — sequential after portfolio save
      const pid = draftPortfolioId ?? portfolio.id;

      if (resumeRemoved) {
        await PortfolioAPIService.deleteResume(pid);
        setResumeFileName(null);
        setResumeRemoved(false);
      }

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
  }, [formData, draftPortfolioId, resumeFile, resumeIsDirty, resumeRemoved, dispatch]);

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
        profilePhoto: formData.profile.profilePhoto || undefined,
        socialMedia: formData.profile.socialMedia,
      },
      skills: formData.skills.skills,
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
        // Draft exists — update it then publish
        portfolio = await Spinner.on(PortfolioAPIService.updatePortfolio(draftPortfolioId, payload));
        dispatch(updatePortfolio(portfolio));
      } else {
        // No draft — create fresh
        portfolio = await Spinner.on(PortfolioAPIService.createPortfolio(payload));
        dispatch(addPortfolio(portfolio));
      }

      // Resume handling — sequential after portfolio save
      const pid = draftPortfolioId ?? portfolio.id;

      if (resumeRemoved) {
        await PortfolioAPIService.deleteResume(pid);
        setResumeFileName(null);
        setResumeRemoved(false);
      }

      if (resumeIsDirty && resumeFile) {
        await PortfolioAPIService.uploadResume(pid, resumeFile);
        setResumeFileName(resumeFile.name);
        setResumeIsDirty(false);
        setResumeFile(null);
      }

      // Publish if isPublic
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
  }, [formData, draftPortfolioId, resumeFile, resumeIsDirty, resumeRemoved, dispatch, navigate, goToStep]);

  return (
    <PortfolioFormContext.Provider
      value={{
        currentStep,
        formData,
        isLoading: false,
        isDirty,
        lastSaved,
        portfolioId: draftPortfolioId,
        resumeFile,
        resumeFileName,
        resumeIsDirty,
        resumeRemoved,
        setResumeFile,
        setResumeFileName,
        setResumeIsDirty,
        setResumeRemoved,
        updateTemplate,
        updateProfile,
        updateSkills,
        updateExperience,
        updateEducation,
        updateProjects,
        updateReview,
        goNext,
        goPrev,
        goToStep,
        handleSaveDraft,
        handleExit,
        handlePublish,
      }}>
      {children}
    </PortfolioFormContext.Provider>
  );
};
