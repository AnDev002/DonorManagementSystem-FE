// src/app/(admin)/layout.tsx
"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader"; 
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { usePathname } from "next/navigation"; 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname(); 

  // SỬA TẠI ĐÂY: Cập nhật dòng check "/admin-blood-inventory"
  const isAdminPage = 
    pathname.endsWith("/adminDashboard") || 
    pathname.endsWith("/admin-user-management") ||
    pathname.endsWith("/admin-appointment") || 
    pathname.endsWith("/admin-blood-inventory") || // <-- Sửa từ "/blood-inventory" thành "/admin-blood-inventory"
    pathname.endsWith("/admin-report");           

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[0px]" 
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <Backdrop />
      
      {/* Nếu là isAdminPage, margin-left sẽ là 0 (vì trang admin tự quản lý layout), ngược lại dùng margin của user */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${isAdminPage ? 'ml-0' : mainContentMargin} overflow-x-hidden overflow-y-auto`}
      >
        {/* Chỉ hiển thị User Header nếu KHÔNG PHẢI trang Admin */}
        {!isAdminPage && <AppHeader />}
        
        <div>{children}</div>
      </div>
    </div>
  );
}