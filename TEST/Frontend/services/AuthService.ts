import { apiClient } from '@/lib/api/ApiClient';
import { cookies } from 'next/headers';
import { getAccessToken } from '@/lib/auth.client'; // Import client-side token getter
import { User } from '@/context/AuthContext'; // <-- Import kiểu User (nếu chưa có)

interface LoginResponse {
  access_token: string;
  user: User; // <-- Thêm user
}

export const AuthService = {
  async signin(username: string, password: string) {
     try {
    const res = await apiClient.post<LoginResponse>('/auth/login', { "username":username, "password": password });    console.log(res);
    console.log(res);
    if (res?.access_token && res?.user) { // <-- Kiểm tra cả user
        localStorage.setItem('token', res.access_token);
        // Lưu thông tin user vào localStorage để AuthContext có thể đọc
        localStorage.setItem('user', JSON.stringify(res.user)); 
        document.cookie = `token=${res.access_token}; path=/; max-age=3600;`; // 1 giờ
      
      return res; // <-- Trả về toàn bộ response (bao gồm user)
    }
    throw new Error('No access token received');
  } catch (err: any) {
    // wrap or rethrow for UI
    throw new Error(err.message || 'Invalid email or password');
  }
  },

  // --- SỬA ĐỔI CHỖ NÀY ---
  // Đổi 'username' thành 'email' để khớp với DTO và Prisma schema
  async signup(name: string, username: string, password: string) { 
    // Gửi object khớp với RegisterAuthDto của backend
    // Sửa: { name, username, password } -> { name, email, password }
    return apiClient.post('/auth/register', { name, username, password }); 
  },
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
     // Xóa cookie (ghi đè bằng cookie hết hạn)
     document.cookie = 'token=; path=/; max-age=0;';
     // Chuyển hướng về trang đăng nhập
     window.location.href = '/signin';
  },

  // --- THÊM HÀM MỚI (cho Bước 2) ---
  async getMe() {
    // Lấy token từ client-side
    const token = getAccessToken();
    if (!token) {
      return null;
    }
    
    try {
      // API này sẽ được tạo ở bước 2
      const userData = await apiClient.get('/auth/profile'); 
      return userData; 
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // Nếu token hết hạn, tự động logout
      this.logout();
      return null;
    }
  }
};