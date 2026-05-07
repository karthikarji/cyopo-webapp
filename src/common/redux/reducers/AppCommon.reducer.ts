import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { AppCommonState, AppCommonInitialState } from "@cyopo/Redux/states/AppCommon.state";
import { setUser, clearUser, setTheme, setAppReady, setAuthenticated } from "@cyopo/Redux/actions/AppCommon.actions";
import type { User } from "@cyopo/Models/auth/auth.model";

const AppCommonReducer = createReducer(AppCommonInitialState, (builder) => {
  builder
    .addCase(setUser, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(clearUser, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(setTheme, (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    })
    .addCase(setAppReady, (state, action: PayloadAction<boolean>) => {
      state.isAppReady = action.payload;
    })
    .addCase(setAuthenticated, (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    });
});

export default AppCommonReducer;
