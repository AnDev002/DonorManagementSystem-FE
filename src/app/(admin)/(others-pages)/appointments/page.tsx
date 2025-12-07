// src/app/(admin)/(others-pages)/appointments/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Services & Types
import { AppointmentService, AppointmentHistoryItem } from "@/services/AppointmentService";

// Components UI
import AppointmentHeader from "@/components/appointment/AppointmentHeader";
import StatusTracker, { type StatusStep } from '@/components/appointment/StatusTracker';
import Button from "@/components/ui/button/Button";
import { CalendarIcon, PlusIcon, HomeIcon, ChatIcon as PhoneIcon, CheckCircleIcon as HelpCircleIcon } from "@/icons";
import clsx from "clsx";

// --- Dữ liệu tĩnh cho Avatar Icon ---
const avatarIconData = [
  { width: '9px', height: '12.6px', top: '9px', zIndex: '10' },
];

export default function AppointmentDetailPage() {
  const router = useRouter();
  const [appointment, setAppointment] = useState<AppointmentHistoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch dữ liệu
  const fetchActiveAppointment = async () => {
    setLoading(true);
    try {
      const history = await AppointmentService.getMyHistory();
      const activeApt = history
        .filter(apt => apt.status === 'Pending' || apt.status === 'Confirmed')
        .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime())[0];
      setAppointment(activeApt || null);
    } catch (error) {
      console.error("Failed to load appointment", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveAppointment();
  }, []);

  // 2. Xử lý Hủy lịch
  const handleCancel = async () => {
    if (!appointment) return;
    const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?");
    if (confirmCancel) {
      try {
        await AppointmentService.cancelAppointment(appointment.id);
        alert("Đã hủy lịch hẹn thành công.");
        fetchActiveAppointment();
      } catch (error) {
        alert("Lỗi khi hủy lịch. Vui lòng thử lại.");
      }
    }
  };

  // 3. Logic Status Steps
  const getStatusSteps = (status: string): StatusStep[] => {
    const isConfirmed = status === 'Confirmed';
    
    return [
      { 
        text: 'Registered', 
        minWidth: '102px', 
        // Bước này luôn là quá khứ, nên để mờ (dimmed) cho dễ nhìn
        isDimmed: true, 
        isLightFont: true 
      },
      { 
        text: 'Waiting for approval', 
        minWidth: '192px', 
        // LOGIC MỚI: 
        // Nếu đã Confirmed (Approved) -> Bước Waiting đã qua -> isDimmed = true (mờ đi)
        // Nếu chưa Confirmed (Pending) -> Bước Waiting đang diễn ra -> isDimmed = false (sáng lên)
        isDimmed: isConfirmed, 
        isLightFont: isConfirmed, 
        marginLeft: '187px' 
      },
      { 
        text: 'Approved', 
        minWidth: '92px', 
        // Nếu đã Confirmed -> Sáng lên
        // Nếu chưa Confirmed -> Mờ đi
        isDimmed: !isConfirmed, 
        isLightFont: !isConfirmed, 
        marginLeft: '235px' 
      },
    ];
  };

  // --- RENDER: Loading ---
  if (loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">Appointment Loading...</p>
      </div>
    );
  }

  // --- RENDER: Không có lịch hẹn (Empty State) ---
  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full p-6 bg-gray-50">
        <div className="bg-white p-8 rounded-full mb-6 shadow-sm border border-gray-100">
          <CalendarIcon className="w-16 h-16 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You don't have any appointments</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Register to donate blood today to help save lives.
        </p>
        <Link href="/donation">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105">
            <PlusIcon className="w-5 h-5" />
            Register Now
          </Button>
        </Link>
      </div>
    );
  }

  // --- RENDER: Có lịch hẹn (Main UI) ---
  const formattedDate = new Date(appointment.appointmentDate).toLocaleDateString("vi-VN", {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const timeString = appointment.status === 'Confirmed'
    ? new Date(appointment.appointmentDate).toLocaleTimeString("vi-VN", {hour: '2-digit', minute:'2-digit'})
    : "Pending arrangement";

  // Helper render dòng chi tiết
  const DetailItem = ({ label, value, highlight = false }: { label: string, value: string | number, highlight?: boolean }) => (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-red-200/80 uppercase tracking-wide">{label}</span>
      <span className={clsx(
        "text-white break-words",
        highlight ? "text-2xl font-bold text-yellow-300" : "text-lg font-semibold"
      )}>
        {value}
      </span>
    </div>
  );

  return (
    // Nền trang màu trắng xám (Gray-50)
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 p-4 md:p-6 pb-20">
      
      {/* 1. Header Section */}
      <div className="w-full max-w-6xl mx-auto pt-4">
        <AppointmentHeader
          title="Theo dõi lịch hẹn"
          avatarIconData={avatarIconData}
        />
      </div>

      {/* 2. Status Tracker */}
      <div className="flex justify-center w-full mt-6 mb-8 overflow-x-auto px-4">
        <StatusTracker statusStepsData={getStatusSteps(appointment.status)} />
      </div>

      {/* 3. Appointment Details Card (NỀN ĐỎ) */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#B41919] to-[#8E1212] rounded-[24px] shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            {/* Title */}
            <div className="mb-8 border-b border-white/20 pb-4 relative z-10">
               <h3 className="text-2xl font-bold text-white uppercase flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-white rounded-full"></span>
                  Information Details
               </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 relative z-10">
                {/* Cột 1 */}
                <div className="flex flex-col gap-8">
                    <DetailItem label="Họ và tên" value={appointment.name} highlight />
                    <DetailItem label="Số điện thoại" value={appointment.phone} />
                    
                    {/* Nhóm máu nổi bật */}
                    <div className="p-4 bg-black/20 rounded-xl border border-white/10">
                        <span className="text-xs font-bold text-red-200 uppercase block mb-1">Register Blood Type</span>
                        <span className="text-3xl font-black text-white">{appointment.bloodType}</span>
                    </div>
                </div>

                {/* Cột 2 */}
                <div className="flex flex-col gap-8">
                    <DetailItem label="Địa điểm hiến máu" value={appointment.location} />
                    <DetailItem label="Ngày hẹn" value={formattedDate} />
                    <DetailItem label="Giờ hẹn cụ thể" value={timeString} highlight={appointment.status === 'Confirmed'} />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              
              {/* Nút Hủy (Outline trắng) */}
              {appointment.status === 'Pending' && (
                <button
                    onClick={handleCancel}
                    className="w-full md:w-auto px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-colors"
                >
                    Cancel Appointment
                </button>
              )}

              {/* Nút Về trang chủ (Đỏ đậm hơn nền) */}
              <button
                onClick={() => router.push('/')}
                className="w-full md:w-auto px-10 py-3.5 rounded-xl bg-[#580b0b] text-white font-bold text-lg shadow-lg hover:bg-[#420808] transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <HomeIcon className="w-5 h-5" />
                Back To Home
              </button>
            </div>
        </div>
      </div>

      {/* 4. Support Card (NỀN ĐỎ) */}
      <div className="w-full max-w-5xl mx-auto mt-8">
        <div className="bg-[#B41919] rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                    {/* Giả lập icon trắng bằng filter nếu là ảnh, hoặc dùng component icon có class text-white */}
                    <div className="w-6 h-6 text-white"><PhoneIcon /></div> 
                </div>
                <div>
                    <p className="text-red-200 text-sm font-medium">Medical Support Hotline</p>
                    <p className="text-xl font-bold text-white">(+84) 1900 1234</p>
                </div>
            </div>

            <div className="h-px w-full md:w-px md:h-12 bg-white/20"></div>

            <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                    <div className="w-6 h-6 text-white"><HelpCircleIcon /></div>
                </div>
                <div>
                    <p className="text-red-200 text-sm font-medium">Need help?</p>
                    <p className="text-xl font-bold text-white cursor-pointer hover:underline">Support Center</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}