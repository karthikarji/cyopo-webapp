import REST from "@cyopo/Services/rest/REST";
import AuthenticationService from "@cyopo/Services/auth/AuthenticationService";
import { API } from "@cyopo/Constants/api/Api.constants";
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from "@cyopo/Models/auth/auth.model";

class AuthAPIServiceClass {
  async login(payload: LoginRequest): Promise<User> {
    const response = await REST.post<ApiResponse<AuthResponse>>(API.AUTH.LOGIN, payload);

    if (!response.data) {
      throw new Error(response.message ?? "Login failed");
    }

    const { accessToken, refreshToken, user } = response.data;

    // Service responsibility — token and user persistence only
    AuthenticationService.setTokens(accessToken, refreshToken);
    AuthenticationService.setUser(user);

    // Return user — hook dispatches to Redux
    return user;
  }

  async register(payload: RegisterRequest): Promise<User> {
    const response = await REST.post<ApiResponse<AuthResponse>>(API.AUTH.REGISTER, payload);

    if (!response.data) {
      throw new Error(response.message ?? "Registration failed");
    }

    const { accessToken, refreshToken, user } = response.data;
    AuthenticationService.setTokens(accessToken, refreshToken);
    AuthenticationService.setUser(user);
    return user;
  }

  async logout(): Promise<void> {
    try {
      await REST.post(API.AUTH.LOGOUT);
    } finally {
      // Service clears tokens from storage
      AuthenticationService.clearSession();
      // Hook dispatches clearUser to Redux
    }
  }

  getCurrentUser(): User | null {
    // Hook uses this to hydrate Redux on app init
    return AuthenticationService.getUser();
  }

  isAuthenticated(): boolean {
    return AuthenticationService.isAuthenticated();
  }
}

export const AuthAPIService = new AuthAPIServiceClass();
