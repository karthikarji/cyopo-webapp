import type { RootState } from "@cyopo/Redux/store/ReduxStore";

export const selectUser = (state: RootState) => state.cyopo.common.user;
export const selectIsAuthenticated = (state: RootState) => state.cyopo.common.isAuthenticated;
export const selectTheme = (state: RootState) => state.cyopo.common.theme;
export const selectIsAppReady = (state: RootState) => state.cyopo.common.isAppReady;
