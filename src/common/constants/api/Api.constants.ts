export const API = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    REFRESH: "/api/v1/auth/refresh",
    LOGOUT: "/api/v1/auth/logout",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
  },
  USER: {
    ME: "/api/v1/user",
    PASSWORD: "/api/v1/user/password",
  },
  PORTFOLIO: {
    BASE: "/api/v1/user/portfolios",
    BY_ID: (id: string) => `/api/v1/user/portfolios/${id}`,
    STATUS: (id: string) => `/api/v1/user/portfolios/${id}/status`,
    DUPLICATE: (id: string) => `/api/v1/user/portfolios/${id}/duplicate`,
    PREVIEW: (slug: string) => `/api/v1/user/portfolios/preview/${slug}`,
    RESUME: (id: string) => `/api/v1/user/portfolios/${id}/resume`,
    PROFILE_PHOTO: (id: string) => `/api/v1/user/portfolios/${id}/profile-photo`,
    PHOTOS: {
      BASE: (pid: string, projId: string) => `/api/v1/user/portfolios/${pid}/projects/${projId}/photos`,
      BY_ID: (pid: string, projId: string, photoId: string) => `/api/v1/user/portfolios/${pid}/projects/${projId}/photos/${photoId}`,
      THUMBNAIL: (pid: string, projId: string, photoId: string) => `/api/v1/user/portfolios/${pid}/projects/${projId}/photos/${photoId}/thumbnail`,
    },
  },
  PUBLIC: {
    PORTFOLIOS: "/api/v1/public/portfolios",
    BY_SLUG: (slug: string) => `/api/v1/public/portfolios/${slug}`,
    VIEW: (slug: string) => `/api/v1/public/portfolios/${slug}/view`,
    CONTACT: (slug: string) => `/api/v1/public/portfolios/${slug}/contact`,
    VALIDATE_SLUG: "/api/v1/public/portfolios/validate-slug",
    RESUME_DOWNLOAD: (id: string) => `/api/v1/public/portfolios/${id}/resume`,
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
  MESSAGES: {
    BY_PORTFOLIO: (id: string) => `/api/v1/user/portfolios/${id}/messages`,
    STATS: (id: string) => `/api/v1/user/portfolios/${id}/messages/stats`,
    MARK_READ: (id: string) => `/api/v1/user/messages/${id}/read`,
  },
  ADMIN: {
    TEMPLATES: "/api/v1/admin/templates",
    USERS: "/api/v1/admin/users",
    COUPONS: "/api/v1/admin/coupons",
  },
} as const;
