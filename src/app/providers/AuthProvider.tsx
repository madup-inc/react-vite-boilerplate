import { ReactNode, useEffect, useCallback } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { AuthUser } from "@/shared/types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, isLoading, setUser, setLoading, clearAuth } = useAuthStore();

  useEffect(() => {
    // 초기 인증 상태 확인 (토큰 검증 등)
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          // TODO: 실제 API 호출로 사용자 정보 조회
          // const userData = await fetchCurrentUser();
          // setUser(userData);
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    // Zustand의 actions는 참조가 변하지 않으므로 의존성에서 제외 가능
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      // TODO: 실제 로그인 API 호출
      console.log("Login attempt:", email, password);
      // const response = await loginApi({ email, password });
      // localStorage.setItem('access_token', response.token);
      // setUser(response.user);

      // 임시 mock 데이터
      const mockUser: AuthUser = {
        id: "1",
        email,
        name: "관리자",
        role: "admin",
      };
      localStorage.setItem("access_token", "mock_token");
      setUser(mockUser);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser]);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    clearAuth();
  }, [clearAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

