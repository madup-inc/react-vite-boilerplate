import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      // Clear token and redirect to login
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    // Handle other errors
    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "알 수 없는 오류가 발생했습니다.";

    return Promise.reject(new Error(errorMessage));
  }
);

// API helper functions
export const api = {
  get: <T>(url: string, config = {}) => axiosClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config = {}) =>
    axiosClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config = {}) =>
    axiosClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config = {}) =>
    axiosClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config = {}) =>
    axiosClient.delete<T>(url, config).then((res) => res.data),
};

export default axiosClient;

