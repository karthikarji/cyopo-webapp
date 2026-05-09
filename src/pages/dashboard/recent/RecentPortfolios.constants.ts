import type { StatusConfigMap } from "./RecentPortfolios.model.d";

export const RECENT_LIMIT = 5;

export const STATUS_CONFIG: StatusConfigMap = {
  published: {
    label: "Published",
    bg: "bg-success-container",
    text: "text-success",
    dot: "bg-success",
  },
  draft: {
    label: "Draft",
    bg: "bg-surface-container-high",
    text: "text-on-surface-variant",
    dot: "bg-on-surface-variant",
  },
  archived: {
    label: "Archived",
    bg: "bg-warning-container",
    text: "text-warning",
    dot: "bg-warning",
  },
};

export const RECENT_EMPTY_TITLE = "No portfolios yet";
export const RECENT_EMPTY_SUB = "Create your first portfolio and start showcasing your work.";
export const RECENT_EMPTY_CTA = "Create portfolio";
export const RECENT_VIEW_ALL = "View all";
export const RECENT_TITLE = "Recent portfolios";
