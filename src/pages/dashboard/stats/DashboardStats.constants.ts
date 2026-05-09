import type { StatCardItem } from "./DashboardStats.model.d";

export const STAT_CARDS: StatCardItem[] = [
  {
    label: "Total portfolios",
    valueKey: "totalPortfolios",
    icon: "folder_special",
    subKey: "publishedCount",
    subLabel: "published",
  },
  {
    label: "Total views",
    valueKey: "totalViews",
    icon: "visibility",
    trendKey: "viewsTrend",
    trendLabel: "this week",
  },
  {
    label: "Unique visitors",
    valueKey: "uniqueVisitors",
    icon: "group",
    trendKey: "visitorsTrend",
    trendLabel: "this week",
  },
  {
    label: "Messages",
    valueKey: "unreadMessages",
    icon: "mail",
    subLabel: "unread",
  },
];
