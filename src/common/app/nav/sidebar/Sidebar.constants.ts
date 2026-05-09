import type { SidebarNavItem } from "./Sidebar.model.d";

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", icon: "dashboard", route: "/dashboard" },
  { label: "Portfolios", icon: "folder_special", route: "/portfolios" },
  { label: "Templates", icon: "style", route: "/templates" },
  { label: "Analytics", icon: "monitoring", route: "/analytics" },
  { label: "Settings", icon: "settings", route: "/settings" },
];

export const SIDEBAR_ADMIN_ITEMS: SidebarNavItem[] = [{ label: "Admin", icon: "admin_panel_settings", route: "/admin/templates", adminOnly: true }];

export const SIDEBAR_WIDTH_COLLAPSED = 56;
export const SIDEBAR_WIDTH_EXPANDED = 220;
