import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import type { ApiResponse } from "@cyopo/Models/common/common.model";

export interface ProjectPhoto {
  id: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  isThumbnail: boolean;
  sortOrder: number;
  uploadedAt: string;
}

const extractApiError = (error: any): string => error?.response?.data?.error ?? "Something went wrong";

class PhotoAPIService {
  async getPhotos(portfolioId: string, projectId: string): Promise<ProjectPhoto[]> {
    try {
      const response = await REST.get<ApiResponse<ProjectPhoto[]>>(API.PORTFOLIO.PHOTOS.BASE(portfolioId, projectId));
      return response.data ?? [];
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async uploadPhotos(portfolioId: string, projectId: string, files: File[]): Promise<ProjectPhoto[]> {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const response = await REST.post<ApiResponse<ProjectPhoto[]>>(API.PORTFOLIO.PHOTOS.BASE(portfolioId, projectId), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data ?? [];
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async deletePhoto(portfolioId: string, projectId: string, photoId: string): Promise<void> {
    try {
      await REST.delete(API.PORTFOLIO.PHOTOS.BY_ID(portfolioId, projectId, photoId));
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async setThumbnail(portfolioId: string, projectId: string, photoId: string): Promise<void> {
    try {
      await REST.patch(API.PORTFOLIO.PHOTOS.THUMBNAIL(portfolioId, projectId, photoId));
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export default new PhotoAPIService();
