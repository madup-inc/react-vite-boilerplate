import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Users, Package, TrendingUp, Activity } from "lucide-react";

const stats = [
  {
    title: "총 사용자",
    value: "1,234",
    change: "+12%",
    icon: Users,
  },
  {
    title: "제품 수",
    value: "5,678",
    change: "+8%",
    icon: Package,
  },
  {
    title: "지출",
    value: "₩12,345,678",
    change: "+23%",
    icon: TrendingUp,
  },
  {
    title: "활성 세션",
    value: "89",
    change: "+4%",
    icon: Activity,
  },
];

export function DashboardPage() {
  return (
    <div>
      <PageHeader title="대시보드" description="시스템 현황을 한눈에 확인하세요." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{stat.change}</span> 지난 달 대비
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>시스템의 최근 활동 내역입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">새로운 사용자 등록</p>
                    <p className="text-xs text-muted-foreground">{i}분 전</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>빠른 작업</CardTitle>
            <CardDescription>자주 사용하는 기능에 빠르게 접근하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer transition-colors hover:bg-accent">
                <CardContent className="flex items-center gap-2 p-4">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-medium">사용자 추가</span>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-colors hover:bg-accent">
                <CardContent className="flex items-center gap-2 p-4">
                  <Package className="h-5 w-5" />
                  <span className="text-sm font-medium">제품 관리</span>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

