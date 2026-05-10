import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { setUser, setAppReady, setTheme, clearUser, setAuthenticated } from "@cyopo/Redux/actions/AppCommon.actions";
import { selectIsAppReady, selectTheme } from "@cyopo/Redux/selectors/AppCommon.selector";
import AuthenticationService from "@cyopo/Services/auth/AuthenticationService";
import StorageService from "@cyopo/Services/storage/StorageService";
import { STORAGE_KEYS } from "@cyopo/Constants/app/App.constants";
import AppRoutes from "@cyopo/App/route/AppRoutes";
import styles from "./App.module.css";

/**
 * App
 * Functional component that handles the init sequence.
 * 1. Read persisted theme and apply to <html>
 * 2. Check if user session exists in storage
 * 3. Hydrate Redux with user from storage
 * 4. Mark app as ready — routes render
 */
const AppInner: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAppReady = useAppSelector(selectIsAppReady);
  const theme = useAppSelector(selectTheme);

  // 1. App init — hydrate theme and user session
  useEffect(() => {
    const initApp = async () => {
      try {
        const savedTheme = StorageService.get<"light" | "dark">(STORAGE_KEYS.THEME);
        const activeTheme = savedTheme ?? "light";
        dispatch(setTheme(activeTheme));
        document.documentElement.classList.toggle("dark", activeTheme === "dark");

        const user = AuthenticationService.getUser();
        if (user && AuthenticationService.isAuthenticated()) {
          dispatch(setUser(user));
        }
      } catch (error) {
        console.error("App init failed:", error);
      } finally {
        dispatch(setAppReady(true));
      }
    };

    initApp();
  }, [dispatch]);

  // 2. Apply theme class whenever theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    StorageService.set(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // 3. Listen for auth:logout event dispatched by RestInstance interceptor
  //    when token refresh fails — clears Redux and PrivateRoute redirects to /login
  useEffect(() => {
    const handleAuthLogout = () => {
      dispatch(clearUser());
      dispatch(setAuthenticated(false));
    };

    window.addEventListener("auth:logout", handleAuthLogout);
    return () => window.removeEventListener("auth:logout", handleAuthLogout);
  }, [dispatch]);

  if (!isAppReady) {
    return (
      <div className={styles.appLoading}>
        <div className={styles.appSpinner}>
          <div className={styles.appSpinnerDot} />
          <span className={styles.appLogo}>cyopo</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

const App: React.FC = () => {
  return <AppInner />;
};

export default App;
