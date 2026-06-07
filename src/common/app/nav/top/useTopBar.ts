import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectTheme, selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { setTheme } from "@cyopo/Redux/actions/AppCommon.actions";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/portfolios": "Portfolios",
  "/templates": "Templates",
  "/analytics": "Analytics",
  "/settings": "Settings",
  "/admin/templates": "Admin",
  "/admin/users": "Admin",
  "/admin/coupons": "Admin",
};

const useTopBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);

  const currentLabel = ROUTE_LABELS[location.pathname] ?? "Dashboard";
  const isDark = theme === "dark";
  const isFreePlan = user?.plan === "FREE" || !user?.plan;

  const handleThemeToggle = () => {
    const next = isDark ? "light" : "dark";
    dispatch(setTheme(next));
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const handleNewPortfolio = () => navigate(ROUTES.PORTFOLIO_NEW);

  // Navigate to billing settings tab
  const handleUpgrade = () => navigate(ROUTES.PRICING);

  return {
    state: {
      currentLabel,
      isDark,
      isFreePlan,
      user,
    },
    handlers: {
      handleThemeToggle,
      handleNewPortfolio,
      handleUpgrade,
    },
  };
};

export default useTopBar;
