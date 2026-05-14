import { combineReducers } from "@reduxjs/toolkit";
import EditorReducer from "./Editor.reducer";

const EditorRootReducer = combineReducers({
  form: EditorReducer,
});

export default EditorRootReducer;
