import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import { ApiResponse } from "@cyopo/Models/auth/auth.model";

export interface ViewsByPeriod {
  period: string;
  views: number;
  uniqueVisitors: number;
}

export interface PortfolioStats {
  portfolioId: string;
  portfolioName: string;
  portfolioSlug: string;
  views: number;
  uniqueVisitors: number;
  messages: number;
}

export interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  totalMessages: number;
  viewsByPeriod: ViewsByPeriod[];
  portfolioBreakdown: PortfolioStats[];
}

const extractApiError = (error: any): string => error?.response?.data?.error ?? "Something went wrong";

class AnalyticsAPIService {
  async getAnalytics(params?: {
    portfolioIds?: string[];
    startDate?: string;
    endDate?: string;
    interval?: "day" | "week" | "month" | "year";
  }): Promise<AnalyticsData> {
    try {
      const query = new URLSearchParams();
      if (params?.portfolioIds?.length) {
        params.portfolioIds.forEach((id) => query.append("portfolioIds", id));
      }
      if (params?.startDate) query.set("startDate", params.startDate);
      if (params?.endDate) query.set("endDate", params.endDate);
      if (params?.interval) query.set("interval", params.interval);

      const url = query.toString() ? `${API.ANALYTICS.BASE}?${query.toString()}` : API.ANALYTICS.BASE;

      const response = await REST.get<ApiResponse<AnalyticsData>>(url);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export default new AnalyticsAPIService();
