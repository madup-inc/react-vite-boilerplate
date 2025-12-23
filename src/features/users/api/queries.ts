import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/libs/queryClient";
// import { api } from "@/shared/libs/axiosClient"; // TODO: 실제 API 연결 시 주석 해제
import { PaginatedResponse } from "@/shared/types";
import { User, UserFilters } from "../types";

// 사용자 목록 조회
export function useUsersQuery(filters: UserFilters) {
  return useQuery({
    queryKey: queryKeys.users.list(filters as Record<string, unknown>),
    queryFn: () => fetchUsers(filters),
    placeholderData: (prev) => prev,
  });
}

// 사용자 상세 조회
export function useUserDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
}

// API 함수들
async function fetchUsers(filters: UserFilters): Promise<PaginatedResponse<User>> {
  // TODO: 실제 API 연결 시 아래 주석 해제
  // return api.get<PaginatedResponse<User>>("/users", { params: filters });

  // Mock data for development
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    email: `user${i + 1}@example.com`,
    name: `사용자 ${i + 1}`,
    role: ["admin", "manager", "user"][i % 3] as User["role"],
    status: ["active", "inactive", "pending"][i % 3] as User["status"],
    phone: `010-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
    department: ["개발팀", "마케팅팀", "운영팀", "경영지원팀"][i % 4],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastLoginAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }));

  // Apply filters
  let filtered = [...mockUsers];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter((user) => user.status === filters.status);
  }

  if (filters.role) {
    filtered = filtered.filter((user) => user.role === filters.role);
  }

  // Apply sorting
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      const aVal = a[filters.sortBy as keyof User];
      const bVal = b[filters.sortBy as keyof User];
      if (aVal === undefined || bVal === undefined) return 0;
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return filters.sortOrder === "desc" ? -comparison : comparison;
    });
  }

  // Apply pagination
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 10;
  const start = (page - 1) * pageSize;
  const paginatedItems = filtered.slice(start, start + pageSize);

  return {
    items: paginatedItems,
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.ceil(filtered.length / pageSize),
  };
}

async function fetchUserById(id: string): Promise<User> {
  // TODO: 실제 API 연결 시 아래 주석 해제
  // return api.get<User>(`/users/${id}`);

  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id,
    email: `user${id}@example.com`,
    name: `사용자 ${id}`,
    role: "user",
    status: "active",
    phone: "010-1234-5678",
    department: "개발팀",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };
}

