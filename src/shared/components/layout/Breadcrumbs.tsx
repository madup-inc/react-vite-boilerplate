import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { routes } from "@/app/router/routes";
import { cn } from "@/shared/libs/utils";

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const route = routes.find((r) => r.path === path);
    return {
      name: route?.name || segment,
      path,
    };
  });

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
      <Link to="/" className="flex items-center hover:text-foreground">
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4" />
          <Link
            to={crumb.path}
            className={cn(
              "hover:text-foreground",
              index === breadcrumbs.length - 1 && "font-medium text-foreground"
            )}
          >
            {crumb.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}

