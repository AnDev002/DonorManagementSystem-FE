import { apiClient } from '@/lib/api/ApiClient';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  isRead: boolean;
  createdAt: string;
}

export const NotificationService = {
  getMyNotifications() {
    return apiClient.get<Notification[]>('/notifications');
  },
  
  markAsRead(id: number) {
    return apiClient.patch(`/notifications/${id}/read`);
  }
};