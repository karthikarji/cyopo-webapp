import { createAction } from "@reduxjs/toolkit";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

export const editorSetPortfolio = createAction<Portfolio | null>("editor/SET_PORTFOLIO");
export const editorSetLoading = createAction<boolean>("editor/SET_LOADING");
export const editorSetSaving = createAction<boolean>("editor/SET_SAVING");
export const editorSetDirty = createAction<boolean>("editor/SET_DIRTY");
export const editorSetLastSaved = createAction<string>("editor/SET_LAST_SAVED");
export const editorSetError = createAction<string | null>("editor/SET_ERROR");
export const editorReset = createAction("editor/RESET");
