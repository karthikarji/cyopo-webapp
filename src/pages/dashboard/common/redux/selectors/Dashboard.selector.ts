import type { RootState } from "@cyopo/Redux/store/ReduxStore";

export const selectDashboardStats = (state: RootState) => state.cyopo.dashboard.stats.stats;
export const selectDashboardLoading = (state: RootState) => state.cyopo.dashboard.stats.isLoading;
export const selectDashboardError = (state: RootState) => state.cyopo.dashboard.stats.error;
