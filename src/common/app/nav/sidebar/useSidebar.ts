import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { SIDEBAR_NAV_ITEMS, SIDEBAR_ADMIN_ITEMS } from "./Sidebar.constants";

const useSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const isAdmin = user?.role === "ADMIN";
  const navItems = isAdmin ? [...SIDEBAR_NAV_ITEMS, ...SIDEBAR_ADMIN_ITEMS] : SIDEBAR_NAV_ITEMS;

  const isActive = (route: string) => location.pathname === route;
  const handleNav = (route: string) => navigate(route);

  return {
    state: {
      navItems,
      isAdmin,
    },
    handlers: {
      isActive,
      handleNav,
    },
  };
};

export default useSidebar;
