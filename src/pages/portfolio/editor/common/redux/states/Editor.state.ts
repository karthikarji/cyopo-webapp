import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

export interface EditorState {
  portfolio: Portfolio | null;
  isLoading: boolean;
  isSaving: boolean;
  isDirty: boolean;
  lastSaved: string | null;
  error: string | null;
}

export const EditorInitialState: EditorState = {
  portfolio: null,
  isLoading: false,
  isSaving: false,
  isDirty: false,
  lastSaved: null,
  error: null,
};
