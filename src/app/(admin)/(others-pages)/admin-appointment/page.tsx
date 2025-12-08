"use client";

import React, { useState, useEffect, useMemo } from "react";
import AppSidebar from "@/components/admin/layout/AppSidebar";
import AppHeader from "@/components/admin/layout/AppHeader";
import { Search, ChevronDown, RefreshCw } from "lucide-react";
import clsx from "clsx";
import { AppointmentService, AppointmentHistoryItem } from "@/services/AppointmentService";

// Component hiển thị Badge trạng thái
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    // Màu xanh ngọc cho đã xác nhận
    Confirmed: "bg-[#56C7CE] text-white", 
    // Màu xanh lá cho hoàn thành / sẵn sàng hiến
    Completed: "bg-[#04B64B] text-white",
    ReadyToDonate: "bg-[#04B64B] text-white",
    // Màu vàng cho chờ duyệt
    Pending: "bg-[#FDBE09] text-white",
    Waiting: "bg-[#FDBE09] text-white",
    // Màu đỏ cho hủy / từ chối
    Cancelled: "bg-[#CF2222] text-white",
    Rejected: "bg-[#CF2222] text-white",
  };

  // Fallback style nếu status không khớp key nào
  const currentStyle = styles[status] || "bg-gray-400 text-white";

  return (
    <span className={clsx("flex h-[40px] w-[140px] items-center justify-center rounded-[10px] text-base font-medium", currentStyle)}>
      {status}
    </span>
  );
};

// Component Filter Dropdown hoạt động được (Sử dụng thẻ select)
const FilterSelect = ({ 
  label, 
  options, 
  value, 
  onChange 
}: { 
  label: string; 
  options: string[]; 
  value: string; 
  onChange: (val: string) => void; 
}) => (
  <div className="relative h-[49px] w-full min-w-[180px] md:w-auto">
    <select
      className="h-full w-full appearance-none rounded-lg border border-transparent bg-white px-4 pr-10 text-base text-[#233454] shadow-sm transition hover:border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-red-500/20"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
  </div>
);

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // Thêm state cho bộ lọc
  const [bloodTypeFilter, setBloodTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const [appointments, setAppointments] = useState<AppointmentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Gọi API lấy dữ liệu
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await AppointmentService.getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Tự động lấy danh sách các tùy chọn Filter dựa trên dữ liệu thực tế
  const uniqueBloodTypes = useMemo(() => {
    const types = new Set(appointments.map(item => item.bloodType).filter(Boolean));
    return Array.from(types).sort();
  }, [appointments]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(appointments.map(item => item.status).filter(Boolean));
    return Array.from(statuses).sort();
  }, [appointments]);

  // Filter logic: Kết hợp tìm kiếm và dropdown filter
  const filteredData = useMemo(() => {
    return appointments.filter((item) => {
      const name = item.name || item.user?.name || "";
      const phone = item.phone || "";
      
      // 1. Lọc theo từ khóa tìm kiếm
      const matchesSearch = 
        name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        phone.includes(searchTerm);

      // 2. Lọc theo Blood Type
      const matchesBloodType = bloodTypeFilter ? item.bloodType === bloodTypeFilter : true;

      // 3. Lọc theo Status
      const matchesStatus = statusFilter ? item.status === statusFilter : true;

      return matchesSearch && matchesBloodType && matchesStatus;
    });
  }, [appointments, searchTerm, bloodTypeFilter, statusFilter]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-inter">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:ml-[290px]">
        <AppHeader />

        <main className="flex-1 p-6 md:p-10">
          
          {/* Filter Bar */}
          <div className="mb-10 flex flex-col gap-4 rounded-[10px] bg-[#D81818]/80 px-6 py-5 md:flex-row md:items-center md:justify-between shadow-lg backdrop-blur-sm">
            
            {/* Search Input */}
            <div className="flex h-[49px] w-full items-center gap-3 rounded-lg bg-white px-4 md:w-[350px] shadow-inner">
              <Search className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-full w-full bg-transparent text-lg text-black outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Right Filters & Refresh */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Dropdown Filter đã được sửa */}
              <FilterSelect 
                label="Types" 
                options={uniqueBloodTypes} 
                value={bloodTypeFilter} 
                onChange={setBloodTypeFilter} 
              />
              
              <FilterSelect 
                label="Status" 
                options={uniqueStatuses} 
                value={statusFilter} 
                onChange={setStatusFilter} 
              />
              
              <button 
                onClick={fetchAppointments}
                className="flex h-[49px] w-[49px] items-center justify-center rounded-lg bg-white text-gray-600 hover:text-[#CF2222] transition shadow-sm"
                title="Refresh Data"
              >
                <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="min-h-[600px] w-full rounded-[10px] border border-gray-200 bg-white p-4 shadow-md md:p-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-4 pl-4 font-inter text-sm font-bold uppercase text-gray-500">NO.</th>
                    <th className="pb-4 font-inter text-sm font-bold uppercase text-gray-500">DONOR NAME</th>
                    <th className="pb-4 font-inter text-sm font-bold uppercase text-gray-500">PHONE</th>
                    <th className="pb-4 font-inter text-sm font-bold uppercase text-gray-500">BLOOD TYPE</th>
                    <th className="pb-4 font-inter text-sm font-bold uppercase text-gray-500">DATE</th>
                    <th className="pb-4 font-inter text-sm font-bold uppercase text-gray-500 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-base font-medium text-gray-900">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500">Loading appointments...</td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500">No appointments found.</td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={item.id} className="group hover:bg-red-50/30 transition-colors border-b border-gray-50 last:border-0">
                        <td className="py-5 pl-4 text-gray-500">#{index + 1}</td>
                        <td className="py-5">
                          <div className="font-bold text-gray-900">{item.name || item.user?.name || "Unknown"}</div>
                          <div className="text-xs text-gray-400">{item.email}</div>
                        </td>
                        <td className="py-5 text-gray-600">{item.phone}</td>
                        <td className="py-5 pl-4 font-bold text-red-600">{item.bloodType}</td>
                        <td className="py-5 text-gray-600">
                          {/* Format ngày tháng */}
                          {new Date(item.appointmentDate).toLocaleDateString("en-GB")}
                          <div className="text-xs text-gray-400">
                             {new Date(item.appointmentDate).toLocaleTimeString("en-GB", {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </td>
                        <td className="py-5 flex justify-center">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}