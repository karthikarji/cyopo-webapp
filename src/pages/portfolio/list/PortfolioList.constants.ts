import type { PortfolioActionItem, StatusTab } from "./PortfolioList.model.d";

export const STATUS_TABS: StatusTab[] = [
  { label: "All", value: "all" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Draft", value: "DRAFT" },
  { label: "Archived", value: "ARCHIVED" },
];

export const PORTFOLIO_ACTIONS: PortfolioActionItem[] = [
  { label: "Edit", icon: "edit", action: "edit" },
  { label: "Duplicate", icon: "content_copy", action: "duplicate" },
  { label: "Publish", icon: "publish", action: "publish" },
  { label: "Archive", icon: "inventory_2", action: "archive" },
  { label: "View live", icon: "open_in_new", action: "view" },
  { label: "Delete", icon: "delete", action: "delete", danger: true },
];

export const PORTFOLIO_GRID_LIMIT = 12;
export const EMPTY_TITLE = "No portfolios yet";
export const EMPTY_SUBTITLE = "Create your first portfolio and start showcasing your work to the world.";
export const EMPTY_CTA = "Create your first portfolio";
export const EMPTY_FILTERED_TITLE = "No portfolios found";
export const EMPTY_FILTERED_SUB = "Try adjusting your search or filter.";
