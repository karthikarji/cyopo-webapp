import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { EditorInitialState } from "../states/Editor.state";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";
import {
  editorSetPortfolio,
  editorSetLoading,
  editorSetSaving,
  editorSetDirty,
  editorSetLastSaved,
  editorSetError,
  editorReset,
} from "../actions/Editor.actions";

const EditorReducer = createReducer(EditorInitialState, (builder) => {
  builder
    .addCase(editorSetPortfolio, (state, action: PayloadAction<Portfolio | null>) => {
      state.portfolio = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(editorSetLoading, (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    })
    .addCase(editorSetSaving, (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    })
    .addCase(editorSetDirty, (state, action: PayloadAction<boolean>) => {
      state.isDirty = action.payload;
    })
    .addCase(editorSetLastSaved, (state, action: PayloadAction<string>) => {
      state.lastSaved = action.payload;
      state.isDirty = false;
    })
    .addCase(editorSetError, (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(editorReset, () => EditorInitialState);
});

export default EditorReducer;
