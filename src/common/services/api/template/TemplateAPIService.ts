import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import { extractApiError } from "@cyopo/Utils/rest/ApiError.utils";
import type { ApiResponse } from "@cyopo/Models/common/common.model";

class TemplateAPIServiceClass {
  async getPublicTemplates(): Promise<any[]> {
    try {
      const response = await REST.get<ApiResponse<any>>(API.TEMPLATE.PUBLIC);
      if (!response.data) return [];
      return response.data.data ?? response.data ?? [];
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async getAdminTemplates(): Promise<any[]> {
    try {
      const response = await REST.get<ApiResponse<any>>(API.TEMPLATE.ADMIN);
      if (!response.data) return [];
      return response.data.data ?? response.data ?? [];
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async createTemplate(payload: any): Promise<any> {
    try {
      const response = await REST.post<ApiResponse<any>>(API.TEMPLATE.ADMIN, payload);
      if (!response.data) throw new Error("Failed to create template");
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async updateTemplate(id: string, payload: any): Promise<any> {
    try {
      const response = await REST.put<ApiResponse<any>>(API.TEMPLATE.BY_ID(id), payload);
      if (!response.data) throw new Error("Failed to update template");
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async deleteTemplate(id: string): Promise<void> {
    try {
      await REST.delete<ApiResponse<void>>(API.TEMPLATE.BY_ID(id));
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export const TemplateAPIService = new TemplateAPIServiceClass();
