import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Breadcrumbs } from "@/shared/components/layout/Breadcrumbs";
import { UserTable } from "../components/UserTable";

export function UserListPage() {
  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="사용자 관리"
        description="시스템에 등록된 사용자를 관리합니다."
      />
      <UserTable />
    </div>
  );
}

