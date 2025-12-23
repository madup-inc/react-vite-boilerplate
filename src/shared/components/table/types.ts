import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount?: number;
  page: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  isLoading?: boolean;
  isError?: boolean;
  toolbar?: ReactNode;
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  getRowId?: (row: TData) => string;
};

export type PaginationState = {
  page: number;
  pageSize: number;
};

export type SortingState = {
  id: string;
  desc: boolean;
}[];

