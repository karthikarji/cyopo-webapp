import { combineReducers } from "@reduxjs/toolkit";
import AppCommonReducer from "@cyopo/Redux/reducers/AppCommon.reducer.ts";
import AuthReducer from "@cyopo/Pages/auth/common/redux/reducers";
import PortfolioReducer from "@cyopo/Pages/portfolio/common/redux/reducers";
import TemplateReducer from "@cyopo/Pages/templates/common/redux/reducers";
import AnalyticsReducer from "@cyopo/Pages/analytics/common/redux/reducers";
import AdminReducer from "@cyopo/Pages/admin/common/redux/reducers";

const RootReducer = combineReducers({
  common: AppCommonReducer,
  auth: AuthReducer,
  portfolio: PortfolioReducer,
  templates: TemplateReducer,
  analytics: AnalyticsReducer,
  admin: AdminReducer,
});

export type CyopoState = ReturnType<typeof RootReducer>;
export default RootReducer;
