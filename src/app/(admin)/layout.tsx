"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader"; // This is the header to hide
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

  // BƯỚC 1: SỬA ĐIỀU KIỆN
  // Thêm /admin-user-management vào danh sách các trang
  // không hiển thị AppHeader (vì chúng có AdminHeader riêng)
  const isAdminPage = 
    pathname.endsWith("/adminDashboard") || 
    pathname.endsWith("/admin-user-management");

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[0px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      {/* <AppSidebar /> */}
      <Backdrop />
      {/* Main Content Area */}
      <div
className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${mainContentMargin} overflow-x-hidden overflow-y-auto`}      >
        {/* BƯỚC 2: SỬ DỤNG ĐIỀU KIỆN MỚI */}
        {!isAdminPage && <AppHeader />}
        
        {/* Page Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}