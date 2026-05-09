import { combineReducers } from "@reduxjs/toolkit";
import DashboardReducer from "./Dashboard.reducer";

const DashboardRootReducer = combineReducers({
  stats: DashboardReducer,
});

export default DashboardRootReducer;
