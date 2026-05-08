/**
 * ReduxStore
 * Central Redux store using Redux Toolkit's configureStore.
 * Follows the same two-level pattern as the enterprise app:
 *   - cyopo.common  → global app state (user session, theme)
 *   - cyopo.auth    → auth page state
 *   - cyopo.portfolio → portfolio feature state
 *   - cyopo.templates → templates feature state
 *   - cyopo.analytics → analytics feature state
 *   - cyopo.admin   → admin feature state
 */

import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "@cyopo/Redux/reducers";

const ReduxStore = configureStore({
  reducer: {
    cyopo: RootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;

export default ReduxStore;
