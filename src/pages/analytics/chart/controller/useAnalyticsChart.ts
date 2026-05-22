import { useState, useCallback } from "react";
import type { ViewsByPeriod } from "@cyopo/Services/api/analytics/AnalyticsAPIService";

export type Interval = "day" | "week" | "month" | "year";

export interface ChartPoint {
  date: string;
  views: number;
  visitors: number;
}

const formatPeriod = (period: string, interval: Interval): string => {
  const date = new Date(period);
  if (interval === "day") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
  if (interval === "week") {
    return `Week of ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  }
  if (interval === "month") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  return date.getFullYear().toString();
};

const useAnalyticsChart = () => {
  const [interval, setInterval] = useState<Interval>("day");

  const handleIntervalChange = useCallback((val: string) => {
    setInterval(val as Interval);
  }, []);

  const formatChartData = useCallback(
    (viewsByPeriod: ViewsByPeriod[]): ChartPoint[] =>
      viewsByPeriod.map((p) => ({
        date: formatPeriod(p.period, interval),
        views: p.views,
        visitors: p.uniqueVisitors,
      })),
    [interval],
  );

  return {
    interval,
    handleIntervalChange,
    formatChartData,
  };
};

export default useAnalyticsChart;
