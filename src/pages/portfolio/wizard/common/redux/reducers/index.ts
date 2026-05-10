import { combineReducers } from "@reduxjs/toolkit";
import WizardReducer from "./Wizard.reducer";

const WizardRootReducer = combineReducers({
  form: WizardReducer,
});

export default WizardRootReducer;
