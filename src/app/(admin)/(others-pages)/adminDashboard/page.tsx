// src/app/(admin)/(others-pages)/adminDashboard/page.tsx
"use client"; 

import React from "react";
// Import các icon lucide-react phù hợp
import {
  LayoutDashboard,
  CalendarDays,
  Droplet,
  Users,
  BarChart,
  BookOpen,
  MessageSquare,
  Settings,
  Menu,
  Search,
  Bell,
  UserCircle, 
  ChevronDown, 
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
  HeartPulse,
  ArrowRight
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link"; 

import UserDropdown from "@/components/header/UserDropdown";

// 1. TÁCH CÁC COMPONENTS UI

/**
 * Component Thẻ (Card) chung cho dashboard
 */
// BƯỚC 1: Đổi nền dark mode mặc định từ gray-800 sang gray-900 (hợp hơn)
const DashboardCard = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={clsx("bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6", className)}>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
    {children}
  </div>
);

/**
 * Component Sidebar riêng của trang Admin
 */
// BƯỚC 2: Đổi nền dark mode sidebar từ gray-800 sang gray-900
const AdminSidebar = () => (
  <div className="w-64 bg-white dark:bg-gray-900 h-screen p-4 flex flex-col shadow-lg">
    {/* Logo */}
    <div className="flex items-center gap-3 px-2 py-4 mb-6">
      <HeartPulse className="w-10 h-10 text-red-600" />
      <span className="font-bold text-2xl text-red-600">B-DONOR</span>
    </div>
    
    {/* Main Navigation */}
    <nav className="flex flex-col gap-2">
      <SidebarNavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" isActive={true} href="/adminDashboard" />
      <SidebarNavItem icon={<CalendarDays className="w-5 h-5" />} label="Appointment" href="/appointment" />
      <SidebarNavItem icon={<Droplet className="w-5 h-5" />} label="Blood inventory" href="/blood-inventory" />
      <SidebarNavItem icon={<Users className="w-5 h-5" />} label="User management" href="/admin-user-management" />
      <SidebarNavItem icon={<BarChart className="w-5 h-5" />} label="Reporting" href="/reporting" />
    </nav>

    {/* Others Navigation */}
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

/**
 * Component Mục menu trong Sidebar
 */
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


/**
 * Component Header riêng của trang Admin
 */
// BƯỚC 3: Đổi nền dark mode header từ gray-800 sang gray-900
const AdminHeader = () => (
  <div className="w-full bg-white dark:bg-gray-900 shadow-md p-4 flex items-center justify-between">
    {/* Left: Title and Menu */}
    <div className="flex items-center gap-4">
      <button className="text-gray-700 dark:text-gray-300 lg:hidden">
        <Menu className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
    </div>

    {/* Right: Search, Notifications, User */}
    <div className="flex items-center gap-4">
      {/* BƯỚC 4: Đổi nền search bar từ gray-100 sang gray-50 (sáng hơn) */}
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


// 2. COMPONENTS NỘI DUNG CỤ THỂ

/**
 * Card: Xu hướng hiến máu
 */
// BƯỚC 5: Đổi nền placeholder biểu đồ từ gray-100 sang gray-50
const DonationTrendsCard = () => (
  <DashboardCard title="Blood Donation Trends" className="col-span-12 lg:col-span-8">
    <div className="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <BarChart className="w-16 h-16 text-gray-400" />
      <span className="ml-2 text-gray-500">(Biểu đồ xu hướng)</span>
    </div>
  </DashboardCard>
);

/**
 * Card: Tóm tắt chiến dịch
 */
const CampaignSummaryCard = () => (
  <DashboardCard title="Campaign Goal Summary" className="col-span-12 lg:col-span-4">
    <div className="flex flex-col gap-4">
      <CampaignGoalItem label="Ad Campaign" value="6,788" total="8,000" percent={84.85} />
      <CampaignGoalItem label="Comments" value="452" total="800" percent={56.5} />
      <CampaignGoalItem label="Likes" value="8,325" total="10,000" percent={83.25} />
      <CampaignGoalItem label="Bookmarked" value="5,622" total="5,000" percent={112.44} />
    </div>
  </DashboardCard>
);

// BƯỚC 6: Đổi nền thanh progress từ gray-200 sang gray-100
const CampaignGoalItem = ({ label, value, total, percent }: { label: string, value: string, total: string, percent: number }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">{value} / {total}</span>
    </div>
    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
      <div 
        className={clsx("h-2 rounded-full", percent > 100 ? "bg-green-500" : "bg-red-500")}
        style={{ width: `${Math.min(percent, 100)}%` }}
      ></div>
    </div>
  </div>
);

/**
 * Card: Lịch hẹn
 */
// BƯỚC 7: Bảng đã dùng bg-gray-50, không cần sửa
const AppointmentsCard = () => (
  <DashboardCard title="Appointment" className="col-span-12">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3">Patient Name</th>
            <th className="px-4 py-3">Assigned Doctor</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Blood Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-gray-700">
          <AppointmentRow name="Nguyen Van Linh" doctor="Dr. Nguyen Van A" date="07/05/2025" bloodType="AB" status="Confirmed" />
          <AppointmentRow name="Nguyen Minh Quan" doctor="Dr. Nguyen Van A" date="06/05/2025" bloodType="A" status="Confirmed" />
          <AppointmentRow name="Pham Van Cuong" doctor="Dr. Nguyen Van A" date="03/05/2025" bloodType="O" status="Confirmed" />
          <AppointmentRow name="Nguyen Thi Tuyet" doctor="Dr. Nguyen Van A" date="27/04/2025" bloodType="AB" status="Confirmed" />
        </tbody>
      </table>
    </div>
  </DashboardCard>
);

const AppointmentRow = ({ name, doctor, date, bloodType, status }: { name: string, doctor: string, date: string, bloodType: string, status: string }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{name}</td>
    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{doctor}</td>
    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{date}</td>
    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{bloodType}</td>
    <td className="px-4 py-3">
      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">{status}</span>
    </td>
    <td className="px-4 py-3">
      <a href="#" className="text-red-600 dark:text-red-400 hover:underline font-medium">View</a>
    </td>
  </tr>
);

/**
 * Card: Hoạt động hiến máu gần đây
 */
const DonorActivityCard = () => (
  <DashboardCard title="Recent Donor Activity" className="col-span-12 lg:col-span-5">
    <div className="flex flex-col gap-4">
      <ActivityItem title="HOA PHUONG DO" date="Jan 25, 2024" change="+15%" changeType="increase" />
      <ActivityItem title="RED DAY" date="Jan 25, 2024" change="-10%" changeType="decrease" />
    </div>
  </DashboardCard>
);

const ActivityItem = ({ title, date, change, changeType }: { title: string, date: string, change: string, changeType: "increase" | "decrease" }) => (
  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
        <HeartPulse className="w-5 h-5 text-red-600 dark:text-red-400" />
      </div>
      <div>
        <div className="font-semibold text-gray-900 dark:text-white">{title}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{date}</div>
      </div>
    </div>
    <div className={clsx("font-semibold text-sm", changeType === 'increase' ? "text-green-600" : "text-red-600")}>
      {change}
    </div>
  </div>
);

/**
 * Card: Tình trạng kho máu
 */
const InventoryCard = () => (
  <DashboardCard title="Blood Inventory Status" className="col-span-12 lg:col-span-7">
    <div className="flex flex-col gap-3">
      {/* Vùng biểu đồ */}
      <div className="flex items-end justify-around h-64 gap-2 px-2">
        <InventoryBar label="A+" percent={90} status="sufficient" />
        <InventoryBar label="A-" percent={60} status="caution" />
        <InventoryBar label="O+" percent={100} status="sufficient" />
        <InventoryBar label="O-" percent={45} status="caution" />
        <InventoryBar label="B+" percent={15} status="critical" />
        <InventoryBar label="B-" percent={65} status="caution" />
        <InventoryBar label="AB+" percent={75} status="sufficient" />
        <InventoryBar label="AB-" percent={25} status="critical" />
      </div>
      {/* Chú thích */}
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-4 pt-4 border-t dark:border-gray-700">
        <LegendItem icon={CheckCircle} color="text-green-500" label="Sufficient" />
        <LegendItem icon={AlertTriangle} color="text-yellow-500" label="Caution" />
        <LegendItem icon={XCircle} color="text-red-500" label="Critical" />
      </div>
    </div>
  </DashboardCard>
);

const InventoryBar = ({ label, percent, status }: { label: string, percent: number, status: "sufficient" | "caution" | "critical" }) => (
  <div className="flex flex-col items-center justify-end h-full flex-1 gap-2">
    <div 
      className={clsx(
        "w-full rounded-t-md transition-all",
        status === 'sufficient' && "bg-green-500",
        status === 'caution' && "bg-yellow-500",
        status === 'critical' && "bg-red-500"
      )}
      style={{ height: `${percent}%` }}
    ></div>
    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
  </div>
);

const LegendItem = ({ icon: Icon, color, label }: { icon: React.ElementType, color: string, label: string }) => (
  <div className="flex items-center gap-2">
    <Icon className={clsx("w-4 h-4", color)} />
    <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
  </div>
);


// 3. COMPONENT TRANG CHÍNH
export default function AdminDashboardPage() {
  return (
    // Layout chính: Sidebar cố định bên trái, nội dung bên phải
    // BƯỚC 8: Đổi nền chính từ gray-100 sang gray-50
    <div className="flex w-full min-h-screen bg-gray-50 dark:bg-black">
      
      {/* Sidebar (chỉ hiển thị trên desktop) */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Vùng nội dung chính (Header + Main) */}
      <div className="flex-1 flex flex-col h-screen">
        
        {/* Header */}
        <AdminHeader />

        {/* Nội dung chính (cuộn được) */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="grid grid-cols-12 gap-6">
            
            {/* Hàng 1 */}
            <DonationTrendsCard />
            <CampaignSummaryCard />

            {/* Hàng 2 */}
            <AppointmentsCard />

            {/* Hàng 3 */}
            <DonorActivityCard />
            <InventoryCard />

          </div>
        </main>
      </div>
    </div>
  );
}