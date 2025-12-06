// src/app/(admin)/(others-pages)/adminDashboard/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  CalendarDays,
  Droplet,
  Users,
  BarChart2,
  BookOpen,
  MessageSquare,
  Settings,
  Search,
  Bell,
  ChevronDown,
  MoreHorizontal,
  Menu,
  ArrowUpRight,
  HeartPulse,
} from "lucide-react";
import clsx from "clsx";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

// Dynamically import Charts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// --- TYPES ---

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  isNew?: boolean; // Badge for "Messages"
}

// --- COMPONENTS ---

/**
 * Admin Sidebar
 * Style: White background, Red active items with White text.
 */
const AdminSidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/adminDashboard", isActive: true },
    { icon: CalendarDays, label: "Appointment", href: "/admin-appointment" },
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
    <aside className="fixed left-0 top-0 z-50 hidden h-full w-[290px] flex-col bg-white shadow-xl lg:flex">
      {/* Logo */}
      <div className="flex h-[120px] items-center gap-3 px-8 pt-6">
        {/* Fallback logo icon if image missing */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700">
           <HeartPulse size={32} strokeWidth={2.5} />
        </div>
        <span className="font-baloo text-3xl font-bold text-[#B41919]">B-DONOR</span>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </nav>

        {/* <div className="mt-10">
          <h3 className="mb-4 px-4 text-sm font-semibold uppercase text-gray-500">Others</h3>
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

const SidebarItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, isActive, isNew }) => (
  <Link
    href={href}
    className={clsx(
      "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200 ease-in-out",
      isActive
        ? "bg-[#CF2222] text-white shadow-md"
        : "text-gray-600 hover:bg-red-50 hover:text-[#CF2222]"
    )}
  >
    <Icon className={clsx("h-6 w-6", isActive ? "text-white" : "text-gray-400 group-hover:text-[#CF2222]")} />
    <span className="flex-1">{label}</span>
    {isNew && (
      <span className="rounded-full bg-[#FD5353] px-2.5 py-0.5 text-xs font-medium text-white">
        New!
      </span>
    )}
  </Link>
);

/**
 * Admin Header
 * Style: Red background (#B41919), White text.
 */
const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-40 flex h-[100px] w-full items-center justify-between bg-[#B41919] px-6 shadow-md lg:px-10">
      <div className="flex items-center gap-4">
        <button className="text-white lg:hidden">
          <Menu size={28} />
        </button>
        <h1 className="text-2xl font-bold text-white lg:text-3xl">Dashboard</h1>
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
               src="/images/user/user-01.jpg" // Replace with real avatar
               width={44}
               height={44}
               alt="Avatar"
               className="rounded-lg object-cover"
             />
          </div>
          <ChevronDown className="hidden text-white md:block" size={18} />
        </div>
      </div>
    </header>
  );
};

// --- DASHBOARD WIDGETS ---

/**
 * Chart: Blood Donation Trends
 */
const DonationTrendsChart = () => {
  const options: ApexOptions = {
    chart: { type: "area", toolbar: { show: false }, fontFamily: "Inter, sans-serif" },
    colors: ["#CF2222"],
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Week 01", "Week 02", "Week 03", "Week 04", "Week 05", "Week 06", "Week 07", "Week 08", "Week 09", "Week 10"], axisBorder: { show: false }, axisTicks: { show: false } },
    grid: { borderColor: "#F3F4F6", strokeDashArray: 4, yaxis: { lines: { show: true } } },
  };
  const series = [{ name: "Donations", data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8] }];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900">Blood Donation Trends</h3>
        <div className="flex items-center rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-sm font-medium text-[#CF2222]">
          <span>This Month</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ReactApexChart options={options} series={series} type="area" height={300} />
      </div>
    </div>
  );
};

/**
 * Card: Campaign Goal Summary
 */
