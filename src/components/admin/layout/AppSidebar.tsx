// src/components/admin/layout/AppSidebar.tsx
"use client"; // BẮT BUỘC THÊM "use client"

import React from 'react';
import Image from 'next/image';
import { SidebarNavItem } from '@/types';
import SidebarNavLink from './SidebarNavLink'; // Import component con
import { Book, MessageCircle, Settings, ChevronRight } from 'lucide-react'; // Icons
import { usePathname } from 'next/navigation'; // BƯỚC 1: Import usePathname

// BƯỚC 2: Cập nhật đường dẫn (href)
const mainNavItems: SidebarNavItem[] = [
  { href: "/adminDashboard", label: "Dashboard", iconSrc: "/assets/SvgAsset10.svg", iconAlt: "Dashboard" },
  { href: "/appointment", label: "Appointment", iconSrc: "/assets/SvgAsset4.svg", iconAlt: "Appointment" },
  { href: "/blood-inventory", label: "Blood inventory", iconSrc: "/assets/SvgAsset3.svg", iconAlt: "Blood inventory" },
  { href: "/admin-user-management", label: "User management", iconSrc: "/assets/SvgAsset2.svg", iconAlt: "User management" }, // Sửa href
  { href: "/reporting", label: "Reporting and Analysis", iconSrc: "/assets/SvgAsset11.svg", iconAlt: "Reporting" },
];

const AppSidebar = () => {
  // BƯỚC 3: Lấy đường dẫn hiện tại
  const pathname = usePathname();

  return (
    // w-[345px] ~ 345px. Dùng h-full và overflow-y-auto để cuộn nếu nội dung dài
    <aside className="w-[345px] bg-white h-full p-6 flex flex-col gap-10 overflow-y-auto shadow-lg fixed top-0 left-0"> {/* Thêm fixed top-0 left-0 */}
      {/* Logo B-DONOR */}
      <div className="flex items-center gap-3 px-4">
        <Image src="/assets/SvgAsset1.svg" alt="Logo" width={74} height={63} />
        <span className="font-baloo text-4xl font-normal text-red-700">
          B-DONOR
        </span>
      </div>

      {/* Khối điều hướng chính */}
      <nav className="flex flex-col gap-2">
        {mainNavItems.map((item) => (
          <SidebarNavLink
            key={item.href}
            href={item.href}
            label={item.label}
            iconSrc={item.iconSrc}
            iconAlt={item.iconAlt}
            // BƯỚC 4: Logic active động
            isActive={pathname === item.href} 
          />
        ))}
      </nav>

      {/* Khối "Others" */}
      <div className="flex flex-col gap-4 pl-8">
        <h3 className="text-lg font-medium text-gray-800">Others</h3>
        <a href="#" className="flex items-center justify-between text-gray-700 hover:text-red-600">
          <div className="flex items-center gap-4">
            <Book size={20} />
            <span>Guide</span>
          </div>
          <ChevronRight size={16} />
        </a>
        <a href="#" className="flex items-center justify-between text-gray-700 hover:text-red-600">
          <div className="flex items-center gap-4">
            <MessageCircle size={20} />
            <span>Messages</span>
            <span className="ml-2 px-3 py-0.5 bg-red-500 text-white text-xs rounded-full">New!</span>
          </div>
        </a>
        <a href="#" className="flex items-center justify-between text-gray-700 hover:text-red-600">
          <div className="flex items-center gap-4">
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </a>
      </div>
    </aside>
  );
};

export default AppSidebar;