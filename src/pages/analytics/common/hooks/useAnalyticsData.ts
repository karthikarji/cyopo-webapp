import { useState, useCallback } from "react";
import AnalyticsAPIService from "@cyopo/Services/api/analytics/AnalyticsAPIService";
import type { AnalyticsData } from "@cyopo/Services/api/analytics/AnalyticsAPIService";

const useAnalyticsData = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (interval: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await AnalyticsAPIService.getAnalytics({ interval: interval as any });
      setData(result);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetch };
};

export default useAnalyticsData;
