import axios, { AxiosInstance } from "axios";
import StorageService from "@cyopo/Services/storage/StorageService";
import { STORAGE_KEYS } from "@cyopo/Constants/app/App.constants";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });
  failedQueue = [];
};

const RestInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────
// Attach access token to every outgoing request
RestInstance.interceptors.request.use(
  (config) => {
    const token = StorageService.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ─────────────────────────────────────────────────
// Handle 401 — attempt token refresh, then retry original request
RestInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 — any other error passes through
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Skip refresh for auth endpoints — login/register failures
    // should pass through directly to the hook error handler
    const isAuthEndpoint = originalRequest.url?.includes("/api/v1/auth/");
    if (isAuthEndpoint) {
      return Promise.reject(error);
    }

    // Prevent infinite loop — if refresh itself gets 401, stop
    if (originalRequest._retry) {
      handleLogout();
      return Promise.reject(error);
    }

    // If already refreshing — queue this request until refresh completes
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(RestInstance(originalRequest));
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

      // Use plain axios — not RestInstance — to avoid interceptor loop
      const refreshResponse = await axios.post(
        `${BASE_URL}/api/v1/auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );

      const responseData = refreshResponse.data?.data ?? refreshResponse.data;
      const newAccessToken = responseData?.accessToken;
      const newRefreshToken = responseData?.refreshToken;

      if (!newAccessToken) {
        throw new Error("No access token in refresh response");
      }

      StorageService.set(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
      if (newRefreshToken) {
        StorageService.set(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
      }

      RestInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return RestInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      handleLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

// ─── Logout Helper ────────────────────────────────────────────────────────
const handleLogout = () => {
  StorageService.remove(STORAGE_KEYS.ACCESS_TOKEN);
  StorageService.remove(STORAGE_KEYS.REFRESH_TOKEN);
  StorageService.remove(STORAGE_KEYS.USER);
  window.dispatchEvent(new CustomEvent("auth:logout"));
};

export default RestInstance;
