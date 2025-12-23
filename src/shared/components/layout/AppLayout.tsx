import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useUiStore } from "@/app/store/useUiStore";
import { cn } from "@/shared/libs/utils";

export function AppLayout() {
  const { isSidebarCollapsed } = useUiStore();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          isSidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

