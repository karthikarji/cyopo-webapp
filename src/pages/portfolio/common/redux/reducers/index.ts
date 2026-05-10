import { combineReducers } from "@reduxjs/toolkit";
import PortfolioReducer from "./Portfolio.reducer";
import WizardRootReducer from "@cyopo/Pages/portfolio/wizard/common/redux/reducers";

const PortfolioRootReducer = combineReducers({
  list: PortfolioReducer,
  wizard: WizardRootReducer,
});

export default PortfolioRootReducer;
