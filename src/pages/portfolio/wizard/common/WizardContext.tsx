import React, { createContext, useContext, useCallback } from "react";
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
} from "./wizard.model.d";

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

const WizardContext = createContext<WizardContextValue | null>(null);

export const useWizardContext = (): WizardContextValue => {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizardContext must be used inside WizardProvider");
  return ctx;
};

interface Props {
  children: React.ReactNode;
}

export const WizardProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

      dispatch(wizardSetLastSaved(new Date().toISOString()));
      Notify.success("Draft saved — you can continue filling in details");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to save draft");
    }
  }, [formData, draftPortfolioId, dispatch]);

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
      experiences: formData.experience.experiences,
      projects: formData.projects.projects,
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
  }, [formData, draftPortfolioId, dispatch, navigate, goToStep]);

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        formData,
        isLoading: false,
        isDirty,
        lastSaved,
        updateTemplate,
        updateProfile,
        updateSkills,
        updateExperience,
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
    </WizardContext.Provider>
  );
};
