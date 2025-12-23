import { BaseEntity, BaseFilters, Status } from "@/shared/types";

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  status: Status;
  phone?: string;
  department?: string;
  lastLoginAt?: string;
}

export type UserRole = "admin" | "manager" | "user";

export interface UserFilters extends BaseFilters {
  status?: Status;
  role?: UserRole;
}

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  phone?: string;
  department?: string;
}

export interface UpdateUserDto {
  name?: string;
  role?: UserRole;
  status?: Status;
  phone?: string;
  department?: string;
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "관리자",
  manager: "매니저",
  user: "일반 사용자",
};

export const USER_STATUS_LABELS: Record<Status, string> = {
  active: "활성",
  inactive: "비활성",
  pending: "대기",
  deleted: "삭제됨",
};

