// src/services/UserService.ts
import { apiClient } from '@/lib/api/ApiClient';
import { User } from '@/context/AuthContext'; // Sử dụng lại kiểu User từ AuthContext

export type UserCreateData = Omit<User, 'id' | 'avatarUrl'> & { password?: string };
export type UserUpdateData = Partial<UserCreateData>;

export const UserService = {
  // Lấy danh sách user (Admin)
  list(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  },

  // Tạo user mới (Admin)
  create(data: UserCreateData): Promise<User> {
    return apiClient.post<User>('/users', data);
  },

  // Cập nhật user (Admin)
  update(id: string | number, data: UserUpdateData): Promise<User> {
    return apiClient.put<User>(`/users/${id}`, data);
  },

  // Xóa user (Admin)
  remove(id: string | number): Promise<void> {
    return apiClient.delete<void>(`/users/${id}`);
  },
};