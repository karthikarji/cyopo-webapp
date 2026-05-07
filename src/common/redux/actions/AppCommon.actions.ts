import { createAction } from "@reduxjs/toolkit";
import type { User } from "@cyopo/Models/auth/auth.model";

export const setUser = createAction<User>("app/common/SET_USER");
export const clearUser = createAction("app/common/CLEAR_USER");
export const setTheme = createAction<"light" | "dark">("app/common/SET_THEME");
export const setAppReady = createAction<boolean>("app/common/SET_APP_READY");
export const setAuthenticated = createAction<boolean>("app/common/SET_AUTHENTICATED");
