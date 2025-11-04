/**
 * Kiểu dữ liệu cho một hàng trong lịch sử hiến máu
 */
export interface History {
  id: number | string;
  donorName: string;
  date: string;
  status: "Completed" | "Pending" | "Cancelled";
}

/**
 * Kiểu dữ liệu cho một hàng chi tiết (Key-Value)
 */
export interface DonationDetail {
  label: string;
  value: string;
  isLabelBold?: boolean;
  isLabelInset?: boolean; // Tương ứng với marginLeft
}

/**
 * Kiểu dữ liệu cho một bước trong hành trình
 */
export interface JourneyStep {
  iconSrc: string;
  iconAlt: string;
  title: string;
  date: string;
  showConnector: boolean;
}