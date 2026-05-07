/**
 * AuthenticationService
 * Manages access token, refresh token, and user session in storage.
 * Single source of truth for anything auth-related outside of Redux.
 *
 * Usage:
 *   AuthenticationService.setTokens(accessToken, refreshToken)
 *   AuthenticationService.getAccessToken()
 *   AuthenticationService.clearSession()
 *   AuthenticationService.isAuthenticated()
 */

import StorageService from "@cyopo/Services/storage/StorageService";
import { STORAGE_KEYS } from "@cyopo/Constants/app/App.constants";
import type { User } from "@cyopo/Models/auth/auth.model";

const AuthenticationService = {
  // ─── Tokens ────────────────────────────────────────────────────

  getAccessToken(): string | null {
    return StorageService.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken(): string | null {
    return StorageService.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setTokens(accessToken: string, refreshToken: string): void {
    StorageService.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    StorageService.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },

  clearTokens(): void {
    StorageService.remove(STORAGE_KEYS.ACCESS_TOKEN);
    StorageService.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  // ─── User ───────────────────────────────────────────────────────

  getUser(): User | null {
    return StorageService.get<User>(STORAGE_KEYS.USER);
  },

  setUser(user: User): void {
    StorageService.set(STORAGE_KEYS.USER, user);
  },

  clearUser(): void {
    StorageService.remove(STORAGE_KEYS.USER);
  },

  // ─── Session ────────────────────────────────────────────────────

  isAuthenticated(): boolean {
    return StorageService.has(STORAGE_KEYS.ACCESS_TOKEN);
  },

  clearSession(): void {
    AuthenticationService.clearTokens();
    AuthenticationService.clearUser();
  },
};

export default AuthenticationService;
