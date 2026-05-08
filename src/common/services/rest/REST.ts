/**
 * REST
 * Static class that wraps AxiosService.
 * All API services call REST.get/post/put/patch/delete —
 * nothing in the app calls AxiosService directly.
 *
 * Usage:
 *   const data = await REST.get<Portfolio[]>('/api/v1/user/portfolios')
 *   const result = await REST.post<AuthResponse>('/api/v1/auth/login', body)
 */

import AxiosService from "@cyopo/Services/rest/lib/RestInstance";
import { AxiosRequestConfig } from "axios";

const REST = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await AxiosService.get<T>(url, config);
    return response.data;
  },

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await AxiosService.post<T>(url, data, config);
    return response.data;
  },

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await AxiosService.put<T>(url, data, config);
    return response.data;
  },

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await AxiosService.patch<T>(url, data, config);
    return response.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await AxiosService.delete<T>(url, config);
    return response.data;
  },
};

export default REST;
