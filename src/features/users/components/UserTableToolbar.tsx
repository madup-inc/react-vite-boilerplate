import { Plus, Trash2 } from "lucide-react";
import { DataTableToolbar } from "@/shared/components/table";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useDialog } from "@/shared/hooks/useDialog";
import { Status } from "@/shared/types";
import { UserRole, USER_ROLE_LABELS, USER_STATUS_LABELS } from "../types";
import { UserFormDialog } from "./UserFormDialog";

interface UserTableToolbarProps {
  searchInput: string;
  setSearch: (value: string) => void;
  setStatus: (value: Status | undefined) => void;
  setRole: (value: UserRole | undefined) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  selectedCount?: number;
  onBulkDelete?: () => void;
  filters: {
    status?: Status;
    role?: UserRole;
  };
}

export function UserTableToolbar({
  searchInput,
  setSearch,
  setStatus,
  setRole,
  resetFilters,
  hasActiveFilters,
  selectedCount = 0,
  onBulkDelete,
  filters,
}: UserTableToolbarProps) {
  const createDialog = useDialog();

  return (
    <>
      <DataTableToolbar
        searchValue={searchInput}
        onSearchChange={setSearch}
        searchPlaceholder="이름 또는 이메일 검색..."
        onReset={resetFilters}
        showReset={hasActiveFilters}
        filters={
          <>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) => setStatus(value === "all" ? undefined : (value as Status))}
            >
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                {Object.entries(USER_STATUS_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.role || "all"}
              onValueChange={(value) => setRole(value === "all" ? undefined : (value as UserRole))}
            >
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="역할" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 역할</SelectItem>
                {Object.entries(USER_ROLE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        }
        actions={
          <>
            {selectedCount > 0 && (
              <Button variant="destructive" size="sm" onClick={onBulkDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                {selectedCount}개 삭제
              </Button>
            )}
            <Button size="sm" onClick={() => createDialog.open()}>
              <Plus className="mr-2 h-4 w-4" />
              사용자 추가
            </Button>
          </>
        }
      />

      <UserFormDialog
        open={createDialog.isOpen}
        onOpenChange={(open) => !open && createDialog.close()}
      />
    </>
  );
}

