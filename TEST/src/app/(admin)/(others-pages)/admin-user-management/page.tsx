"use client";

import React, { useState, useEffect, useMemo } from "react";
import AppSidebar from "@/components/admin/layout/AppSidebar";
import AppHeader from "@/components/admin/layout/AppHeader";
import { UserTable, Column } from "@/components/admin/user-management/UserTable";
import { Plus, Search, RefreshCw } from "lucide-react"; // Thêm icon Refresh
import { useAuth, User } from "@/context/AuthContext";
import { UserService, UserUpdateData } from "@/services/UserService";
import clsx from "clsx";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { RoleDto } from '@/types/user';
import { useRouter } from "next/navigation"; // Để redirect nếu lỗi 401

// --- MODAL COMPONENT (Tạo/Sửa User) ---
interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: UserUpdateData) => void;
  currentUser: User | null;
  isLoading?: boolean;
  error?: string | null;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ 
  isOpen, onClose, onSave, currentUser, isLoading, error 
}) => {
  const [formData, setFormData] = useState<UserUpdateData>({
    name: "",
    username: "",
    role: RoleDto.Donor,
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        username: currentUser.username || "",
        role: (currentUser.role as RoleDto) || RoleDto.Donor,
        password: "", // Không hiển thị password cũ
      });
    } else {
      setFormData({
        name: "",
        username: "",
        role: RoleDto.Donor,
        password: "",
      });
    }
  }, [currentUser, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };
    // Nếu đang edit và không nhập pass thì xóa trường pass đi
    if (currentUser && !dataToSubmit.password) {
      delete dataToSubmit.password;
    }
    onSave(dataToSubmit);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[600px] p-6 lg:p-8 bg-white">
      <form onSubmit={handleSubmit}>
        <h4 className="text-2xl font-semibold text-gray-800 mb-6">
          {currentUser ? "Update User" : "Create New User"}
        </h4>
        
        <div className="space-y-5">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Ex: Dr. Nguyen Van A"
              value={formData.name} 
              onChange={handleChange} 
              className="bg-white text-gray-800 border-gray-300"
            />
          </div>
          
          <div>
            <Label htmlFor="username">Username (Login ID) <span className="text-red-500">*</span></Label>
            <Input 
              id="username" 
              name="username" 
              placeholder="Ex: doctor1"
              value={formData.username} 
              onChange={handleChange} 
              required 
              disabled={!!currentUser} 
              className="bg-white text-gray-800 border-gray-300"
            />
          </div>

          <div>
            <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10"
              >
                <option value={RoleDto.Donor}>Blood Donor (Người hiến máu)</option>
                <option value={RoleDto.Doctor}>Doctor (Bác sĩ)</option>
                <option value={RoleDto.Admin}>Administrator (Quản trị viên)</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="password">
              Password {currentUser && <span className="text-gray-400 font-normal text-xs">(Leave blank to keep current)</span>}
            </Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder={currentUser ? "********" : "Enter password (min 6 chars)"}
              value={formData.password} 
              onChange={handleChange} 
              required={!currentUser}
              className="bg-white text-gray-800 border-gray-300"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 mt-8">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// --- ROLE BADGE (Hiển thị màu sắc cho từng Role) ---
const RoleBadge = ({ role }: { role: string }) => {
  const styles: Record<string, string> = {
    Admin: "bg-purple-100 text-purple-700 border-purple-200",
    Doctor: "bg-blue-100 text-blue-700 border-blue-200", // Màu riêng cho Bác sĩ
    Donor: "bg-green-100 text-green-700 border-green-200",
  };
  
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[role] || "bg-gray-100 text-gray-700")}>
      {role}
    </span>
  );
};

// --- MAIN PAGE ---
export default function UserManagementPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Data States (Dùng dữ liệu thật)
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // 1. LOAD DATA TỪ API
  const fetchUsers = async () => {
    setIsFetching(true);
    try {
      const data = await UserService.list();
      // Nếu API trả về mảng, set state. Nếu lỗi 401, catch block sẽ bắt.
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error: any) {
      console.error("Failed to fetch users", error);
      // Xử lý lỗi 401 Unauthorized
      if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
        alert("Phiên đăng nhập hết hạn hoặc bạn không có quyền Admin. Vui lòng đăng nhập lại.");
        router.push("/signin"); // Chuyển về trang login
      }
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. SEARCH FILTER (Client-side)
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      (u.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (u.username?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (u.role?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // 3. HANDLERS (CRUD)
  const handleOpenCreate = () => {
    setEditingUser(null);
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (data: UserUpdateData) => {
    setIsSaving(true);
    setModalError(null);
    try {
      if (editingUser) {
        // Update
        await UserService.update(editingUser.id, data);
      } else {
        // Create
        await UserService.create(data as any); 
      }
      await fetchUsers(); // Reload list sau khi lưu
      setIsModalOpen(false);
    } catch (err: any) {
      // Hiển thị lỗi từ backend (vd: Username exists)
      setModalError(err.message || "Failed to save user.");
      if (err.message?.includes("401")) {
         router.push("/signin");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!confirm(`Are you sure you want to delete user "${user.username}"?`)) return;
    
    try {
      await UserService.remove(user.id);
      await fetchUsers(); // Reload list
    } catch (err: any) {
      alert("Failed to delete: " + err.message);
    }
  };

  // 4. TABLE COLUMNS CONFIG
  const userColumns: Column<User>[] = [
    { 
      header: "Username", 
      accessor: "username", 
      className: "font-medium text-gray-900" 
    },
    { 
      header: "Full Name", 
      accessor: (item) => <span className="text-gray-700">{item.name || "—"}</span> 
    },
    { 
      header: "Role", 
      accessor: (item) => <RoleBadge role={item.role || "Donor"} /> 
    },
    { 
      header: "Created At", 
      accessor: (item) => item.created_at ? new Date(item.created_at).toLocaleDateString('vi-VN') : "—" 
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-[#F9FAFB] font-outfit">
      <AppSidebar />

      <div className="flex flex-1 flex-col lg:ml-[290px]">
        <AppHeader />

        <main className="flex-1 p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                User Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage Doctors, Donors, and Admins accounts.
              </p>
            </div>
            <button 
              onClick={handleOpenCreate}
              className="flex items-center gap-2 rounded-lg bg-[#CF2222] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition"
            >
              <Plus size={18} />
              Add User
            </button>
          </div>

          {/* Toolbar: Search & Refresh */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search by name, username or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm shadow-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            
            <button 
              onClick={fetchUsers} 
              disabled={isFetching}
              className="p-2 text-gray-500 hover:text-[#CF2222] hover:bg-red-50 rounded-lg transition"
              title="Refresh List"
            >
              <RefreshCw size={20} className={isFetching ? "animate-spin" : ""} />
            </button>
          </div>

          {/* User Table (Real Data Only) */}
          <UserTable
            data={filteredUsers}
            columns={userColumns}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteUser}
            isLoading={isFetching}
          />
        </main>
      </div>

      {/* MODAL Create/Edit User */}
      <UserEditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        currentUser={editingUser}
        isLoading={isSaving}
        error={modalError}
      />
    </div>
  );
}