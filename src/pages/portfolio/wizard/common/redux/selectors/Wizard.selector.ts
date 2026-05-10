import type { RootState } from "@cyopo/Redux/store/ReduxStore";

export const selectWizardStep = (state: RootState) => state.cyopo.portfolio.wizard.form.currentStep;
export const selectWizardFormData = (state: RootState) => state.cyopo.portfolio.wizard.form.formData;
export const selectWizardIsDirty = (state: RootState) => state.cyopo.portfolio.wizard.form.isDirty;
export const selectWizardLastSaved = (state: RootState) => state.cyopo.portfolio.wizard.form.lastSaved;
export const selectWizardTemplate = (state: RootState) => state.cyopo.portfolio.wizard.form.formData.template;
export const selectWizardProfile = (state: RootState) => state.cyopo.portfolio.wizard.form.formData.profile;
export const selectWizardSkills = (state: RootState) => state.cyopo.portfolio.wizard.form.formData.skills;
export const selectWizardExperience = (state: RootState) => state.cyopo.portfolio.wizard.form.formData.experience;
export const selectWizardProjects = (state: RootState) => state.cyopo.portfolio.wizard.form.formData.projects;
export const selectWizardReview = (state: RootState) => state.cyopo.portfolio.wizard.form.formData.review;
export const selectWizardDraftId = (state: RootState) => state.cyopo.portfolio.wizard.form.draftPortfolioId;
