// Frontend/types/appointment.ts

// (Giữ lại các interface cũ của bạn)
export interface IconLayer {
  width: string;
  height: string;
  top?: string;
  left?: string;
  zIndex: string;
  hasBackground?: boolean;
  hasPadding?: boolean;
}
export interface StatusStep {
  left?: string;
  zIndex: string;
  iconSrc: string;
  iconAlt: string;
}
export interface StatusLabel {
  label: string;
  minWidth: string;
  isMuted?: boolean;
  isNormalWeight?: boolean;
}
export interface AppointmentDetail {
  text: string;
  minWidth: string;
  isBold?: boolean;
  marginTop?: string;
}

// --- THÊM CÁC INTERFACE MỚI DƯỚI ĐÂY ---

/**
 * Kiểu dữ liệu cho một lịch hẹn (dữ liệu trả về từ API)
 */
export interface AppointmentData {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  bloodType: string;
  appointmentDate: string;
  location: string;
  notes?: string;
}

/**
 * Kiểu dữ liệu gộp từ 2 form "DonorInfoForm" và "AppointmentForm"
 */
export interface CombinedAppointmentForm {
  // Từ DonorInfoForm
  name: string;
  email: string;
  phone: string;
  dob: string;
  bloodType: string;
  
  // Từ AppointmentForm
  appointmentDate: string;
  location: string;
  notes?: string;
}