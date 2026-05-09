import { combineReducers } from "@reduxjs/toolkit";
import PortfolioReducer from "./Portfolio.reducer";

const PortfolioRootReducer = combineReducers({
  list: PortfolioReducer,
});

export default PortfolioRootReducer;
