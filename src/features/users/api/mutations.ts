import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/libs/queryClient";
// import { api } from "@/shared/libs/axiosClient"; // TODO: 실제 API 연결 시 주석 해제
import { toast } from "@/shared/hooks/useToast";
import { User, CreateUserDto, UpdateUserDto } from "../types";

// 사용자 생성
export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      toast({
        title: "사용자 생성 완료",
        description: "새 사용자가 성공적으로 생성되었습니다.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "사용자 생성 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// 사용자 수정
export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) => updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) });
      toast({
        title: "사용자 수정 완료",
        description: "사용자 정보가 성공적으로 수정되었습니다.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "사용자 수정 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// 사용자 삭제
export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      toast({
        title: "사용자 삭제 완료",
        description: "사용자가 성공적으로 삭제되었습니다.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "사용자 삭제 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// API 함수들
async function createUser(data: CreateUserDto): Promise<User> {
  // TODO: 실제 API 연결 시 아래 주석 해제
  // return api.post<User>("/users", data);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: `user-${Date.now()}`,
    email: data.email,
    name: data.name,
    role: data.role,
    status: "active",
    phone: data.phone,
    department: data.department,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function updateUser(id: string, data: UpdateUserDto): Promise<User> {
  // TODO: 실제 API 연결 시 아래 주석 해제
  // return api.patch<User>(`/users/${id}`, data);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id,
    email: "updated@example.com",
    name: data.name || "Updated User",
    role: data.role || "user",
    status: data.status || "active",
    phone: data.phone,
    department: data.department,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function deleteUser(id: string): Promise<void> {
  // TODO: 실제 API 연결 시 아래 주석 해제
  // return api.delete(`/users/${id}`);

  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`Deleted user: ${id}`);
}

