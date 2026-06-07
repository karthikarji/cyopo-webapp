import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { SIDEBAR_NAV_ITEMS, SIDEBAR_ADMIN_ITEMS } from "./Sidebar.constants";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

const PLAN_BADGE: Record<string, { label: string; style: string }> = {
  FREE: { label: "Free", style: "bg-surface-container text-on-surface-variant" },
  PREMIUM: { label: "Premium", style: "bg-primary text-on-primary" },
  PRO: { label: "Pro", style: "bg-tertiary text-on-tertiary" },
};

const useSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const isAdmin = user?.role === "ADMIN";
  const navItems = isAdmin ? [...SIDEBAR_NAV_ITEMS, ...SIDEBAR_ADMIN_ITEMS] : SIDEBAR_NAV_ITEMS;

  const planBadge = PLAN_BADGE[user?.plan ?? "FREE"] ?? PLAN_BADGE.FREE;
  const isFreePlan = user?.plan === "FREE" || !user?.plan;

  const isActive = (route: string) => location.pathname === route;
  const handleNav = (route: string) => navigate(route);

  // Navigate to settings billing tab
  const handleUpgrade = () => navigate(ROUTES.PRICING);

  return {
    state: {
      navItems,
      isAdmin,
      user,
      planBadge,
      isFreePlan,
    },
    handlers: {
      isActive,
      handleNav,
      handleUpgrade,
    },
  };
};

export default useSidebar;
