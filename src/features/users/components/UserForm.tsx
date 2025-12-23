import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { User, USER_ROLE_LABELS } from "../types";

const userFormSchema = z.object({
  email: z.string().email("올바른 이메일을 입력하세요"),
  name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다").optional().or(z.literal("")),
  role: z.enum(["admin", "manager", "user"] as const),
  phone: z.string().optional(),
  department: z.string().optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormValues) => void;
  isLoading?: boolean;
}

export function UserForm({ user, onSubmit, isLoading }: UserFormProps) {
  const isEditing = !!user;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      password: "",
      role: user?.role || "user",
      phone: user?.phone || "",
      department: user?.department || "",
    },
  });

  const handleSubmit = (data: UserFormValues) => {
    // Remove password if empty (for editing)
    if (isEditing && !data.password) {
      const { password, ...rest } = data;
      onSubmit(rest as UserFormValues);
    } else {
      onSubmit(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  disabled={isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="홍길동" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isEditing ? "새 비밀번호 (선택)" : "비밀번호"}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={isEditing ? "변경하려면 입력" : "비밀번호 입력"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>역할</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="역할 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(USER_ROLE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>전화번호 (선택)</FormLabel>
                <FormControl>
                  <Input placeholder="010-0000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>부서 (선택)</FormLabel>
                <FormControl>
                  <Input placeholder="개발팀" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "처리 중..." : isEditing ? "수정" : "생성"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

