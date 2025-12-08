import { apiClient } from '@/lib/api/ApiClient';

export interface DonationSite {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
}

export const LocationService = {
  // Lấy danh sách public (cho Donor)
  getActiveSites() {
    return apiClient.get<DonationSite[]>('/donation-sites?active=true');
  },

  // Lấy toàn bộ (cho Admin)
  getAllSites() {
    return apiClient.get<DonationSite[]>('/donation-sites');
  }
};