// src/components/admin/layout/AppSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Droplet,
  Users,
  BarChart2,
  BookOpen,
  MessageSquare,
  Settings,
  HeartPulse,
} from "lucide-react";
import clsx from "clsx";

// Định nghĩa kiểu cho Item
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isNew?: boolean;
}

// Component con hiển thị từng mục menu
const SidebarItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, isNew }) => {
  const pathname = usePathname();
  // Logic kiểm tra Active: so sánh chính xác hoặc bắt đầu với (để xử lý trang con)
  const isActive = pathname === href || (href !== '/adminDashboard' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={clsx(
        "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200 ease-in-out",
        isActive
          ? "bg-[#CF2222] text-white shadow-md" // Active style từ Dashboard
          : "text-gray-600 hover:bg-red-50 hover:text-[#CF2222]" // Inactive style
      )}
    >
      <Icon
        className={clsx(
          "h-6 w-6",
          isActive ? "text-white" : "text-gray-400 group-hover:text-[#CF2222]"
        )}
      />
      <span className="flex-1">{label}</span>
      {isNew && (
        <span className="rounded-full bg-[#FD5353] px-2.5 py-0.5 text-xs font-medium text-white">
          New!
        </span>
      )}
    </Link>
  );
};

const AppSidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/adminDashboard" },
    { icon: CalendarDays, label: "Appointment", href: "/admin-appointment" }, // Đảm bảo href đúng với file page
    { icon: Droplet, label: "Blood inventory", href: "/admin-blood-inventory" },
    { icon: Users, label: "User management", href: "/admin-user-management" },
    { icon: BarChart2, label: "Reporting and Analysis", href: "/admin-report" },
  ];

  const otherItems = [
    { icon: BookOpen, label: "Guide", href: "#" },
    { icon: MessageSquare, label: "Messages", href: "#", isNew: true },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    // Style fixed width 290px giống Dashboard
    <aside className="fixed left-0 top-0 z-50 hidden h-full w-[290px] flex-col bg-white shadow-xl lg:flex">
      {/* Logo */}
      <div className="flex h-[100px] items-center gap-3 px-8 pt-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700">
          <HeartPulse size={32} strokeWidth={2.5} />
        </div>
        <span className="font-baloo text-3xl font-bold text-[#B41919]">
          B-DONOR
        </span>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </nav>

        {/* <div className="mt-10">
          <h3 className="mb-4 px-4 text-sm font-semibold uppercase text-gray-500">
            Others
          </h3>
          <nav className="flex flex-col gap-4">
            {otherItems.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </nav>
        </div> */}
      </div>
    </aside>
  );
};

export default AppSidebar;