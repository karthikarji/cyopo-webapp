import { combineReducers } from "@reduxjs/toolkit";
import PortfolioReducer from "./Portfolio.reducer";
import WizardRootReducer from "@cyopo/Pages/portfolio/wizard/common/redux/reducers";
import EditorRootReducer from "@cyopo/Pages/portfolio/editor/common/redux/reducers";

const PortfolioRootReducer = combineReducers({
  list: PortfolioReducer,
  wizard: WizardRootReducer,
  editor: EditorRootReducer,
});

export default PortfolioRootReducer;
