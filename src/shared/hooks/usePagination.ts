import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  useQueryParams?: boolean;
}

interface UsePaginationReturn {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  reset: () => void;
}

/**
 * 페이지네이션 상태 관리 훅
 * - useQueryParams가 true일 경우 URL을 Single Source of Truth로 사용
 * - 브라우저 뒤로가기/앞으로가기 시에도 상태가 올바르게 동기화됨
 */
export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
  useQueryParams = true,
}: UsePaginationOptions = {}): UsePaginationReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 직접 파생된 값 (Single Source of Truth)
  const page = useMemo(() => {
    if (useQueryParams) {
      const pageParam = searchParams.get("page");
      return pageParam ? parseInt(pageParam, 10) : initialPage;
    }
    return initialPage;
  }, [useQueryParams, searchParams, initialPage]);

  const pageSize = useMemo(() => {
    if (useQueryParams) {
      const pageSizeParam = searchParams.get("pageSize");
      return pageSizeParam ? parseInt(pageSizeParam, 10) : initialPageSize;
    }
    return initialPageSize;
  }, [useQueryParams, searchParams, initialPageSize]);

  const setPage = useCallback(
    (newPage: number) => {
      if (useQueryParams) {
        setSearchParams((prev) => {
          prev.set("page", newPage.toString());
          return prev;
        });
      }
    },
    [useQueryParams, setSearchParams]
  );

  const setPageSize = useCallback(
    (newSize: number) => {
      if (useQueryParams) {
        setSearchParams((prev) => {
          prev.set("pageSize", newSize.toString());
          prev.set("page", "1"); // Reset to first page when changing page size
          return prev;
        });
      }
    },
    [useQueryParams, setSearchParams]
  );

  const reset = useCallback(() => {
    if (useQueryParams) {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.delete("pageSize");
        return prev;
      });
    }
  }, [useQueryParams, setSearchParams]);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    reset,
  };
}

