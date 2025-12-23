import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface SortingState {
  id: string;
  desc: boolean;
}

interface UseSortingOptions {
  initialSorting?: SortingState | null;
  useQueryParams?: boolean;
}

interface UseSortingReturn {
  sorting: SortingState | null;
  setSorting: (sorting: SortingState | null) => void;
  toggleSort: (id: string) => void;
  reset: () => void;
}

export function useSorting({
  initialSorting = null,
  useQueryParams = true,
}: UseSortingOptions = {}): UseSortingReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialSorting = (): SortingState | null => {
    if (useQueryParams) {
      const sortBy = searchParams.get("sortBy");
      const sortOrder = searchParams.get("sortOrder");
      if (sortBy) {
        return {
          id: sortBy,
          desc: sortOrder === "desc",
        };
      }
    }
    return initialSorting;
  };

  const [sorting, setSortingState] = useState<SortingState | null>(getInitialSorting);

  const setSorting = useCallback(
    (newSorting: SortingState | null) => {
      setSortingState(newSorting);
      if (useQueryParams) {
        setSearchParams((prev) => {
          if (newSorting) {
            prev.set("sortBy", newSorting.id);
            prev.set("sortOrder", newSorting.desc ? "desc" : "asc");
          } else {
            prev.delete("sortBy");
            prev.delete("sortOrder");
          }
          return prev;
        });
      }
    },
    [useQueryParams, setSearchParams]
  );

  const toggleSort = useCallback(
    (id: string) => {
      setSorting(
        sorting?.id === id
          ? sorting.desc
            ? null // Was desc, now clear
            : { id, desc: true } // Was asc, now desc
          : { id, desc: false } // New column, start with asc
      );
    },
    [sorting, setSorting]
  );

  const reset = useCallback(() => {
    setSorting(initialSorting);
  }, [initialSorting, setSorting]);

  return {
    sorting,
    setSorting,
    toggleSort,
    reset,
  };
}

