import { useState, useCallback } from "react";
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

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
  useQueryParams = true,
}: UsePaginationOptions = {}): UsePaginationReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialPage = () => {
    if (useQueryParams) {
      const pageParam = searchParams.get("page");
      return pageParam ? parseInt(pageParam, 10) : initialPage;
    }
    return initialPage;
  };

  const getInitialPageSize = () => {
    if (useQueryParams) {
      const pageSizeParam = searchParams.get("pageSize");
      return pageSizeParam ? parseInt(pageSizeParam, 10) : initialPageSize;
    }
    return initialPageSize;
  };

  const [page, setPageState] = useState(getInitialPage);
  const [pageSize, setPageSizeState] = useState(getInitialPageSize);

  const setPage = useCallback(
    (newPage: number) => {
      setPageState(newPage);
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
      setPageSizeState(newSize);
      setPageState(1); // Reset to first page when changing page size
      if (useQueryParams) {
        setSearchParams((prev) => {
          prev.set("pageSize", newSize.toString());
          prev.set("page", "1");
          return prev;
        });
      }
    },
    [useQueryParams, setSearchParams]
  );

  const reset = useCallback(() => {
    setPageState(initialPage);
    setPageSizeState(initialPageSize);
    if (useQueryParams) {
      setSearchParams((prev) => {
        prev.delete("page");
        prev.delete("pageSize");
        return prev;
      });
    }
  }, [initialPage, initialPageSize, useQueryParams, setSearchParams]);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    reset,
  };
}

