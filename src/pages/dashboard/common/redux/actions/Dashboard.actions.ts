import { createAction } from "@reduxjs/toolkit";
import type { DashboardStats } from "../states/Dashboard.state";

export const setDashboardStats = createAction<DashboardStats>("dashboard/SET_STATS");
export const setDashboardLoading = createAction<boolean>("dashboard/SET_LOADING");
export const setDashboardError = createAction<string | null>("dashboard/SET_ERROR");
