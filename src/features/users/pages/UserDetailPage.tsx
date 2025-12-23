import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Breadcrumbs } from "@/shared/components/layout/Breadcrumbs";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ConfirmDialog } from "@/shared/components/feedback/ConfirmDialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { formatDate } from "@/shared/libs/date";
import { useUserDetailQuery, useDeleteUserMutation } from "../api";
import { USER_ROLE_LABELS, USER_STATUS_LABELS } from "../types";
import { UserFormDialog } from "../components/UserFormDialog";

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useUserDetailQuery(id!);
  const deleteMutation = useDeleteUserMutation();

  const editDialog = useDialog();
  const deleteDialog = useDialog();

  const handleDelete = async () => {
    if (user) {
      await deleteMutation.mutateAsync(user.id);
      navigate("/users");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs />
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div>
        <Breadcrumbs />
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg font-medium text-destructive">사용자를 찾을 수 없습니다.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/users")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title={user.name}
        description={user.email}
        actions={
          <>
            <Button variant="outline" onClick={() => navigate("/users")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록
            </Button>
            <Button variant="outline" onClick={() => editDialog.open()}>
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </Button>
            <Button variant="destructive" onClick={() => deleteDialog.open()}>
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </Button>
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">이메일</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">이름</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">역할</span>
              <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                {USER_ROLE_LABELS[user.role]}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">상태</span>
              <Badge
                variant={
                  user.status === "active"
                    ? "success"
                    : user.status === "inactive"
                      ? "secondary"
                      : "warning"
                }
              >
                {USER_STATUS_LABELS[user.status]}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>추가 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">전화번호</span>
              <span className="font-medium">{user.phone || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">부서</span>
              <span className="font-medium">{user.department || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">가입일</span>
              <span className="font-medium">{formatDate(user.createdAt, "datetime")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">마지막 로그인</span>
              <span className="font-medium">
                {user.lastLoginAt ? formatDate(user.lastLoginAt, "datetime") : "-"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <UserFormDialog
        open={editDialog.isOpen}
        onOpenChange={(open) => !open && editDialog.close()}
        user={user}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) => !open && deleteDialog.close()}
        title="사용자 삭제"
        description={`정말 "${user.name}" 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

