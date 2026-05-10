import type { WizardFormData } from "../../wizard.model.d";
import { WIZARD_INITIAL_FORM_DATA } from "../../wizard.constants";

export interface WizardState {
  currentStep: number;
  formData: WizardFormData;
  isDirty: boolean;
  lastSaved: string | null;
  draftPortfolioId: string | null;
}

export const WizardInitialState: WizardState = {
  currentStep: 1,
  formData: WIZARD_INITIAL_FORM_DATA as WizardFormData,
  isDirty: false,
  lastSaved: null,
  draftPortfolioId: null,
};
