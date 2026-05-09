import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectDashboardStats, selectDashboardLoading, selectDashboardError } from "@cyopo/Pages/dashboard/common/redux/selectors/Dashboard.selector";
import { setDashboardStats, setDashboardLoading, setDashboardError } from "@cyopo/Pages/dashboard/common/redux/actions/Dashboard.actions";
import { DashboardAPIService } from "@cyopo/Services/api/dashboard/DashboardAPIService";

const useDashboardStats = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDashboardStats);
  const isLoading = useAppSelector(selectDashboardLoading);
  const error = useAppSelector(selectDashboardError);

  useEffect(() => {
    const fetchStats = async () => {
      // Do not refetch if already loaded
      if (stats) return;
      try {
        dispatch(setDashboardLoading(true));
        const data = await DashboardAPIService.getStats();
        dispatch(setDashboardStats(data));
      } catch (err: any) {
        dispatch(setDashboardError(err?.message ?? "Failed to load stats"));
      }
    };

    fetchStats();
  }, [dispatch, stats]);

  const getStatValue = (key: string): number => {
    if (!stats) return 0;
    return (stats as any)[key] ?? 0;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return {
    state: {
      stats,
      isLoading,
      error,
    },
    handlers: {
      getStatValue,
      formatNumber,
    },
  };
};

export default useDashboardStats;
