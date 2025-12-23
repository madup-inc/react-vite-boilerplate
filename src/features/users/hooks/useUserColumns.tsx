import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { User, USER_ROLE_LABELS, USER_STATUS_LABELS } from "../types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { DataTableColumnHeader } from "@/shared/components/table";
import { formatDate } from "@/shared/libs/date";

interface UseUserColumnsOptions {
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function useUserColumns({ onEdit, onDelete }: UseUserColumnsOptions = {}) {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="이름" />,
        cell: ({ row }) => (
          <Link
            to={`/users/${row.original.id}`}
            className="font-medium text-primary hover:underline"
          >
            {row.getValue("name")}
          </Link>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="이메일" />,
      },
      {
        accessorKey: "role",
        header: ({ column }) => <DataTableColumnHeader column={column} title="역할" />,
        cell: ({ row }) => {
          const role = row.getValue("role") as User["role"];
          return (
            <Badge variant={role === "admin" ? "default" : "secondary"}>
              {USER_ROLE_LABELS[role]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="상태" />,
        cell: ({ row }) => {
          const status = row.getValue("status") as User["status"];
          const variantMap = {
            active: "success" as const,
            inactive: "secondary" as const,
            pending: "warning" as const,
            deleted: "destructive" as const,
          };
          return <Badge variant={variantMap[status]}>{USER_STATUS_LABELS[status]}</Badge>;
        },
      },
      {
        accessorKey: "department",
        header: ({ column }) => <DataTableColumnHeader column={column} title="부서" />,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="가입일" />,
        cell: ({ row }) => formatDate(row.getValue("createdAt")),
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                  <span className="sr-only">메뉴 열기</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>작업</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to={`/users/${user.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    상세 보기
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(user)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  수정
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete?.(user)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onEdit, onDelete]
  );

  return columns;
}

