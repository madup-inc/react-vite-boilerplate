import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

/**
 * HTTP 상태 코드를 포함하는 커스텀 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }

  /**
   * 4xx 클라이언트 에러인지 확인
   */
  isClientError(): boolean {
    return this.statusCode !== undefined && this.statusCode >= 400 && this.statusCode < 500;
  }

  /**
   * 5xx 서버 에러인지 확인
   */
  isServerError(): boolean {
    return this.statusCode !== undefined && this.statusCode >= 500;
  }
}

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
    const statusCode = error.response?.status;

    // Handle 401 Unauthorized
    if (statusCode === 401 && originalRequest) {
      // Clear token and redirect to login
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    // Handle other errors
    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "알 수 없는 오류가 발생했습니다.";

    return Promise.reject(new ApiError(errorMessage, statusCode, error.code));
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

