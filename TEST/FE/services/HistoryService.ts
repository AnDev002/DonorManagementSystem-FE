// Frontend/services/HistoryService.ts
import { apiClient } from '@/lib/api/ApiClient';
import { History } from '@/types/history'; // Lỗi này sẽ hết sau khi sửa types/history.ts

export const HistoryService = {
  async getHistoryList(): Promise<History[]> {
    try {
      const data = await apiClient.get<History[]>('/history'); // Lỗi này sẽ hết
      return data;
    } catch (error) {
      console.error('Failed to fetch donation history:', error);
      return [];
    }
  },

  async getHistoryById(id: string): Promise<History | null> {
    try {
      const data = await apiClient.get<History>(`/history/${id}`); // Lỗi này sẽ hết
      return data;
    } catch (error) {
      console.error(`Failed to fetch history detail for ${id}:`, error);
      return null;
    }
  }
};