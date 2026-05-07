/**
 * AxiosService
 * Singleton Axios instance with request/response interceptors.
 * - Attaches Bearer token to every request automatically
 * - On 401 response, attempts silent token refresh
 * - On refresh failure, clears session and redirects to login
 * - All API services go through this — nothing imports axios directly
 */

import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import StorageService from "@cyopo/Services/storage/StorageService";
import { STORAGE_KEYS } from "@cyopo/Constants/app/App.constants";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null): void => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token as string);
    }
  });
  failedQueue = [];
};

const AxiosService: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request interceptor ─────────────────────────────────────────
// Attach access token to every outgoing request
AxiosService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = StorageService.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response interceptor ────────────────────────────────────────
// On 401 — silently refresh the access token and replay the request
AxiosService.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request until refresh is done
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(AxiosService(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = StorageService.get<string>(STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      // Call refresh endpoint directly with base axios to avoid loops
      const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      StorageService.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      StorageService.set(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

      AxiosService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return AxiosService(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      // Refresh failed — clear session and go to login
      StorageService.remove(STORAGE_KEYS.ACCESS_TOKEN);
      StorageService.remove(STORAGE_KEYS.REFRESH_TOKEN);
      StorageService.remove(STORAGE_KEYS.USER);

      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default AxiosService;
