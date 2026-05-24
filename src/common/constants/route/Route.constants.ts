export const ROUTES = {
  // Public
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Portfolio public view
  PUBLIC_PORTFOLIO: "/p/:slug",

  // Authenticated
  DASHBOARD: "/dashboard",
  PORTFOLIOS: "/portfolios",
  PORTFOLIO_NEW: "/portfolios/new",
  PORTFOLIO_EDIT: "/portfolios/:id/edit",
  TEMPLATES: "/templates",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
  MESSAGES: "/messages",

  // Admin
  ADMIN_TEMPLATES: "/admin/templates",
  ADMIN_USERS: "/admin/users",
  ADMIN_COUPONS: "/admin/coupons",
} as const;
