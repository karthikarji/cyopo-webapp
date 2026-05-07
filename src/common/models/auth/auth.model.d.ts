export type UserRole = "USER" | "ADMIN";
export type UserPlan = "FREE" | "PREMIUM";
export type UserStatus = "ACTIVE" | "BANNED" | "SUSPENDED";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  plan: UserPlan;
  status: UserStatus;
  subscriptionStatus: string | null;
  subscriptionPlan: string | null;
  subscriptionPeriodEnd: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}
