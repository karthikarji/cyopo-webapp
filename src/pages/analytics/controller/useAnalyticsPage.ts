import { useEffect, useState, useCallback } from "react";
import AnalyticsAPIService from "@cyopo/Services/api/analytics/AnalyticsAPIService";
import type { AnalyticsData, ViewsByPeriod } from "@cyopo/Services/api/analytics/AnalyticsAPIService";

type Interval = "day" | "week" | "month" | "year";

const useAnalyticsPage = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interval, setInterval] = useState<Interval>("day");

  const load = useCallback(async (selectedInterval: Interval) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await AnalyticsAPIService.getAnalytics({
        interval: selectedInterval,
      });
      setData(result);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load(interval);
  }, [interval, load]);

  const handleIntervalChange = (val: Interval) => setInterval(val);

  // Format chart data for recharts
  const chartData: { date: string; views: number; visitors: number }[] = (data?.viewsByPeriod ?? []).map((p: ViewsByPeriod) => ({
    date: formatPeriod(p.period, interval),
    views: p.views,
    visitors: p.uniqueVisitors,
  }));

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

const formatPeriod = (period: string, interval: Interval): string => {
  const date = new Date(period);
  if (interval === "day") {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  if (interval === "week") {
    return `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  }
  if (interval === "month") {
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }
  return date.getFullYear().toString();
};

export default useAnalyticsPage;
