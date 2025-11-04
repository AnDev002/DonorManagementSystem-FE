// src/app/(admin)/(others-pages)/admin-user-management/page.tsx
"use client"; 

import React, { useState, useEffect } from 'react';
import { UserTable } from '@/components/admin/user-management/UserTable';
// import { employees } from '@/lib/data'; // Xóa data mock
import { 
  Plus, HeartPulse, LayoutDashboard, CalendarDays, 
  Droplet, Users, BarChart, BookOpen, 
  MessageSquare, Settings, Search, Menu, Bell 
} from 'lucide-react'; 
import clsx from "clsx";
import Link from "next/link";
import UserDropdown from "@/components/header/UserDropdown";

// --- BƯỚC 1: Import hook, service, modal và type ---
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserService, UserUpdateData } from "@/services/UserService";
import { User } from "@/context/AuthContext";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { RoleDto } from '@/types/user';

// (Các component UI: DashboardCard, AdminSidebar, SidebarNavItem, AdminHeader giữ nguyên như file của bạn)
// ... (Copy 4 component đó vào đây) ...
const DashboardCard = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={clsx("bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6", className)}>
    {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>}
    {children}
  </div>
);
const AdminSidebar = () => (
  <div className="w-64 bg-white dark:bg-gray-900 h-screen p-4 flex flex-col shadow-lg">
    <div className="flex items-center gap-3 px-2 py-4 mb-6">
      <HeartPulse className="w-10 h-10 text-red-600" />
      <span className="font-bold text-2xl text-red-600">B-DONOR</span>
    </div>
    <nav className="flex flex-col gap-2">
      <SidebarNavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" isActive={false} href="/adminDashboard" />
      <SidebarNavItem icon={<CalendarDays className="w-5 h-5" />} label="Appointment" href="/appointment" />
      <SidebarNavItem icon={<Droplet className="w-5 h-5" />} label="Blood inventory" href="/blood-inventory" />
      <SidebarNavItem icon={<Users className="w-5 h-5" />} label="User management" isActive={true} href="/admin-user-management" />
      <SidebarNavItem icon={<BarChart className="w-5 h-5" />} label="Reporting" href="/reporting" />
    </nav>
    <div className="mt-auto">
      <h4 className="text-sm font-semibold text-gray-400 uppercase px-2 mb-2">Others</h4>
      <nav className="flex flex-col gap-2">
        <SidebarNavItem icon={<BookOpen className="w-5 h-5" />} label="Guide" href="#" />
        <SidebarNavItem icon={<MessageSquare className="w-5 h-5" />} label="Messages" href="#" />
        <SidebarNavItem icon={<Settings className="w-5 h-5" />} label="Settings" href="#" />
      </nav>
    </div>
  </div>
);
const SidebarNavItem = ({ icon, label, isActive = false, href = "#" }: { icon: React.ReactNode, label: string, isActive?: boolean, href?: string }) => (
  <Link 
    href={href} 
    className={clsx(
      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
      isActive
        ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    )}
  >
    {icon} 
    <span className="font-medium text-sm">{label}</span>
  </Link>
);
const AdminHeader = () => (
  <div className="w-full bg-white dark:bg-gray-900 shadow-md p-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button className="text-gray-700 dark:text-gray-300 lg:hidden">
        <Menu className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h2>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative w-64 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-red-500 focus:ring-red-500 focus:outline-none text-sm"
        />
      </div>
      <button className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
        <Bell className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
      </button>
      <UserDropdown />
    </div>
  </div>
);

// --- BƯỚC 2: TẠO COMPONENT MODAL (NỘI BỘ) ---
interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: UserUpdateData) => void;
  currentUser: User | null;
  error: string | null;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ isOpen, onClose, onSave, currentUser, error }) => {
  const [formData, setFormData] = useState<UserUpdateData>({});

  useEffect(() => {
    // Khi mở modal, điền dữ liệu của currentUser (nếu là edit)
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        username: currentUser.username,
        role: currentUser.role as RoleDto,
        password: '', // Để trống mật khẩu
      });
    } else {
      // Nếu là thêm mới, reset form
      setFormData({
        name: '',
        username: '',
        role: RoleDto.Donor, // Mặc định là Donor
        password: '',
      });
    }
  }, [currentUser, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    // Nếu không nhập mật khẩu khi update, xóa nó đi để không bị gửi
    if (currentUser && !dataToSave.password) {
      delete dataToSave.password;
    }
    onSave(dataToSave);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[600px] p-6 lg:p-10">
      <form onSubmit={handleSubmit}>
        <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          {currentUser ? "Chỉnh sửa User" : "Thêm User mới"}
        </h4>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Tên (Name)</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="password">
              Mật khẩu {currentUser ? "(Để trống nếu không đổi)" : ""}
            </Label>
            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required={!currentUser} />
          </div>
          <div>
            <Label htmlFor="role">Vai trò (Role)</Label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value={RoleDto.Admin}>Admin</option>
              <option value={RoleDto.Donor}>Donor</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex items-center justify-end gap-3 mt-8">
          <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </Modal>
  );
};

