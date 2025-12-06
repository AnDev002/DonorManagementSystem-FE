// src/types/history.ts

export interface History {
  id: number | string;
  donorName: string;
  date: string;
  // Cập nhật Type Status để khớp với Backend và yêu cầu hiển thị
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Rejected" | "ReadyToDonate"; 
}

export interface DonationDetail {
  label: string;
  value: string;
  isLabelBold?: boolean;
  isLabelInset?: boolean;
}

export interface JourneyStep {
  iconSrc: string;
  iconAlt: string;
  title: string;
  date: string;
  showConnector: boolean;
}