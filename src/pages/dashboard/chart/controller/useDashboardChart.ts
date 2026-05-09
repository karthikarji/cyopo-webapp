import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectDashboardStats } from "@cyopo/Pages/dashboard/common/redux/selectors/Dashboard.selector";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { ChartDataPoint } from "../DashboardChart.model.d";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const useDashboardChart = () => {
  const navigate = useNavigate();
  const stats = useAppSelector(selectDashboardStats);

  // Generate chart data — use real data if available
  // otherwise show empty bars
  const chartData: ChartDataPoint[] = DAYS.map((day) => ({
    day,
    views: 0,
    visitors: 0,
  }));

  const handleQuickAction = (action: string) => {
    if (action === "new") navigate(ROUTES.PORTFOLIO_NEW);
    if (action === "analytics") navigate(ROUTES.ANALYTICS);
  };

  const handleAnalyticsClick = () => navigate(ROUTES.ANALYTICS);

  const maxViews = Math.max(...chartData.map((d) => d.views), 1);

  return {
    state: {
      chartData,
      maxViews,
      hasData: (stats?.totalViews ?? 0) > 0,
    },
    handlers: {
      handleQuickAction,
      handleAnalyticsClick,
    },
  };
};

export default useDashboardChart;
