import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { DashboardInitialState, DashboardState, DashboardStats } from "../states/Dashboard.state";
import { setDashboardStats, setDashboardLoading, setDashboardError } from "../actions/Dashboard.actions";

const DashboardReducer = createReducer(DashboardInitialState, (builder) => {
  builder
    .addCase(setDashboardStats, (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(setDashboardLoading, (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    })
    .addCase(setDashboardError, (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    });
});

export default DashboardReducer;
