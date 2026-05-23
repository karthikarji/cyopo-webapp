import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import { extractApiError } from "@cyopo/Utils/rest/ApiError.utils";
import type { DashboardStats } from "@cyopo/Pages/dashboard/common/redux/states/Dashboard.state";
import { ApiResponse } from "@cyopo/Models/common/common.model";

class DashboardAPIServiceClass {
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await REST.get<ApiResponse<DashboardStats>>(API.ANALYTICS.BASE);
      if (!response.data) {
        throw new Error(response.message ?? "Failed to fetch dashboard stats");
      }
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error, "Failed to load dashboard stats"));
    }
  }
}

export const DashboardAPIService = new DashboardAPIServiceClass();
