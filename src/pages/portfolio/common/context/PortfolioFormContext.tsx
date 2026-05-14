import { createContext, useContext } from "react";
import type {
  WizardFormData,
  WizardTemplateData,
  WizardProfileData,
  WizardSkillsData,
  WizardExperienceData,
  WizardProjectsData,
  WizardReviewData,
} from "@cyopo/Pages/portfolio/wizard/common/wizard.model.d";

export interface IPortfolioFormContext {
  currentStep: number;
  formData: WizardFormData;
  isLoading: boolean;
  isDirty: boolean;
  lastSaved: string | null;
  portfolioId: string | null;
  resumeFile: File | null;
  resumeFileName: string | null;
  resumeIsDirty: boolean;
  resumeRemoved: boolean;

  updateTemplate: (data: Partial<WizardTemplateData>) => void;
  updateProfile: (data: Partial<WizardProfileData>) => void;
  updateSkills: (data: Partial<WizardSkillsData>) => void;
  updateExperience: (data: Partial<WizardExperienceData>) => void;
  updateProjects: (data: Partial<WizardProjectsData>) => void;
  updateReview: (data: Partial<WizardReviewData>) => void;
  setResumeFile: (file: File | null) => void;
  setResumeFileName: (name: string | null) => void;
  setResumeIsDirty: (dirty: boolean) => void;
  setResumeRemoved: (removed: boolean) => void;
  goNext: () => void;
  goPrev: () => void;
  goToStep: (step: number) => void;
  handleSaveDraft: () => void;
  handleExit: () => void;
  handlePublish: () => void;
}

export const PortfolioFormContext = createContext<IPortfolioFormContext | null>(null);

export const usePortfolioFormContext = (): IPortfolioFormContext => {
  const ctx = useContext(PortfolioFormContext);
  if (!ctx) throw new Error("usePortfolioFormContext must be used inside WizardProvider or EditorProvider");
  return ctx;
};
