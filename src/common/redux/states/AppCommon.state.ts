import type { User } from "@cyopo/Models/auth/auth.model";

export interface AppCommonState {
  user: User | null;
  isAuthenticated: boolean;
  theme: "light" | "dark";
  isAppReady: boolean;
}

export const AppCommonInitialState: AppCommonState = {
  user: null,
  isAuthenticated: false,
  theme: "light",
  isAppReady: false,
};
