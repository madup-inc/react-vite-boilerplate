import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useCreateUserMutation, useUpdateUserMutation } from "../api";
import { User, CreateUserDto, UpdateUserDto } from "../types";
import { UserForm } from "./UserForm";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
}

export function UserFormDialog({ open, onOpenChange, user }: UserFormDialogProps) {
  const createMutation = useCreateUserMutation();
  const updateMutation = useUpdateUserMutation();

  const isEditing = !!user;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: CreateUserDto | UpdateUserDto) => {
    if (isEditing) {
      await updateMutation.mutateAsync({ id: user.id, data: data as UpdateUserDto });
    } else {
      await createMutation.mutateAsync(data as CreateUserDto);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "사용자 수정" : "새 사용자 추가"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "사용자 정보를 수정합니다."
              : "새로운 사용자를 시스템에 추가합니다."}
          </DialogDescription>
        </DialogHeader>
        <UserForm user={user} onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}

