import REST from "@cyopo/Services/rest/REST";
import AuthenticationService from "@cyopo/Services/auth/AuthenticationService";
import { API } from "@cyopo/Constants/api/Api.constants";
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from "@cyopo/Models/auth/auth.model";

class AuthAPIServiceClass {
  private extractErrorMessage(error: any): string {
    // API returned a structured error response
    if (error?.response?.data?.error) {
      return error.response.data.error;
    }
    // API returned a message field
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    // Fallback
    return error?.message ?? "Something went wrong";
  }

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
      throw new Error(this.extractErrorMessage(error));
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
      throw new Error(this.extractErrorMessage(error));
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
}

export const AuthAPIService = new AuthAPIServiceClass();
