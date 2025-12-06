"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import useAuth để lấy thông tin user
// BƯỚC 1: Import các icon từ file index.tsx
import {
  HomeIcon, // Thay cho GridIcon
  ClipboardCheckIcon, // Thay cho ListIcon (đăng ký)
  BellIcon,
  HistoryIcon, // Thay cho TimeIcon
  CalendarIcon, // Thay cho CalenderIcon
} from "@/icons";

// Component NavLink con
const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link
    href={href}
    className={`flex flex-1 flex-col items-center justify-center py-3 text-sm font-medium transition-colors group ${className}`}
  >
    {children}
  </Link>
);

const AppNavBar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth(); // Lấy thông tin user hiện tại

  // BƯỚC 2: Cập nhật mảng navItems sử dụng useMemo để phản ứng với thay đổi của user
  const navItems = useMemo(() => {
    // Kiểm tra xem user có phải là Doctor không
    const isDoctor = user?.role === 'Doctor';

    return [
      { name: "Home", path: "/", icon: HomeIcon },
      { name: isDoctor ? "Register confirmation" : "Register appointment", path: isDoctor ? "register-confirmation" : "/donation", icon: ClipboardCheckIcon },
      { name: isDoctor ? "Health Check" : "Notification", path: isDoctor ? "/health-check" : "/notification", icon: BellIcon },
      { 
        // Thay đổi tên hiển thị dựa trên role
        name: isDoctor ? "Record donation" : "History", 
        path: isDoctor ? "/record-donation" : "/history", 
        icon: HistoryIcon 
      },
      { 
        // Thay đổi tên hiển thị dựa trên role
        name: isDoctor ? "Work schedule" : "Appointment", 
        path: isDoctor ? "/work-schedule" : "/appointments", 
        icon: CalendarIcon 
      },
    ];
  }, [user]);

  return (
    <nav className="flex w-full shadow-md">
      <div className="flex w-full">
        {navItems.map((item) => {
          const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);          
          // BƯỚC 3: Lấy component Icon từ 'item'
          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.path}
              href={item.path}
              className={
                isActive
                  ? "bg-rose-100 text-gray-900" 
                  : "bg-red-600 text-white hover:bg-red-700"
              }
            >
              <div className="flex items-center justify-center w-12 h-12 mb-1 bg-white rounded-full">
                {/* BƯỚC 4: Render icon mới */}
                <IconComponent 
                  className={`w-7 h-7 text-gray-900`} 
                />
              </div>
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
export default AppNavBar;