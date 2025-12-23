import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { usePagination } from "@/shared/hooks/usePagination";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Status } from "@/shared/types";
import { UserFilters, UserRole } from "../types";

export function useUserFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, pageSize, setPage, setPageSize } = usePagination();

  // Search
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchInput, 300);

  // Filters
  const status = (searchParams.get("status") as Status) || undefined;
  const role = (searchParams.get("role") as UserRole) || undefined;

  const setSearch = useCallback(
    (value: string) => {
      setSearchInput(value);
      setPage(1);
    },
    [setPage]
  );

  const setStatus = useCallback(
    (value: Status | undefined) => {
      setSearchParams((prev) => {
        if (value) {
          prev.set("status", value);
        } else {
          prev.delete("status");
        }
        prev.set("page", "1");
        return prev;
      });
    },
    [setSearchParams]
  );

  const setRole = useCallback(
    (value: UserRole | undefined) => {
      setSearchParams((prev) => {
        if (value) {
          prev.set("role", value);
        } else {
          prev.delete("role");
        }
        prev.set("page", "1");
        return prev;
      });
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchInput("");
    setSearchParams((prev) => {
      prev.delete("search");
      prev.delete("status");
      prev.delete("role");
      prev.set("page", "1");
      return prev;
    });
  }, [setSearchParams]);

  const filters: UserFilters = {
    page,
    pageSize,
    search: debouncedSearch || undefined,
    status,
    role,
  };

  const hasActiveFilters = !!(debouncedSearch || status || role);

  return {
    filters,
    searchInput,
    setSearch,
    setStatus,
    setRole,
    page,
    pageSize,
    setPage,
    setPageSize,
    resetFilters,
    hasActiveFilters,
  };
}

