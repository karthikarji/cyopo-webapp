import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import { ApiResponse } from "@cyopo/Models/auth/auth.model";

export interface NotificationPreferences {
  emailOnMessage: boolean;
  weeklyDigest: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  status: string;
  notificationPreferences: NotificationPreferences;
  createdAt: string;
}

export interface UpdateUserData {
  name?: string;
  notificationPreferences?: Partial<NotificationPreferences>;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const extractApiError = (error: any): string => error?.response?.data?.error ?? "Something went wrong";

class UserAPIService {
  async getMe(): Promise<UserProfile> {
    try {
      const response = await REST.get<ApiResponse<UserProfile>>(API.USER.ME);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async updateMe(data: UpdateUserData): Promise<UserProfile> {
    try {
      const response = await REST.put<ApiResponse<UserProfile>>(API.USER.ME, data);
      return response.data;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      await REST.put(API.USER.PASSWORD, data);
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async deleteAccount(): Promise<void> {
    try {
      await REST.delete(API.USER.ME);
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export default new UserAPIService();
