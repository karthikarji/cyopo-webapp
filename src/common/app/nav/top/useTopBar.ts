import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectTheme } from "@cyopo/Redux/selectors/AppCommon.selector";
import { setTheme } from "@cyopo/Redux/actions/AppCommon.actions";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/portfolios": "Portfolios",
  "/templates": "Templates",
  "/analytics": "Analytics",
  "/settings": "Settings",
  "/admin/templates": "Admin",
};

const useTopBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useAppSelector(selectTheme);

  const currentLabel = ROUTE_LABELS[location.pathname] ?? "Dashboard";
  const isDark = theme === "dark";

  const handleThemeToggle = () => {
    const next = isDark ? "light" : "dark";
    dispatch(setTheme(next));
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const handleNewPortfolio = () => navigate(ROUTES.PORTFOLIO_NEW);

  return {
    state: {
      currentLabel,
      isDark,
    },
    handlers: {
      handleThemeToggle,
      handleNewPortfolio,
    },
  };
};

export default useTopBar;