const CampaignSummary = () => {
  const items = [
    { label: "Ad Campaign", current: 6788, total: 8000, percent: 85, color: "bg-blue-500" },
    { label: "Comments", current: 452, total: 800, percent: 56, color: "bg-yellow-500" },
    { label: "Likes", current: 8325, total: 10000, percent: 83, color: "bg-green-500" },
    { label: "Bookmarked", current: 5622, total: 5000, percent: 100, color: "bg-purple-500" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Campaign Goal Summary</h3>
        <MoreHorizontal className="text-gray-400" />
      </div>
      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{item.label}</span>
              <span className="text-gray-500">{item.current.toLocaleString()} / {item.total.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className={clsx("h-full rounded-full", item.color)} style={{ width: `${item.percent}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Table: Appointment
 */
const AppointmentTable = () => {
  const appointments = [
    { id: "001", name: "Nguyen Van Linh", doctor: "Dr. Nguyen Van A", date: "07/05/2025", type: "AB", status: "Confirmed", color: "text-[#CF2222]" },
    { id: "002", name: "Nguyen Minh Quan", doctor: "Dr. Nguyen Van A", date: "06/05/2025", type: "A", status: "Confirmed", color: "text-blue-600" },
    { id: "003", name: "Pham Van Cuong", doctor: "Dr. Nguyen Van A", date: "03/05/2025", type: "O", status: "Confirmed", color: "text-green-600" },
    { id: "004", name: "Nguyen Thi Tuyet", doctor: "Dr. Nguyen Van A", date: "27/04/2025", type: "AB", status: "Confirmed", color: "text-purple-600" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <h3 className="mb-6 text-lg font-bold text-gray-900">Appointment</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-sm font-medium text-gray-500">
              <th className="pb-4 pl-4 font-medium">No.</th>
              <th className="pb-4 font-medium">Patient Name</th>
              <th className="pb-4 font-medium">Assigned Doctor</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Blood Types</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Details</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {appointments.map((apt, idx) => (
              <tr key={apt.id} className="group border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="py-4 pl-4 text-gray-500">{apt.id}</td>
                <td className="py-4 font-medium text-gray-900">{apt.name}</td>
                <td className="py-4 text-[#3F779B] font-medium">{apt.doctor}</td>
                <td className="py-4 text-gray-500">{apt.date}</td>
                <td className="py-4 font-bold text-gray-900">{apt.type}</td>
                <td className="py-4">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                    {apt.status}
                  </span>
                </td>
                <td className="py-4">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-400 shadow-sm border border-gray-100 hover:text-[#CF2222]">
                    <ArrowUpRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Card: Recent Donor Activity
 */
const RecentDonorActivity = () => {
  const activities = [
    { name: "HOA PHUONG DO", date: "Jan 25, 2024", stat: "-10%", type: "User Insight", color: "text-red-500", bg: "bg-blue-50", tag: "CAMPAIGN" },
    { name: "RED DAY", date: "Jan 25, 2024", stat: "+15%", type: "User Insight", color: "text-green-500", bg: "bg-red-50", tag: "EVENT" },
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Recent Donor Activity</h3>
        <div className="flex gap-4 text-sm font-medium text-gray-400">
          <span className="text-gray-900 cursor-pointer">Monthly</span>
          <span className="cursor-pointer hover:text-gray-600">Weekly</span>
          <span className="cursor-pointer hover:text-gray-600">Daily</span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {activities.map((act, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <div className={clsx("flex h-16 w-16 flex-col items-center justify-center rounded-xl", act.bg)}>
                <span className="text-xs font-semibold uppercase text-gray-600">{act.tag}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{act.name}</h4>
                <p className="text-sm text-gray-500">Published on {act.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={clsx("text-xl font-bold", act.color)}>{act.stat}</p>
              <p className="text-sm text-gray-400">{act.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Chart: Blood Inventory Status
 */
const BloodInventoryChart = () => {
  // Mock Data for inventory
  const data = [
    { type: "A", percent: 80, color: "bg-green-500" },
    { type: "A-", percent: 50, color: "bg-yellow-500" },
    { type: "O", percent: 90, color: "bg-green-500" },
    { type: "O-", percent: 40, color: "bg-yellow-500" },
    { type: "B", percent: 15, color: "bg-red-500" },
    { type: "B-", percent: 55, color: "bg-yellow-500" },
    { type: "AB", percent: 60, color: "bg-green-500" },
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Blood Inventory Status</h3>
        <div className="flex gap-4 text-xs font-medium">
          <span className="flex items-center gap-1 text-green-600"><span className="h-2 w-2 rounded-full bg-green-500"></span>Sufficient</span>
          <span className="flex items-center gap-1 text-yellow-600"><span className="h-2 w-2 rounded-full bg-yellow-500"></span>Caution</span>
          <span className="flex items-center gap-1 text-red-600"><span className="h-2 w-2 rounded-full bg-red-500"></span>Critical</span>
        </div>
      </div>
      
      <div className="mt-auto flex items-end justify-between gap-4 h-[200px]">
        {data.map((item) => (
          <div key={item.type} className="group flex w-full flex-col items-center gap-2">
            <div className="relative w-full max-w-[40px] rounded-t-lg bg-gray-100 h-[180px]">
              <div 
                className={clsx("absolute bottom-0 w-full rounded-t-lg transition-all duration-500", item.color)} 
                style={{ height: `${item.percent}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-gray-600">{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN LAYOUT ---

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F9FAFB]">
      <AdminSidebar />
      
      <div className="flex flex-1 flex-col lg:ml-[290px]">
        <AdminHeader />
        
        <main className="p-6 lg:p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Top Row */}
            <div className="col-span-12 lg:col-span-8">
              <DonationTrendsChart />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <CampaignSummary />
            </div>

            {/* Middle Row - Table */}
            <div className="col-span-12">
              <AppointmentTable />
            </div>

            {/* Bottom Row */}
            <div className="col-span-12 lg:col-span-7">
              <RecentDonorActivity />
            </div>
            <div className="col-span-12 lg:col-span-5">
              <BloodInventoryChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}