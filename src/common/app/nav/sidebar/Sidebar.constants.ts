import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { SidebarNavItem } from "./Sidebar.model.d";

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", icon: "dashboard", route: "/dashboard" },
  { label: "Portfolios", icon: "folder_special", route: "/portfolios" },
  { label: "Templates", icon: "style", route: "/templates" },
  { label: "Analytics", icon: "monitoring", route: "/analytics" },
  { label: "Settings", icon: "settings", route: "/settings" },
  {
    label: "Messages",
    icon: "mail",
    route: ROUTES.MESSAGES,
    badge: 0, // This will be dynamically updated based on unread messages count
  },
];

export const SIDEBAR_ADMIN_ITEMS: SidebarNavItem[] = [
  {
    label: "Templates",
    icon: "style",
    route: ROUTES.ADMIN_TEMPLATES,
    adminOnly: true,
  },
  {
    label: "Users",
    icon: "group",
    route: ROUTES.ADMIN_USERS,
    adminOnly: true,
  },
  {
    label: "Coupons",
    icon: "local_offer",
    route: ROUTES.ADMIN_COUPONS,
    adminOnly: true,
  },
];

export const SIDEBAR_WIDTH_COLLAPSED = 56;
export const SIDEBAR_WIDTH_EXPANDED = 220;
