import type { WizardStepConfig } from "./wizard.model";

export const WIZARD_STEPS: WizardStepConfig[] = [
  { id: "template", label: "Template", step: 1 },
  { id: "profile", label: "Profile", step: 2 },
  { id: "skills", label: "Skills", step: 3 },
  { id: "experience", label: "Experience", step: 4 },
  { id: "projects", label: "Projects", step: 5 },
  { id: "review", label: "Review & publish", step: 6 },
];

export const TOTAL_STEPS = WIZARD_STEPS.length;

export const WIZARD_INITIAL_FORM_DATA = {
  template: {
    templateId: "",
    templateName: "",
  },
  profile: {
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    profilePhoto: "",
    socialMedia: [],
  },
  skills: {
    skills: [],
    certifications: [],
  },
  experience: {
    experiences: [],
  },
  education: {
    educations: [],
  },
  projects: {
    projects: [],
  },
  review: {
    portfolioName: "",
    slug: "",
    isPublic: true,
    showContact: true,
    allowMessages: false,
    showSkillLevels: true,
    customDomain: "",
  },
};
