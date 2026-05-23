import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import { ApiResponse } from "@cyopo/Models/common/common.model.d";
import type { PageResponse } from "@cyopo/Models/common/common.model";

export interface ContactMessage {
  id: string;
  portfolioId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "READ" | "UNREAD";
  createdAt: string;
}

export interface ContactStats {
  total: number;
  unread: number;
}

class MessageAPIService {
  async getMessages(portfolioId: string, page = 1, limit = 20): Promise<ContactMessage[]> {
    try {
      const response = await REST.get<ApiResponse<PageResponse<ContactMessage>>>(
        `${API.MESSAGES.BY_PORTFOLIO(portfolioId)}?page=${page}&limit=${limit}`,
      );
      return response.data?.data ?? [];
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async getStats(portfolioId: string): Promise<ContactStats> {
    try {
      const response = await REST.get<ApiResponse<ContactStats>>(API.MESSAGES.STATS(portfolioId));
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async markAsRead(messageId: string): Promise<void> {
    try {
      await REST.patch(API.MESSAGES.MARK_READ(messageId));
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

const extractApiError = (error: any): string => error?.response?.data?.error ?? "Something went wrong";

export default new MessageAPIService();
