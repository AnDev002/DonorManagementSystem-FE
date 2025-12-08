// src/components/schedule/WorkSchedule.tsx
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
  appointmentDate: string; // ISO string từ DB
  status: string;
  name?: string; 
  user?: { name: string; email: string }; 
  phone?: string;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Helper: So sánh 2 đối tượng Date có cùng ngày/tháng/năm không
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

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
      // Tính ngày đầu và cuối của view lịch (bao gồm cả padding của tháng trước/sau)
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      
      // Lấy dư ra 7 ngày trước và sau để cover hết grid lịch
      const startRange = new Date(firstDayOfMonth);
      startRange.setDate(startRange.getDate() - 7);
      
      const endRange = new Date(lastDayOfMonth);
      endRange.setDate(endRange.getDate() + 7);

      // Convert sang string YYYY-MM-DD để gửi API
      const startStr = startRange.toISOString().split('T')[0];
      const endStr = endRange.toISOString().split('T')[0];
      
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

    const grid: { date: number; isCurrentMonth: boolean; fullDate: Date }[] = [];

    // Padding ngày tháng trước
    for (let i = 0; i < startDayOfWeek; i++) {
        const prevDate = new Date(year, month, 0 - (startDayOfWeek - 1 - i));
        grid.push({ date: prevDate.getDate(), isCurrentMonth: false, fullDate: prevDate });
    }

    // Ngày trong tháng hiện tại
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push({ 
        date: i, 
        isCurrentMonth: true, 
        fullDate: new Date(year, month, i) 
      });
    }
    
    // Padding ngày tháng sau (cho đủ lưới 35 hoặc 42 ô nếu cần)
    const remainingCells = 42 - grid.length;
    for(let i = 1; i <= remainingCells; i++) {
        const nextDate = new Date(year, month + 1, i);
        grid.push({ date: nextDate.getDate(), isCurrentMonth: false, fullDate: nextDate });
    }

    return grid;
  }, [currentMonth]);

  // 3. Lọc danh sách cho ngày đang chọn
  const appointmentsOnSelectedDate = useMemo(() => {
    return appointments.filter(apt => {
        const aptDate = new Date(apt.appointmentDate);
        return isSameDay(aptDate, selectedDate);
    });
  }, [selectedDate, appointments]);

  // Handler chuyển tháng
  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  // Handler mở Modal set giờ
  const handleOpenSetTime = (apt: Appointment) => {
    setEditingApt(apt);
    const dateObj = new Date(apt.appointmentDate);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    
    // Logic: Nếu giờ là 00:00 (mặc định) hoặc status là Pending -> Gợi ý 08:00
    // Nếu đã có giờ set rồi -> Hiển thị giờ hiện tại
    const isDefaultTime = hours === '00' && minutes === '00';
    setTimeSlot(isDefaultTime ? "08:00" : `${hours}:${minutes}`);
    
    setIsModalOpen(true);
  };

  // Handler Lưu giờ
  const handleSaveTime = async () => {
    if (!editingApt || !timeSlot) return;
    try {
      await AppointmentService.updateTimeSlot(editingApt.id, timeSlot);
      alert("Time updated successfully!");
      setIsModalOpen(false);
      fetchAppointments(); // Reload data để cập nhật status và giờ mới
    } catch (error) {
      console.error(error);
      alert("Failed to update time");
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
          <span className="text-xl font-bold min-w-[180px] text-center capitalize">
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
              // Lọc các appointment trùng ngày với ô lịch
              const dayApts = appointments.filter(a => isSameDay(new Date(a.appointmentDate), cell.fullDate));
              const pendingCount = dayApts.filter(a => a.status === 'Pending').length;
              
              const isSelected = isSameDay(selectedDate, cell.fullDate);
              const isToday = isSameDay(new Date(), cell.fullDate);

              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedDate(cell.fullDate)}
                  className={clsx(
                    "h-24 md:h-32 border rounded-xl p-2 cursor-pointer transition-all relative flex flex-col justify-between hover:shadow-md",
                    isSelected ? "border-[#CF2222] bg-red-50" : "border-gray-100 bg-white",
                    !cell.isCurrentMonth && "bg-gray-50/50 opacity-60", // Làm mờ ngày tháng khác
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
                  <div className="flex flex-col gap-1 w-full">
                    {dayApts.length > 0 && (
                      <div className="flex items-center gap-1">
                         {/* Nếu có Pending (đang chờ xếp lịch) hiện màu vàng */}
                         {pendingCount > 0 ? (
                            <span className="w-full text-[10px] font-bold text-center bg-yellow-100 text-yellow-700 rounded px-1 py-0.5 border border-yellow-200">
                                {pendingCount} Pending
                            </span>
                         ) : (
                            <span className="w-full text-[10px] font-bold text-center bg-green-100 text-green-700 rounded px-1 py-0.5">
                                {dayApts.length} Set
                            </span>
                         )}
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
          <div className="bg-[#CF2222]/5 p-6 rounded-2xl border border-[#CF2222]/10 min-h-[400px]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Appointments</h3>
            
            <p className="text-[#CF2222] font-semibold text-lg mb-6 border-b border-red-200 pb-4">
              {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
              {appointmentsOnSelectedDate.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
                    <p className="italic">No appointments for this day.</p>
                </div>
              ) : (
                appointmentsOnSelectedDate.map(apt => {
                  const aptTime = new Date(apt.appointmentDate);
                  // Kiểm tra xem đã có giờ cụ thể chưa (nếu 00:00 là chưa set)
                  const hours = aptTime.getHours();
                  const minutes = aptTime.getMinutes();
                  const isTimeSet = !(hours === 0 && minutes === 0);
                  
                  const timeString = aptTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

                  return (
                    <div key={apt.id} className={clsx(
                        "p-4 rounded-xl shadow-sm border flex flex-col gap-2 transition-all",
                        apt.status === 'Pending' ? "bg-yellow-50 border-yellow-200" : "bg-white border-gray-100"
                    )}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-gray-900">{apt.name || apt.user?.name || "Unknown Donor"}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{apt.phone || "No phone number"}</div>
                        </div>
                        <div className={clsx(
                          "px-2 py-1 rounded text-xs font-bold uppercase",
                          apt.status === 'Confirmed' ? "bg-green-100 text-green-700" :
                          apt.status === 'ReadyToDonate' ? "bg-blue-100 text-blue-700" :
                          apt.status === 'Pending' ? "bg-red-100 text-red-700 animate-pulse" :
                          "bg-gray-100 text-gray-600"
                        )}>
                          {apt.status}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                        {isTimeSet ? (
                          <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                            <ClockIcon className="w-4 h-4 text-[#CF2222]" />
                            {timeString}
                          </div>
                        ) : (
                          <span className="text-sm text-red-500 font-medium italic">Time not set</span>
                        )}

                        <button 
                          onClick={() => handleOpenSetTime(apt)}
                          className="text-xs font-bold text-white bg-[#CF2222] hover:bg-red-700 px-4 py-2 rounded-lg transition shadow-md active:scale-95"
                        >
                          {isTimeSet ? "Change Time" : "Set Time"}
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
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500">Donor</p>
                <p className="font-bold text-gray-900">{editingApt.name || editingApt.user?.name}</p>
            </div>
          )}
          
          <div className="mt-2">
            <Label>Select Time Slot</Label>
            <Input 
              type="time" 
              value={timeSlot} 
              onChange={(e) => setTimeSlot(e.target.value)}
              className="text-lg font-medium h-14" 
            />
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              *Setting a time will automatically change status from <strong>Pending</strong> to <strong>Confirmed</strong> and notify the donor.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleSaveTime} className="bg-[#CF2222] hover:bg-red-700 text-white shadow-lg">Confirm & Save</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}