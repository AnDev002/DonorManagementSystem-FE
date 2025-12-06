// Frontend/services/AppointmentService.ts
import { apiClient } from '@/lib/api/ApiClient';
// Lỗi này sẽ hết sau khi sửa types/appointment.ts
import { AppointmentData, CombinedAppointmentForm } from '@/types/appointment'; 

export const AppointmentService = {
  async createAppointment(formData: CombinedAppointmentForm): Promise<AppointmentData> {
    try {
      const data = await apiClient.post<AppointmentData>('/appointments', formData); // Lỗi này sẽ hết
      return data;
    } catch (error) {
      console.error('Failed to create appointment:', error);
      throw error;
    }
  },

  async getAppointmentById(id: string): Promise<AppointmentData | null> {
    try {
      const data = await apiClient.get<AppointmentData>(`/appointments/${id}`); // Lỗi này sẽ hết
      return data;
    } catch (error) {
      console.error(`Failed to fetch appointment ${id}:`, error);
      return null;
    }
  }
};