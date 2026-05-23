import REST from "@cyopo/Services/rest/REST";
import AuthenticationService from "@cyopo/Services/auth/AuthenticationService";
import { API } from "@cyopo/Constants/api/Api.constants";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "@cyopo/Models/auth/auth.model";
import { extractApiError } from "@cyopo/Utils/rest/ApiError.utils";
import { ApiResponse } from "@cyopo/Models/common/common.model";

class AuthAPIServiceClass {
  async login(payload: LoginRequest): Promise<User> {
    try {
      const response = await REST.post<ApiResponse<AuthResponse>>(API.AUTH.LOGIN, payload);
      if (!response.data) {
        throw new Error(response.message ?? "Login failed");
      }
      const { accessToken, refreshToken, user } = response.data;
      AuthenticationService.setTokens(accessToken, refreshToken);
      AuthenticationService.setUser(user);
      return user;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async register(payload: RegisterRequest): Promise<User> {
    try {
      const response = await REST.post<ApiResponse<AuthResponse>>(API.AUTH.REGISTER, payload);
      if (!response.data) {
        throw new Error(response.message ?? "Registration failed");
      }
      const { accessToken, refreshToken, user } = response.data;
      AuthenticationService.setTokens(accessToken, refreshToken);
      AuthenticationService.setUser(user);
      return user;
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async logout(): Promise<void> {
    try {
      await REST.post(API.AUTH.LOGOUT);
    } catch {
      // Ignore logout errors — always clear session
    } finally {
      AuthenticationService.clearSession();
    }
  }

  getCurrentUser(): User | null {
    return AuthenticationService.getUser();
  }

  isAuthenticated(): boolean {
    return AuthenticationService.isAuthenticated();
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await REST.post(API.AUTH.FORGOT_PASSWORD, { email });
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }

  async resetPassword(data: { token: string; newPassword: string; confirmPassword: string }): Promise<void> {
    try {
      await REST.post(API.AUTH.RESET_PASSWORD, data);
    } catch (error: any) {
      throw new Error(extractApiError(error));
    }
  }
}

export const AuthAPIService = new AuthAPIServiceClass();
