import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import type { ApiResponse } from "@cyopo/Models/common/common.model";
import { CreateTemplateData, TemplateData, TemplateFilters, UpdateTemplateData } from "@cyopo/Models/admin/admin.models";

// Local page response — matches backend PageResponse structure
export interface TemplatePageResponse {
  data: TemplateData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const extractApiError = (error: any): string => error?.response?.data?.error ?? "Something went wrong";

class AdminTemplateAPIService {
  async getAll(filters: TemplateFilters = {}): Promise<TemplatePageResponse> {
    try {
      const query = new URLSearchParams();
      if (filters.search) query.set("search", filters.search);
      if (filters.status) query.set("status", filters.status);
      if (filters.premium !== undefined) query.set("premium", String(filters.premium));
      if (filters.page) query.set("page", String(filters.page));
      if (filters.limit) query.set("limit", String(filters.limit));

      const url = query.toString() ? `${API.ADMIN.TEMPLATES}?${query.toString()}` : API.ADMIN.TEMPLATES;

      const response = await REST.get<ApiResponse<TemplatePageResponse>>(url);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async create(data: Omit<CreateTemplateData, "thumbnail">, thumbnailFile: File): Promise<TemplateData> {
    try {
      const formData = new FormData();
      formData.append("slug", data.slug);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("font", data.font);
      formData.append("primaryColor", data.primaryColor);
      formData.append("secondaryColor", data.secondaryColor);
      formData.append("premium", String(data.premium));
      formData.append("status", data.status);
      data.tags.forEach((tag) => formData.append("tags", tag));
      formData.append("thumbnail", thumbnailFile);

      const response = await REST.post<ApiResponse<TemplateData>>(API.ADMIN.TEMPLATES, formData);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async uploadThumbnail(id: string, file: File): Promise<TemplateData> {
    try {
      const formData = new FormData();
      formData.append("thumbnail", file);
      const response = await REST.post<ApiResponse<TemplateData>>(`${API.ADMIN.TEMPLATES}/${id}/thumbnail`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async update(id: string, data: UpdateTemplateData): Promise<TemplateData> {
    try {
      // thumbnail excluded — updated via uploadThumbnail()
      const { thumbnail: _thumbnail, ...rest } = data as any;
      const response = await REST.put<ApiResponse<TemplateData>>(`${API.ADMIN.TEMPLATES}/${id}`, rest);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await REST.delete(`${API.ADMIN.TEMPLATES}/${id}`);
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async duplicate(id: string): Promise<TemplateData> {
    try {
      const response = await REST.post<ApiResponse<TemplateData>>(`${API.ADMIN.TEMPLATES}/${id}/duplicate`);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export default new AdminTemplateAPIService();
