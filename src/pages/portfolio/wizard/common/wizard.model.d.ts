import type { Skill, Certification, Experience, Project, PortfolioProfile } from "@cyopo/Models/portfolio/portfolio.model";

export type WizardStep = "template" | "profile" | "skills" | "experience" | "projects" | "review";

export interface WizardStepConfig {
  id: WizardStep;
  label: string;
  step: number;
}

export interface WizardTemplateData {
  templateId: string;
  templateName: string;
}

export interface WizardProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  profilePhoto: string;
  socialMedia: { platform: string; url: string }[];
}

export interface WizardSkillsData {
  skills: Skill[];
  certifications: Certification[];
}

export interface WizardExperienceData {
  experiences: Experience[];
}

export interface WizardEducationData {
  educations: Education[];
}

export interface WizardProjectsData {
  projects: Project[];
}

export interface WizardReviewData {
  portfolioName: string;
  slug: string;
  isPublic: boolean;
  showContact: boolean;
  allowMessages: boolean;
  showSkillLevels: boolean;
  customDomain: string;
}

export interface WizardFormData {
  template: WizardTemplateData;
  profile: WizardProfileData;
  skills: WizardSkillsData;
  experience: WizardExperienceData;
  education: WizardEducationData;
  projects: WizardProjectsData;
  review: WizardReviewData;
}

export interface WizardContextValue {
  currentStep: number;
  formData: WizardFormData;
  isLoading: boolean;
  isDirty: boolean;
  lastSaved: string | null;
  updateTemplate: (data: Partial<WizardTemplateData>) => void;
  updateProfile: (data: Partial<WizardProfileData>) => void;
  updateSkills: (data: Partial<WizardSkillsData>) => void;
  updateExperience: (data: Partial<WizardExperienceData>) => void;
  updateProjects: (data: Partial<WizardProjectsData>) => void;
  updateReview: (data: Partial<WizardReviewData>) => void;
  goNext: () => void;
  goPrev: () => void;
  goToStep: (step: number) => void;
  handleSaveDraft: () => void;
  handleExit: () => void;
  handlePublish: () => void;
}
