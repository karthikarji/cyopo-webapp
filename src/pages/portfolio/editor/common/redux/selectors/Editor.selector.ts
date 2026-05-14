import type { RootState } from "@cyopo/Redux/store/ReduxStore";

export const selectEditorPortfolio = (s: RootState) => s.cyopo.portfolio.editor.form.portfolio;
export const selectEditorLoading = (s: RootState) => s.cyopo.portfolio.editor.form.isLoading;
export const selectEditorSaving = (s: RootState) => s.cyopo.portfolio.editor.form.isSaving;
export const selectEditorIsDirty = (s: RootState) => s.cyopo.portfolio.editor.form.isDirty;
export const selectEditorLastSaved = (s: RootState) => s.cyopo.portfolio.editor.form.lastSaved;
export const selectEditorError = (s: RootState) => s.cyopo.portfolio.editor.form.error;
