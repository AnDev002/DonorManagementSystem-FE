"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AppointmentService } from "@/services/AppointmentService";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, ArrowRightIcon as ChevronRightIcon, ClockIcon } from "@/icons";
import clsx from "clsx";

// --- TYPES ---
interface Appointment {
  id: number;
  appointmentDate: string; // ISO string
  status: string;
  name?: string; // Tên khách vãng lai
  user?: { name: string; email: string }; // Tên user hệ thống
  phone?: string;
}

// Helper để lấy ngày đầu/cuối tháng
const getMonthRange = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
  return { start, end };
};

// Helper format YYYY-MM-DD
const formatDateStr = (date: Date) => date.toISOString().split('T')[0];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WorkSchedule() {
  // State quản lý thời gian
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // State dữ liệu
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApt, setEditingApt] = useState<Appointment | null>(null);
  const [timeSlot, setTimeSlot] = useState("");

  // 1. Fetch dữ liệu khi đổi tháng
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { start, end } = getMonthRange(currentMonth);
      // Lấy dư ra vài ngày để chắc chắn cover múi giờ
      const startStr = formatDateStr(new Date(start.setDate(start.getDate() - 1)));
      const endStr = formatDateStr(new Date(end.setDate(end.getDate() + 2)));
      
      const data = await AppointmentService.getAppointmentsByRange(startStr, endStr);
      if (Array.isArray(data)) {
        setAppointments(data);
      }
    } catch (error) {
      console.error("Failed to load schedule", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentMonth]);

  // 2. Logic Lịch (Grid Generation)
  const calendarGrid = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0 (Sun) -> 6 (Sat)

    const grid: { date: number; isCurrentMonth: boolean; fullDate?: Date }[] = [];

    // Padding ngày tháng trước
    for (let i = 0; i < startDayOfWeek; i++) {
      grid.push({ date: 0, isCurrentMonth: false });
    }

    // Ngày trong tháng hiện tại
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push({ 
        date: i, 
        isCurrentMonth: true, 
        fullDate: new Date(year, month, i) 
      });
    }

    return grid;
  }, [currentMonth]);

  // 3. Lọc danh sách cho ngày đang chọn
  const appointmentsOnSelectedDate = useMemo(() => {
    const selectedStr = formatDateStr(selectedDate);
    return appointments.filter(apt => 
      apt.appointmentDate.startsWith(selectedStr)
    );
  }, [selectedDate, appointments]);

  // Handler chuyển tháng
  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));

  // Handler mở Modal set giờ
  const handleOpenSetTime = (apt: Appointment) => {
    setEditingApt(apt);
    // Lấy giờ hiện tại nếu có
    const dateObj = new Date(apt.appointmentDate);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    // Nếu status là Pending (chưa set giờ chuẩn), default là 08:00, ngược lại lấy giờ thật
    setTimeSlot(apt.status === 'Pending' ? "08:00" : `${hours}:${minutes}`);
    setIsModalOpen(true);
  };

  // Handler Lưu giờ
  const handleSaveTime = async () => {
    if (!editingApt || !timeSlot) return;
    try {
      await AppointmentService.updateTimeSlot(editingApt.id, timeSlot);
      alert("Đã cập nhật giờ hẹn và xác nhận!");
      setIsModalOpen(false);
      fetchAppointments(); // Reload data
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật giờ");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1460px] mx-auto p-4 md:p-8 gap-8 min-h-screen bg-white">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#CF2222] p-6 rounded-2xl shadow-md text-white">
        <h1 className="text-2xl font-bold uppercase tracking-wide">Doctor Schedule</h1>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-white/20 rounded-full transition">
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          <span className="text-xl font-bold min-w-[150px] text-center">
            {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={handleNextMonth} className="p-2 hover:bg-white/20 rounded-full transition">
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT: CALENDAR GRID */}
        <div className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          {/* Weekdays Header */}
          <div className="grid grid-cols-7 mb-4 border-b border-gray-100 pb-2">
            {WEEKDAYS.map(day => (
              <div key={day} className="text-center font-bold text-gray-400 text-sm uppercase">{day}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarGrid.map((cell, idx) => {
              if (!cell.isCurrentMonth) return <div key={idx} className="h-24 md:h-32"></div>;

              const dateStr = cell.fullDate ? formatDateStr(cell.fullDate) : "";
              const dayApts = appointments.filter(a => a.appointmentDate.startsWith(dateStr));
              const isSelected = selectedDate.getDate() === cell.date && selectedDate.getMonth() === currentMonth.getMonth();
              const isToday = new Date().toDateString() === cell.fullDate?.toDateString();

              return (
                <div 
                  key={idx}
                  onClick={() => cell.fullDate && setSelectedDate(cell.fullDate)}
                  className={clsx(
                    "h-24 md:h-32 border rounded-xl p-2 cursor-pointer transition-all relative flex flex-col justify-between hover:shadow-md",
                    isSelected ? "border-[#CF2222] bg-red-50" : "border-gray-100 bg-white",
                    isToday && !isSelected && "border-blue-300 bg-blue-50"
                  )}
                >
                  <span className={clsx(
                    "font-bold text-sm",
                    isSelected ? "text-[#CF2222]" : "text-gray-700"
                  )}>
                    {cell.date}
                  </span>

                  {/* Indicators */}
                  <div className="flex flex-wrap gap-1 content-end">
                    {dayApts.length > 0 && (
                      <div className="w-full text-xs font-medium text-center bg-red-100 text-red-600 rounded-md py-1">
                        {dayApts.length} Appts
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: APPOINTMENT LIST FOR SELECTED DATE */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-[#CF2222]/10 p-6 rounded-2xl border border-[#CF2222]/20 min-h-[400px]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Appointments</h3>
            <p className="text-[#CF2222] font-semibold text-lg mb-6 border-b border-red-200 pb-4">
              {selectedDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
              {appointmentsOnSelectedDate.length === 0 ? (
                <p className="text-gray-500 text-center italic mt-10">No appointments for this day.</p>
              ) : (
                appointmentsOnSelectedDate.map(apt => {
                  const aptTime = new Date(apt.appointmentDate);
                  // --- CẬP NHẬT LOGIC TẠI ĐÂY ---
                  // Coi Confirmed, Completed VÀ ReadyToDonate là đã có giờ
                  const hasTimeSet = ['Confirmed', 'Completed', 'ReadyToDonate'].includes(apt.status);
                  const timeString = aptTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

                  return (
                    <div key={apt.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-gray-900">{apt.name || apt.user?.name || "Unknown"}</div>
                          <div className="text-xs text-gray-500">{apt.phone || "No Phone"}</div>
                        </div>
                        <div className={clsx(
                          "px-2 py-1 rounded text-xs font-bold",
                          apt.status === 'Confirmed' ? "bg-green-100 text-green-700" :
                          apt.status === 'ReadyToDonate' ? "bg-blue-100 text-blue-700" : // Thêm màu cho ReadyToDonate
                          apt.status === 'Pending' ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-600"
                        )}>
                          {apt.status === 'ReadyToDonate' ? 'Screening Passed' : apt.status}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                        {hasTimeSet ? (
                          <div className="flex items-center gap-2 text-gray-700 font-medium bg-gray-50 px-3 py-1.5 rounded-lg">
                            <ClockIcon className="w-4 h-4" />
                            {timeString}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Time not set</span>
                        )}

                        <button 
                          onClick={() => handleOpenSetTime(apt)}
                          className="text-xs font-bold text-white bg-[#CF2222] hover:bg-red-700 px-3 py-2 rounded-lg transition shadow-sm"
                        >
                          {hasTimeSet ? "Change Time" : "Set Time"}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL SET TIME */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[400px] p-6">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-gray-800">Set Appointment Time</h3>
          {editingApt && (
            <p className="text-sm text-gray-600">
              Donor: <span className="font-bold">{editingApt.name || editingApt.user?.name}</span>
            </p>
          )}
          
          <div className="mt-2">
            <Label>Select Time</Label>
            <Input 
              type="time" 
              value={timeSlot} 
              onChange={(e) => setTimeSlot(e.target.value)}
              className="text-lg font-medium" 
            />
            <p className="text-xs text-gray-500 mt-2">
              *Setting time will automatically change status to <strong>Confirmed</strong>.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleSaveTime} className="bg-[#CF2222] hover:bg-red-700">Confirm & Save</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}