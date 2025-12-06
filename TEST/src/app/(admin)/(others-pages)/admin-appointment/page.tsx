// src/app/(admin)/(others-pages)/admin-appointment/page.tsx
"use client";

import React, { useState } from "react";
// Import component Shared đã cập nhật
import AppSidebar from "@/components/admin/layout/AppSidebar";
import AppHeader from "@/components/admin/layout/AppHeader";
import { Search, ChevronDown } from "lucide-react";
import clsx from "clsx";

// ... (Giữ nguyên Types, Mock Data và Sub-components StatusBadge, FilterDropdown của bạn) ...
// --- Types ---
interface Appointment {
  id: number;
  phone: string;
  name: string;
  bloodType: string;
  time: string;
  status: "Confirmed" | "Waiting" | "Canceled" | "Complete";
}

const appointmentsData: Appointment[] = [
  { id: 1, phone: "xxxxxxx", name: "Nguyễn Văn Linh", bloodType: "AB", time: "07/05/2025", status: "Confirmed" },
  // ... data giữ nguyên
];

const StatusBadge = ({ status }: { status: Appointment["status"] }) => {
    // ... code giữ nguyên
    const styles = {
    Confirmed: "bg-[#56C7CE] text-white", 
    Complete: "bg-[#04B64B] text-white", 
    Waiting: "bg-[#FDBE09] text-white", 
    Canceled: "bg-[#CF2222] text-white", 
  };
  return (
    <span className={clsx("flex h-[52px] w-[167px] items-center justify-center rounded-[10px] text-xl font-normal", styles[status])}>
      {status}
    </span>
  );
};

const FilterDropdown = ({ label, value }: { label: string; value: string }) => (
    // ... code giữ nguyên
    <div className="flex h-[49px] w-full min-w-[200px] items-center justify-between rounded-lg bg-white px-5 text-xl text-[#233454] shadow-sm md:w-auto">
    <span>{value}</span>
    <ChevronDown className="h-4 w-4 opacity-70" />
  </div>
);

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* 1. Sidebar (Shared Component) */}
      {/* Không cần div bọc hidden lg:block vì AppSidebar đã có class hidden/flex bên trong */}
      <AppSidebar />

      {/* 2. Main Content Area */}
      {/* SỬA: Đổi lg:ml-[345px] thành lg:ml-[290px] để khớp với sidebar mới */}
      <div className="flex flex-1 flex-col lg:ml-[290px]">
        {/* Header (Shared Component) */}
        <AppHeader />

        <main className="flex-1 p-6 md:p-10">
          {/* Title - Có thể bỏ vì Header đã có, hoặc giữ lại tùy ý */}
          {/* <h2 className="mb-8 font-inter text-[32px] font-bold leading-none text-[#B41919]">
            Appointment list
          </h2> */}

          {/* Filter Bar */}
          <div className="mb-10 flex flex-col gap-4 rounded-[10px] bg-[#D81818]/75 px-8 py-5 md:flex-row md:items-center md:justify-between">
             {/* ... Nội dung filter giữ nguyên ... */}
             <div className="flex h-[49px] w-full items-center gap-3 rounded-lg bg-white px-4 md:w-[350px]">
              <Search className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-full w-full bg-transparent text-xl text-black outline-none placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <FilterDropdown label="Blood Type" value="AB" />
              <FilterDropdown label="Status" value="Status" />
            </div>
          </div>

          {/* Table Section */}
          <div className="min-h-[600px] w-full rounded-[10px] border border-gray-200 bg-[#D81818]/10 p-4 shadow-md md:p-10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse text-left">
                <thead>
                  <tr>
                    {["NO.", "PHONE NUMBER", "NAME", "BLOOD TYPE", "TIME", "STATUS"].map(
                      (header) => (
                        <th key={header} className="pb-6 font-inter text-2xl font-bold text-[#FF4A4A]">
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="font-inter text-2xl font-normal text-black">
                  {appointmentsData.map((item) => (
                    <tr key={item.id} className="group hover:bg-black/5">
                      <td className="py-6">{item.id}</td>
                      <td className="py-6">{item.phone}</td>
                      <td className="py-6 font-medium">{item.name}</td>
                      <td className="py-6 pl-8">{item.bloodType}</td>
                      <td className="py-6">{item.time}</td>
                      <td className="py-4">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}