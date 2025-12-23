import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

interface DataTableToolbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: ReactNode;
  actions?: ReactNode;
  onReset?: () => void;
  showReset?: boolean;
}

export function DataTableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "검색...",
  filters,
  actions,
  onReset,
  showReset = false,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {onSearchChange && (
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-full sm:w-[250px]"
          />
        )}
        {filters}
        {showReset && (
          <Button variant="ghost" onClick={onReset} className="h-9 px-2 lg:px-3">
            초기화
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

