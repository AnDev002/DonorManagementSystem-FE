// src/components/admin/layout/AppHeader.tsx
"use client"; // BẮT BUỘC THÊM "use client"

import React from 'react';
import Image from 'next/image';
import { Search, Bell, MessageSquare, Settings, Menu, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation'; // BƯỚC 1: Import usePathname

// BƯỚC 2: Tạo map để lấy tiêu đề
const titleMap: { [key: string]: string } = {
  '/adminDashboard': 'Dashboard',
  '/admin-user-management': 'User Management',
  '/appointment': 'Appointment',
  '/blood-inventory': 'Blood Inventory',
  '/reporting': 'Reporting and Analysis',
  // Thêm các trang khác nếu cần
};

const AppHeader = () => {
  const pathname = usePathname(); // BƯỚC 3: Lấy đường dẫn
  // BƯỚC 4: Tìm tiêu đề, nếu không thấy thì dùng "Admin"
  const pageTitle = titleMap[pathname] || 'Admin';

  return (
    // Container header (h-[120px] ~ 120px, bg-red-800 ~ rgba(180,25,25,1))
    <header className="w-full h-[120px] bg-red-800 text-white flex items-center justify-between px-6 md:px-10 z-10">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu (Component6) */}
        <button className="text-white md:hidden">
          <Menu size={28} />
        </button>
        
        {/* BƯỚC 5: Hiển thị tiêu đề động */}
        <h1 className="hidden md:block text-3xl font-bold">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search here..."
            className="bg-white text-gray-700 rounded-xl py-3 px-4 pl-10 w-72"
          />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Icons (Notification, Messages, Settings) */}
        <div className="flex items-center gap-3">
          <IconButton badgeCount={23}>
            <Bell size={24} />
          </IconButton>
          <IconButton badgeCount={68}>
            <MessageSquare size={24} />
          </IconButton>
          <IconButton badgeCount={14}>
            <Settings size={24} />
          </IconButton>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/ImageAsset1.png" // Giả sử đây là path đúng
            alt="User Avatar"
            width={57}
            height={57}
            className="rounded-xl"
          />
          <div className="hidden md:block">
            <div className="font-bold text-lg">Designluch</div>
            <div className="text-sm text-gray-200">Super Admin</div>
          </div>
          <button className="hidden md:block">
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

// Component con nội bộ cho các nút icon có badge
const IconButton = ({ children, badgeCount }: { children: React.ReactNode; badgeCount: number }) => (
  <button className="relative text-white p-2">
    {children}
    {badgeCount > 0 && (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center border-2 border-red-800">
        {badgeCount}
      </span>
    )}
  </button>
);

export default AppHeader;