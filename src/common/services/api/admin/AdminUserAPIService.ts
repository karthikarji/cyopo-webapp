import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import type { ApiResponse } from "@cyopo/Models/common/common.model";
import { AdminUserData, AdminUserFilters, AdminUserPageResponse } from "@cyopo/Models/admin/admin.models";

const extractApiError = (error: any): string => error?.response?.data?.error ?? "Something went wrong";

class AdminUserAPIService {
  async getAll(filters: AdminUserFilters = {}): Promise<AdminUserPageResponse> {
    try {
      const query = new URLSearchParams();
      if (filters.search) query.set("search", filters.search);
      if (filters.plan) query.set("plan", filters.plan);
      if (filters.status) query.set("status", filters.status);
      if (filters.page) query.set("page", String(filters.page));
      if (filters.limit) query.set("limit", String(filters.limit));

      const url = query.toString() ? `${API.ADMIN.USERS}?${query.toString()}` : API.ADMIN.USERS;

      const response = await REST.get<ApiResponse<AdminUserPageResponse>>(url);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async getById(id: string): Promise<AdminUserData> {
    try {
      const response = await REST.get<ApiResponse<AdminUserData>>(`${API.ADMIN.USERS}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
  async searchByEmail(email: string): Promise<AdminUserData[]> {
    try {
      const response = await REST.get<ApiResponse<AdminUserData[]>>(`${API.ADMIN.USERS}/search?email=${encodeURIComponent(email)}`);
      return response.data ?? [];
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async changePlan(id: string, plan: string): Promise<AdminUserData> {
    try {
      const response = await REST.patch<ApiResponse<AdminUserData>>(`${API.ADMIN.USERS}/${id}/plan`, { plan });
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async changeStatus(id: string, status: string): Promise<AdminUserData> {
    try {
      const response = await REST.patch<ApiResponse<AdminUserData>>(`${API.ADMIN.USERS}/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async updateUser(
    id: string,
    data: {
      name?: string;
      plan?: string;
      status?: string;
    },
  ): Promise<AdminUserData> {
    try {
      const response = await REST.patch<ApiResponse<AdminUserData>>(`${API.ADMIN.USERS}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await REST.delete(`${API.ADMIN.USERS}/${id}`);
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export default new AdminUserAPIService();
