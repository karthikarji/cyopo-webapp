import { createAction } from "@reduxjs/toolkit";
import type {
  WizardTemplateData,
  WizardProfileData,
  WizardSkillsData,
  WizardExperienceData,
  WizardProjectsData,
  WizardReviewData,
  WizardEducationData,
} from "../../wizard.model.d";

export const wizardGoNext = createAction("wizard/GO_NEXT");
export const wizardGoPrev = createAction("wizard/GO_PREV");
export const wizardGoToStep = createAction<number>("wizard/GO_TO_STEP");
export const wizardReset = createAction("wizard/RESET");
export const wizardSetLastSaved = createAction<string>("wizard/SET_LAST_SAVED");

export const wizardUpdateTemplate = createAction<Partial<WizardTemplateData>>("wizard/UPDATE_TEMPLATE");
export const wizardUpdateProfile = createAction<Partial<WizardProfileData>>("wizard/UPDATE_PROFILE");
export const wizardUpdateSkills = createAction<Partial<WizardSkillsData>>("wizard/UPDATE_SKILLS");
export const wizardUpdateExperience = createAction<Partial<WizardExperienceData>>("wizard/UPDATE_EXPERIENCE");
export const wizardUpdateProjects = createAction<Partial<WizardProjectsData>>("wizard/UPDATE_PROJECTS");
export const wizardUpdateReview = createAction<Partial<WizardReviewData>>("wizard/UPDATE_REVIEW");
export const wizardSetDraftId = createAction<string | null>("wizard/SET_DRAFT_ID");
export const wizardUpdateEducation = createAction<Partial<WizardEducationData>>("wizard/UPDATE_EDUCATION");
