import { apiClient } from '@/lib/api/ApiClient';
import { getAccessToken } from '@/lib/auth.client';
import { User } from '@/context/AuthContext';

interface LoginResponse {
  access_token: string;
  user: User;
}

export const AuthService = {
  async signin(username: string, password: string) {
     try {
      const res = await apiClient.post<LoginResponse>('/auth/login', { "username":username, "password": password });
      if (res?.access_token && res?.user) {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user)); 
          document.cookie = `token=${res.access_token}; path=/; max-age=3600;`;
        return res;
      }
      throw new Error('No access token received');
    } catch (err: any) {
      throw new Error(err.message || 'Invalid email or password');
    }
  },

  async signup(name: string, username: string, password: string) { 
    return apiClient.post('/auth/register', { name, username, password }); 
  },
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
     document.cookie = 'token=; path=/; max-age=0;';
     window.location.href = '/signin';
  },

  async getMe() {
    const token = getAccessToken();
    if (!token) return null;
    try {
      const userData = await apiClient.get('/auth/profile'); 
      return userData; 
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      this.logout();
      return null;
    }
  },

  // --- THÊM 2 HÀM MỚI TẠI ĐÂY ---
  async forgotPassword(email: string) {
    return apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string) {
    return apiClient.post('/auth/reset-password', { token, password });
  }
};