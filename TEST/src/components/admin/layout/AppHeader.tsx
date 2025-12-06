// src/components/admin/layout/AppHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Search, Bell, Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

// Map tiêu đề trang
const titleMap: { [key: string]: string } = {
  "/adminDashboard": "Dashboard",
  "/admin-user-management": "User Management",
  "/admin-appointment": "Appointment List",
  "/blood-inventory": "Blood Inventory",
  "/reporting": "Reporting and Analysis",
};

const AppHeader = () => {
  const pathname = usePathname();
  const pageTitle = titleMap[pathname] || "Admin Dashboard";

  return (
    // Style background đỏ giống Dashboard
    <header className="sticky top-0 z-40 flex h-[100px] w-full items-center justify-between bg-[#B41919] px-6 shadow-md lg:px-10">
      <div className="flex items-center gap-4">
        {/* Nút Menu cho Mobile */}
        <button className="text-white lg:hidden">
          <Menu size={28} />
        </button>
        <h1 className="text-2xl font-bold text-white lg:text-3xl">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="h-12 w-[280px] rounded-xl border border-white/20 bg-white py-2 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Notification */}
        <div className="relative">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <Bell size={22} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-yellow-400 border border-[#B41919]"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-white/20 pl-6">
          <div className="hidden text-right md:block">
            <p className="text-sm font-bold text-white">Designluch</p>
            <p className="text-xs text-red-100">Super Admin</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-0.5">
            <Image
              src="/images/user/user-01.jpg" // Hãy đảm bảo ảnh này tồn tại hoặc dùng placeholder
              width={44}
              height={44}
              alt="Avatar"
              className="rounded-lg object-cover"
            />
          </div>
          <button className="hidden text-white md:block">
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;