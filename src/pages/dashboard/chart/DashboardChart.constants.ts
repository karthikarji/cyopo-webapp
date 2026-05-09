import type { QuickAction } from "./DashboardChart.model.d";

export const CHART_TITLE = "Views this week";
export const CHART_ANALYTICS_LINK = "Analytics";

export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "New portfolio",
    subLabel: "Start from template",
    icon: "add_circle",
    color: "text-primary",
    action: "new",
  },
  {
    label: "View analytics",
    subLabel: "See full report",
    icon: "monitoring",
    color: "text-success",
    action: "analytics",
  },
];
