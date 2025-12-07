// src/app/(admin)/(others-pages)/adminDashboard/page.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import clsx from "clsx";
import { ArrowUpRight, ChevronDown } from "lucide-react";

// Import Shared Components để đồng bộ giao diện
import AppSidebar from "@/components/admin/layout/AppSidebar";
import AppHeader from "@/components/admin/layout/AppHeader";

// Dynamically import Charts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// --- DASHBOARD WIDGETS ---

/**
 * Chart 1: Donation Trends (Bar Chart - Đơn giản hóa)
 * Hiển thị số lượng đăng ký trong 7 ngày gần nhất
 */
const DonationTrendsChart = () => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    colors: ["#CF2222"], // Màu đỏ chủ đạo
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "40%",
        dataLabels: {
          position: "top", // Hiển thị số trên đầu cột
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false, // Ẩn trục Y cho gọn
    },
    grid: {
      borderColor: "#F3F4F6",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " donors";
        },
      },
    },
  };

  // Dữ liệu giả lập (Số đơn đăng ký theo ngày)
  const series = [
    {
      name: "Registrations",
      data: [12, 19, 3, 5, 2, 30, 45],
    },
  ];

  return (
    <div className="h-full rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900">Registration Trends (This Week)</h3>
      </div>
      <div className="h-[300px] w-full">
        <ReactApexChart options={options} series={series} type="bar" height="100%" />
      </div>
    </div>
  );
};

/**
 * Chart 2: Blood Inventory Status (Giữ nguyên)
 */
const BloodInventoryChart = () => {
  const data = [
    { type: "A", percent: 80, color: "bg-green-500" },
    { type: "A-", percent: 50, color: "bg-yellow-500" },
    { type: "O", percent: 90, color: "bg-green-500" },
    { type: "O-", percent: 40, color: "bg-yellow-500" },
    { type: "B", percent: 15, color: "bg-red-500" },
    { type: "AB", percent: 60, color: "bg-green-500" },
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Inventory Status</h3>
      </div>
      
      <div className="mt-auto flex items-end justify-between gap-4 h-[230px]">
        {data.map((item) => (
          <div key={item.type} className="group flex w-full flex-col items-center gap-2">
            <div className="relative w-full max-w-[40px] rounded-t-lg bg-gray-100 h-full">
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

/**
 * Table: Appointment (Giữ nguyên UI)
 */
const AppointmentTable = () => {
  const appointments = [
    { id: "001", name: "Nguyen Van Linh", doctor: "Dr. Nguyen Van A", date: "07/05/2025", type: "AB", status: "Confirmed" },
    { id: "002", name: "Nguyen Minh Quan", doctor: "Dr. Nguyen Van A", date: "06/05/2025", type: "A", status: "Confirmed" },
    { id: "003", name: "Pham Van Cuong", doctor: "Dr. Nguyen Van A", date: "03/05/2025", type: "O", status: "Confirmed" },
    { id: "004", name: "Nguyen Thi Tuyet", doctor: "Dr. Nguyen Van A", date: "27/04/2025", type: "AB", status: "Confirmed" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Appointments</h3>
        <button className="text-sm font-medium text-red-600 hover:text-red-700">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-sm font-medium text-gray-500">
              <th className="pb-4 pl-4 font-medium">No.</th>
              <th className="pb-4 font-medium">Donor Name</th>
              <th className="pb-4 font-medium">Assigned Doctor</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Blood Type</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Details</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {appointments.map((apt) => (
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

// --- MAIN PAGE LAYOUT ---

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F9FAFB]">
      {/* Sidebar dùng chung */}
      <AppSidebar />
      
      <div className="flex flex-1 flex-col lg:ml-[290px]">
        {/* Header dùng chung */}
        <AppHeader />
        
        <main className="p-6 lg:p-8">
          <div className="grid grid-cols-12 gap-6">
            
            {/* ROW 1: Charts */}
            <div className="col-span-12 lg:col-span-8">
              <DonationTrendsChart />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <BloodInventoryChart />
            </div>

            {/* ROW 2: Table */}
            <div className="col-span-12">
              <AppointmentTable />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}