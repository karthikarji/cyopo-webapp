export const ROUTES = {
  // Public
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Portfolio public view
  PUBLIC_PORTFOLIO: "/:slug",

  // Authenticated
  DASHBOARD: "/dashboard",
  PORTFOLIOS: "/portfolios",
  PORTFOLIO_NEW: "/portfolios/new",
  PORTFOLIO_EDIT: "/portfolios/:id/edit",
  TEMPLATES: "/templates",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",

  // Admin
  ADMIN_TEMPLATES: "/admin/templates",
} as const;
