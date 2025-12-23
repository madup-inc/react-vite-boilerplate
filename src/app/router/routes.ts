import { LucideIcon, LayoutDashboard, Users } from "lucide-react";

export interface RouteConfig {
  path: string;
  name: string;
  icon?: LucideIcon;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "대시보드",
    icon: LayoutDashboard,
  },
  {
    path: "/users",
    name: "사용자 관리",
    icon: Users,
  },
];

