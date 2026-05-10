import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { WizardInitialState } from "../states/Wizard.state";
import { TOTAL_STEPS } from "../../wizard.constants";
import type {
  WizardTemplateData,
  WizardProfileData,
  WizardSkillsData,
  WizardExperienceData,
  WizardProjectsData,
  WizardReviewData,
} from "../../wizard.model.d";
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
} from "../actions/Wizard.actions";

const WizardReducer = createReducer(WizardInitialState, (builder) => {
  builder
    .addCase(wizardGoNext, (state) => {
      state.currentStep = Math.min(state.currentStep + 1, TOTAL_STEPS);
    })
    .addCase(wizardGoPrev, (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 1);
    })
    .addCase(wizardGoToStep, (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    })
    .addCase(wizardReset, () => WizardInitialState)
    .addCase(wizardSetLastSaved, (state, action: PayloadAction<string>) => {
      state.lastSaved = action.payload;
      state.isDirty = false;
    })
    .addCase(wizardUpdateTemplate, (state, action: PayloadAction<Partial<WizardTemplateData>>) => {
      state.formData.template = { ...state.formData.template, ...action.payload };
      state.isDirty = true;
    })
    .addCase(wizardUpdateProfile, (state, action: PayloadAction<Partial<WizardProfileData>>) => {
      state.formData.profile = { ...state.formData.profile, ...action.payload };
      state.isDirty = true;
    })
    .addCase(wizardUpdateSkills, (state, action: PayloadAction<Partial<WizardSkillsData>>) => {
      state.formData.skills = { ...state.formData.skills, ...action.payload };
      state.isDirty = true;
    })
    .addCase(wizardUpdateExperience, (state, action: PayloadAction<Partial<WizardExperienceData>>) => {
      state.formData.experience = { ...state.formData.experience, ...action.payload };
      state.isDirty = true;
    })
    .addCase(wizardUpdateProjects, (state, action: PayloadAction<Partial<WizardProjectsData>>) => {
      state.formData.projects = { ...state.formData.projects, ...action.payload };
      state.isDirty = true;
    })
    .addCase(wizardUpdateReview, (state, action: PayloadAction<Partial<WizardReviewData>>) => {
      state.formData.review = { ...state.formData.review, ...action.payload };
      state.isDirty = true;
    })
    .addCase(wizardSetDraftId, (state, action: PayloadAction<string | null>) => {
      state.draftPortfolioId = action.payload;
    });
});

export default WizardReducer;
