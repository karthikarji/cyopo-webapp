export const API = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    REFRESH: "/api/v1/auth/refresh",
    LOGOUT: "/api/v1/auth/logout",
  },
  USER: {
    ME: "/api/v1/user",
  },
  PORTFOLIO: {
    BASE: "/api/v1/user/portfolios",
    BY_ID: (id: string) => `/api/v1/user/portfolios/${id}`,
    STATUS: (id: string) => `/api/v1/user/portfolios/${id}/status`,
    DUPLICATE: (id: string) => `/api/v1/user/portfolios/${id}/duplicate`,
    PREVIEW: (slug: string) => `/api/v1/user/portfolios/preview/${slug}`,
    RESUME: (id: string) => `/api/v1/user/portfolios/${id}/resume`,
  },
  PUBLIC: {
    PORTFOLIOS: "/api/v1/public/portfolios",
    BY_SLUG: (slug: string) => `/api/v1/public/portfolios/${slug}`,
    VIEW: (slug: string) => `/api/v1/public/portfolios/${slug}/view`,
    CONTACT: (slug: string) => `/api/v1/public/portfolios/${slug}/contact`,
    VALIDATE_SLUG: "/api/v1/public/portfolios/validate-slug",
  },
  TEMPLATE: {
    PUBLIC: "/api/v1/public/templates",
    ADMIN: "/api/v1/admin/templates",
    BY_ID: (id: string) => `/api/v1/admin/templates/${id}`,
    DUPLICATE: (id: string) => `/api/v1/admin/templates/${id}/duplicate`,
  },
  ANALYTICS: {
    BASE: "/api/v1/user/analytics",
  },
  AI: {
    PROFILE: "/api/v1/user/ai/profile",
    EXPERIENCE: "/api/v1/user/ai/experience",
    PROJECTS: "/api/v1/user/ai/projects",
  },
} as const;
