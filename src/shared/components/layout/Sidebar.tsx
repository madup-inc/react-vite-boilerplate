import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { routes } from "@/app/router/routes";
import { useUiStore } from "@/app/store/useUiStore";
import { cn } from "@/shared/libs/utils";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

export function Sidebar() {
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebarCollapse } = useUiStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-sidebar transition-all duration-300",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isSidebarCollapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              B
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Backoffice</span>
          </Link>
        )}
        {isSidebarCollapsed && (
          <Link to="/" className="mx-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              B
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <nav className="space-y-1 p-2">
          <TooltipProvider delayDuration={0}>
            {routes.map((route) => {
              const isActive = location.pathname === route.path;
              const Icon = route.icon;

              if (isSidebarCollapsed) {
                return (
                  <Tooltip key={route.path}>
                    <TooltipTrigger asChild>
                      <Link to={route.path}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-center",
                            isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                          )}
                          size="icon"
                        >
                          {Icon && <Icon className="h-5 w-5" />}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{route.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <Link key={route.path} to={route.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{route.name}</span>
                  </Button>
                </Link>
              );
            })}
          </TooltipProvider>
        </nav>
      </ScrollArea>

      {/* Collapse Toggle */}
      <div className="absolute bottom-0 left-0 right-0 border-t p-2">
        <Button
          variant="ghost"
          size={isSidebarCollapsed ? "icon" : "sm"}
          className={cn("w-full", !isSidebarCollapsed && "justify-start gap-2")}
          onClick={toggleSidebarCollapse}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>접기</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

