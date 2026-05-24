import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import type { ApiResponse } from "@cyopo/Models/common/common.model";
import type {
  AdminCouponData,
  AdminCouponPageResponse,
  AdminCouponRedemptionData,
  CreateCouponData,
  UpdateCouponData,
} from "@cyopo/Models/admin/admin.models";

const extractApiError = (error: any): string => error?.response?.data?.error ?? "Something went wrong";

class AdminCouponAPIService {
  async getAll(search?: string, page = 1, limit = 10): Promise<AdminCouponPageResponse> {
    try {
      const query = new URLSearchParams();
      if (search) query.set("search", search);
      query.set("page", String(page));
      query.set("limit", String(limit));

      const response = await REST.get<ApiResponse<AdminCouponPageResponse>>(`${API.ADMIN.COUPONS}?${query.toString()}`);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async create(data: CreateCouponData): Promise<AdminCouponData> {
    try {
      const response = await REST.post<ApiResponse<AdminCouponData>>(API.ADMIN.COUPONS, data);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async update(id: string, data: UpdateCouponData): Promise<AdminCouponData> {
    try {
      const response = await REST.put<ApiResponse<AdminCouponData>>(`${API.ADMIN.COUPONS}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async toggleActive(id: string): Promise<AdminCouponData> {
    try {
      const response = await REST.patch<ApiResponse<AdminCouponData>>(`${API.ADMIN.COUPONS}/${id}/toggle`);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await REST.delete(`${API.ADMIN.COUPONS}/${id}`);
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async getRedemptions(id: string): Promise<AdminCouponRedemptionData[]> {
    try {
      const response = await REST.get<ApiResponse<AdminCouponRedemptionData[]>>(`${API.ADMIN.COUPONS}/${id}/redemptions`);
      return response.data ?? [];
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export default new AdminCouponAPIService();
