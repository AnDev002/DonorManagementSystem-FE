import { apiClient } from '@/lib/api/ApiClient';

// Định nghĩa kiểu dữ liệu cho Túi máu
export interface BloodUnit {
  id: string | number;
  bloodType: string; // A, B, AB, O
  rhType: string;    // +, -
  volume: number;
  collectionDate: string;
  expiryDate: string;
  storageLocation: string;
  status: "Available" | "About to expire" | "Expired" | "Used";
  appointmentId?: number; // Optional
}

export const InventoryService = {
  // 1. Lấy tổng quan (cho bảng chính)
  getSummary() {
    return apiClient.get('/blood-inventory/summary');
  },
  
  // 2. Lấy chi tiết danh sách theo nhóm máu
  getDetailByType(type: string) {
    return apiClient.get(`/blood-inventory/type/${encodeURIComponent(type)}`);
  },

  create(data: any) {
    // Dùng chung API tạo record (lưu ý: cần appointmentId giả hoặc logic backend cho phép null nếu nhập kho thủ công)
    // Nếu nhập thủ công, bạn cần sửa backend để appointmentId là optional hoặc tạo endpoint create riêng không cần appointment
    return apiClient.post('/blood-inventory/record', data);
  },

  update(id: number | string, data: any) {
    return apiClient.put(`/blood-inventory/${id}`, data);
  },

  delete(id: number | string) {
    return apiClient.delete(`/blood-inventory/${id}`);
  },

  // Xóa nhóm máu
  deleteType(type: string) {
    return apiClient.delete(`/blood-inventory/type/${encodeURIComponent(type)}`);
  },

  // Đổi tên nhóm máu
  updateTypeName(oldType: string, newType: string) {
    return apiClient.put(`/blood-inventory/type/${encodeURIComponent(oldType)}`, { newType });
  }
};