import { apiClient } from '@/lib/api/ApiClient';

export const ReportService = {
  getDashboardStats() {
    return apiClient.get('/reports/dashboard');
  }
};