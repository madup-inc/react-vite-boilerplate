import { useState } from "react";
import { DataTable } from "@/shared/components/table";
import { ConfirmDialog } from "@/shared/components/feedback/ConfirmDialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { useUsersQuery, useDeleteUserMutation } from "../api";
import { useUserFilters } from "../hooks/useUserFilters";
import { useUserColumns } from "../hooks/useUserColumns";
import { User } from "../types";
import { UserTableToolbar } from "./UserTableToolbar";
import { UserFormDialog } from "./UserFormDialog";

export function UserTable() {
  const { filters, ...filterActions } = useUserFilters();
  const { data, isLoading, isError } = useUsersQuery(filters);
  const deleteMutation = useDeleteUserMutation();

  const editDialog = useDialog<User>();
  const deleteDialog = useDialog<User>();

  const columns = useUserColumns({
    onEdit: (user) => editDialog.open(user),
    onDelete: (user) => deleteDialog.open(user),
  });

  const handleDelete = async () => {
    if (deleteDialog.data) {
      await deleteMutation.mutateAsync(deleteDialog.data.id);
      deleteDialog.close();
    }
  };

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        totalCount={data?.total ?? 0}
        page={filters.page || 1}
        pageSize={filters.pageSize || 10}
        onPageChange={filterActions.setPage}
        onPageSizeChange={filterActions.setPageSize}
        isLoading={isLoading}
        isError={isError}
        enableRowSelection
        onRowSelectionChange={setSelectedUsers}
        getRowId={(row) => row.id}
        toolbar={
          <UserTableToolbar
            {...filterActions}
            filters={filters}
            selectedCount={selectedUsers.length}
            onBulkDelete={() => {
              // TODO: Bulk delete implementation
              console.log("Bulk delete:", selectedUsers);
            }}
          />
        }
      />

      {/* Edit Dialog */}
      <UserFormDialog
        open={editDialog.isOpen}
        onOpenChange={(open) => !open && editDialog.close()}
        user={editDialog.data}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) => !open && deleteDialog.close()}
        title="사용자 삭제"
        description={`정말 "${deleteDialog.data?.name}" 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}

