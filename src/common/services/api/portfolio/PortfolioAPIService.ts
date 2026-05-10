import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import { extractApiError } from "@cyopo/Utils/rest/ApiError.utils";
import type { ApiResponse } from "@cyopo/Models/auth/auth.model";
import type {
  Portfolio,
  PortfolioFilters,
  PortfolioPageResponse,
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
} from "@cyopo/Models/portfolio/portfolio.model";

class PortfolioAPIServiceClass {
  async getPortfolios(filters: PortfolioFilters = {}): Promise<PortfolioPageResponse> {
    try {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== "all") {
        params.append("status", filters.status);
      }
      if (filters.search && filters.search.trim()) {
        params.append("search", filters.search.trim());
      }
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));

      const query = params.toString();
      const url = query ? `${API.PORTFOLIO.BASE}?${query}` : API.PORTFOLIO.BASE;

      const response = await REST.get<ApiResponse<any>>(url);
      if (!response.data) {
        throw new Error(response.message ?? "Failed to fetch portfolios");
      }

      // API returns data.data as the array
      return {
        portfolios: response.data.data ?? [],
        total: response.data.total ?? 0,
        page: response.data.page ?? 1,
        limit: response.data.limit ?? 12,
        totalPages: response.data.totalPages ?? 1,
      };
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async getPortfolioById(id: string): Promise<Portfolio> {
    try {
      const response = await REST.get<ApiResponse<Portfolio>>(API.PORTFOLIO.BY_ID(id));
      if (!response.data) {
        throw new Error(response.message ?? "Portfolio not found");
      }
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async createPortfolio(payload: CreatePortfolioRequest): Promise<Portfolio> {
    try {
      const response = await REST.post<ApiResponse<Portfolio>>(API.PORTFOLIO.BASE, payload);
      if (!response.data) {
        throw new Error(response.message ?? "Failed to create portfolio");
      }
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async updatePortfolio(id: string, payload: UpdatePortfolioRequest): Promise<Portfolio> {
    try {
      const response = await REST.put<ApiResponse<Portfolio>>(API.PORTFOLIO.BY_ID(id), payload);
      if (!response.data) {
        throw new Error(response.message ?? "Failed to update portfolio");
      }
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async deletePortfolio(id: string): Promise<void> {
    try {
      await REST.delete<ApiResponse<void>>(API.PORTFOLIO.BY_ID(id));
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async updateStatus(id: string, status: string): Promise<Portfolio> {
    try {
      const response = await REST.patch<ApiResponse<Portfolio>>(API.PORTFOLIO.STATUS(id), { status });
      if (!response.data) {
        throw new Error(response.message ?? "Failed to update status");
      }
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async duplicatePortfolio(id: string): Promise<Portfolio> {
    try {
      const response = await REST.post<ApiResponse<Portfolio>>(API.PORTFOLIO.DUPLICATE(id));
      if (!response.data) {
        throw new Error(response.message ?? "Failed to duplicate portfolio");
      }
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async validateSlug(slug: string, excludeId?: string): Promise<boolean> {
    try {
      const params = new URLSearchParams({ slug });
      if (excludeId) params.append("excludeId", excludeId);
      const response = await REST.get<ApiResponse<{ isAvailable: boolean }>>(`${API.PUBLIC.VALIDATE_SLUG}?${params.toString()}`);
      return response.data?.isAvailable ?? false;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export const PortfolioAPIService = new PortfolioAPIServiceClass();
