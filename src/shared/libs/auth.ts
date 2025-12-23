/**
 * 인증 관련 유틸리티
 */

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const auth = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  removeRefreshToken: (): void => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!auth.getToken();
  },

  clearAuth: (): void => {
    auth.removeToken();
    auth.removeRefreshToken();
  },

  // JWT 토큰 디코딩 (검증 없이 페이로드만 추출)
  decodeToken: <T>(token: string): T | null => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  },

  // 토큰 만료 여부 확인
  isTokenExpired: (token: string): boolean => {
    const decoded = auth.decodeToken<{ exp: number }>(token);
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  },
};

