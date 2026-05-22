import { useEffect } from "react";
import useAnalyticsData from "../common/hooks/useAnalyticsData";
import useAnalyticsChart from "../chart/controller/useAnalyticsChart";

const useAnalyticsPage = () => {
  const { data, isLoading, error, fetch } = useAnalyticsData();
  const { interval, handleIntervalChange, formatChartData } = useAnalyticsChart();

  // Refetch whenever interval changes
  useEffect(() => {
    fetch(interval);
  }, [interval, fetch]);

  const chartData = data?.viewsByPeriod ? formatChartData(data.viewsByPeriod) : [];

  return {
    state: {
      data,
      isLoading,
      error,
      interval,
      chartData,
    },
    handlers: {
      handleIntervalChange,
    },
  };
};

export default useAnalyticsPage;
