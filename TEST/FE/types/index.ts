// Định nghĩa trạng thái nhân viên
export type EmployeeStatus = 'Active' | 'Block' | 'Pending';

// Định nghĩa đối tượng Nhân viên (Employee)
export interface Employee {
  id: string;
  name: string;
  position: string;
  phone: string; // Giữ placeholder, bạn có thể thay đổi sau
  status: EmployeeStatus;
}

// Định nghĩa mục điều hướng Sidebar
export interface SidebarNavItem {
  href: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
}