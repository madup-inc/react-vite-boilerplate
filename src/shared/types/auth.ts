/**
 * 인증 관련 타입 정의
 */

/**
 * 인증된 사용자 정보 (세션/토큰에서 추출되는 기본 정보)
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * 로그인 요청 데이터
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 로그인 응답 데이터
 */
export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
}

/**
 * 인증 상태
 */
export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

