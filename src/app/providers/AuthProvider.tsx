import { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  }, [setUser, setLoading, clearAuth]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // TODO: 실제 로그인 API 호출
      console.log("Login attempt:", email, password);
      // const response = await loginApi({ email, password });
      // localStorage.setItem('access_token', response.token);
      // setUser(response.user);

      // 임시 mock 데이터
      const mockUser: User = {
        id: "1",
        email,
        name: "관리자",
        role: "admin",
      };
      localStorage.setItem("access_token", "mock_token");
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    clearAuth();
  };

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