// --- BƯỚC 3: CẬP NHẬT COMPONENT NỘI DUNG CHÍNH ---
const UserManagementContent = ({ onAddClick, onDelete, onEdit, users, loading }: {
  onAddClick: () => void;
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
  users: User[];
  loading: boolean;
}) => (
  <DashboardCard title="" className="col-span-12">
    <div className="flex items-center gap-4 mb-6">
      <button className="px-6 py-2.5 bg-red-600 rounded-lg shadow-sm font-medium text-sm text-white">
        Employee (User)
      </button>
    </div>

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">User List</h1>
      <button 
        onClick={onAddClick} // Gán sự kiện
        className="flex items-center gap-2 px-5 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-semibold text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Plus size={18} />
        Add User
      </button>
    </div>
    
    {loading ? (
      <p>Loading users...</p>
    ) : (
      <UserTable users={users} onEdit={onEdit} onDelete={onDelete} />
    )}
  </DashboardCard>
);

// --- BƯỚC 4: COMPONENT TRANG CHÍNH (QUẢN LÝ STATE) ---
export default function UserManagementPage() {
  const router = useRouter();
  const { user: adminUser, isLoading: isAuthLoading } = useAuth();
  
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State cho Modal
  const { isOpen, openModal, closeModal } = useModal();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Hàm fetch data
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await UserService.list();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Bảo vệ route (chỉ Admin)
  useEffect(() => {
    if (!isAuthLoading) {
      if (!adminUser || adminUser.role !== 'Admin') {
        router.push('/'); // Chuyển về trang chủ nếu không phải Admin
      } else {
        fetchUsers(); // Tải data nếu là Admin
      }
    }
  }, [adminUser, isAuthLoading, router]);

  // 2. Xử lý mở modal
  const handleAdd = () => {
    setCurrentUser(null); // Đặt current user là null để biết là "thêm mới"
    setError(null);
    openModal();
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user); // Đặt current user để biết là "chỉnh sửa"
    setError(null);
    openModal();
  };

  // 3. Xử lý xóa
  const handleDelete = async (user: User) => {
    if (window.confirm(`Bạn có chắc muốn xóa user "${user.username}"?`)) {
      if (adminUser?.id === user.id) {
         alert("Bạn không thể tự xóa chính mình.");
         return;
      }
      try {
        await UserService.remove(user.id);
        fetchUsers(); // Tải lại danh sách
      } catch (err: any) {
        alert("Lỗi khi xóa: " + err.message);
      }
    }
  };

  // 4. Xử lý lưu (Thêm/Sửa)
  const handleSave = async (formData: UserUpdateData) => {
    setError(null);
    try {
      if (currentUser) {
        // Cập nhật (Update)
        await UserService.update(currentUser.id, formData);
      } else {
        // Thêm mới (Create)
        await UserService.create(formData as any); // (cast vì create yêu cầu password)
      }
      fetchUsers(); // Tải lại danh sách
      closeModal(); // Đóng modal
    } catch (err: any) {
      setError(err.message || "Lỗi khi lưu");
    }
  };

  // Hiển thị loading nếu đang check auth
  if (isAuthLoading || !adminUser) {
    return (
      <div className="flex w-full min-h-screen bg-gray-50 dark:bg-black items-center justify-center">
        <p>Đang tải và xác thực...</p>
      </div>
    );
  }

  // Giao diện chính
  return (
    <div className="flex w-full min-h-screen bg-gray-50 dark:bg-black">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col h-screen">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <UserManagementContent 
            users={users}
            loading={isLoading}
            onAddClick={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {/* Modal Thêm/Sửa */}
      <UserEditModal
        isOpen={isOpen}
        onClose={closeModal}
        onSave={handleSave}
        currentUser={currentUser}
        error={error}
      />
    </div>
  );
}