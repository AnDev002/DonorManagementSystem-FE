// src/services/AppointmentService.ts
import { apiClient } from '@/lib/api/ApiClient';
import { AppointmentData, CombinedAppointmentForm } from '@/types/appointment'; 

// Định nghĩa kiểu dữ liệu trả về từ backend cho lịch sử (có thể dùng chung AppointmentData hoặc tạo mới)
export interface AppointmentHistoryItem extends AppointmentData {
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Rejected" | "ReadyToDonate";
  user?: {
    name: string;
    email: string;
    username: string;
  };
}

export const AppointmentService = {
  // Tạo lịch hẹn
  async createAppointment(formData: CombinedAppointmentForm): Promise<AppointmentData> {
    try {
      const data = await apiClient.post<AppointmentData>('/appointments', formData);
      return data;
    } catch (error) {
      console.error('Failed to create appointment:', error);
      throw error; // Ném lỗi để component xử lý hiển thị
    }
  },

  // Lấy lịch sử của tôi
  async getMyHistory(): Promise<AppointmentHistoryItem[]> {
    try {
      const data = await apiClient.get<AppointmentHistoryItem[]>('/appointments/my-history');
      return data;
    } catch (error) {
      console.error('Failed to fetch history:', error);
      return [];
    }
  },
  async cancelAppointment(id: number | string) {
    // Gọi API update status thành Cancelled
    return apiClient.patch(`/appointments/${id}/status`, { status: 'Cancelled' });
  },
  async getAppointmentById(id: string): Promise<AppointmentData | null> {
    try {
      const data = await apiClient.get<AppointmentData>(`/appointments/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch appointment ${id}:`, error);
      return null;
    }
  },
  // [Doctor] Lấy danh sách chờ duyệt
  async getPendingAppointments() {
    return apiClient.get('/appointments/pending');
  },

  // [Doctor] Duyệt/Từ chối lịch
  async updateStatus(id: number | string, status: 'Confirmed' | 'Rejected') {
    return apiClient.patch(`/appointments/${id}/status`, { status });
  },

  async getConfirmedAppointments() {
    return apiClient.get('/appointments/filter?status=Confirmed');
  },

  // Lấy danh sách đã khám sức khỏe xong, chờ lấy máu
  async getReadyToDonateAppointments() {
    return apiClient.get('/appointments/filter?status=ReadyToDonate');
  },

  // [Doctor] Lưu kết quả khám
  async submitHealthCheck(id: number | string, data: any) {
    return apiClient.post(`/appointments/${id}/health-check`, data);
  },

  // [Doctor] Lưu thông tin hiến máu (API inventory)
  async submitBloodRecord(data: any) {
    return apiClient.post('/blood-inventory/record', data);
  },
  async getAllAppointments(): Promise<AppointmentHistoryItem[]> {
    try {
      const data = await apiClient.get<AppointmentHistoryItem[]>('/appointments');
      return data;
    } catch (error) {
      console.error('Failed to fetch all appointments:', error);
      return [];
    }
  },
  // [MỚI] Lấy lịch theo range
  async getAppointmentsByRange(start: string, end: string) {
    // start, end: YYYY-MM-DD
    return apiClient.get(`/appointments/range?start=${start}&end=${end}`);
  },

  // [MỚI] Set Time Slot
  async updateTimeSlot(id: number | string, timeSlot: string) {
    return apiClient.patch(`/appointments/${id}/time`, { timeSlot });
  }
};