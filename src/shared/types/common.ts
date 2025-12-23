/**
 * 공통 타입 정의
 */

// API 응답 기본 구조
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// 페이지네이션 응답
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 페이지네이션 요청 파라미터
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// 필터 기본 타입
export interface BaseFilters extends PaginationParams {
  search?: string;
}

// Select 옵션 타입
export interface SelectOption<T = string> {
  label: string;
  value: T;
}

// 상태 타입 (공통 사용)
export type Status = "active" | "inactive" | "pending" | "deleted";

// 날짜 범위
export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

// 타임스탬프 필드
export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

// ID 필드
export interface WithId {
  id: string;
}

// 기본 엔티티 (ID + 타임스탬프)
export interface BaseEntity extends WithId, Timestamps {}

// 에러 응답
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

