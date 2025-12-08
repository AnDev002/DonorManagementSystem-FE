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
  appointmentDate: string; // ISO string từ Backend
  status: string;
  name?: string; 
  user?: { name: string; email: string }; 
  phone?: string;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// --- HELPER: CHUẨN HÓA NGÀY ---
const getLocalDateKey = (dateInput: Date | string): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function WorkSchedule() {
  // State: Quản lý tháng đang xem
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  
  // State: Quản lý ngày đang chọn (Lưu dưới dạng chuỗi KEY để tránh lỗi object)
  const [selectedDateKey, setSelectedDateKey] = useState<string>(getLocalDateKey(new Date()));
  
  // State: Dữ liệu
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // State: Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApt, setEditingApt] = useState<Appointment | null>(null);
  const [timeSlot, setTimeSlot] = useState("");

  // 1. Fetch dữ liệu mỗi khi đổi tháng
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const year = currentMonthDate.getFullYear();
      const month = currentMonthDate.getMonth();
      
      const startRange = new Date(year, month, 1);
      startRange.setDate(startRange.getDate() - 7);
      
      const endRange = new Date(year, month + 1, 0);
      endRange.setDate(endRange.getDate() + 7);

      const startStr = getLocalDateKey(startRange);
      const endStr = getLocalDateKey(endRange);
      
      // LOG 1: Kiểm tra khoảng thời gian gửi lên API
      console.log(`[DEBUG] Fetching Range: ${startStr} to ${endStr}`);

      const data = await AppointmentService.getAppointmentsByRange(startStr, endStr);
      
      // LOG 2: Kiểm tra dữ liệu trả về từ API
      console.log("[DEBUG] API Response Data:", data);

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
  }, [currentMonthDate]);

  // 2. Tạo Grid Lịch
  const calendarGrid = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay(); 

    const grid = [];

    for (let i = 0; i < startDayOfWeek; i++) {
        const prevDate = new Date(year, month, 0 - (startDayOfWeek - 1 - i));
        grid.push({ 
            dayNum: prevDate.getDate(), 
            dateKey: getLocalDateKey(prevDate), 
            isCurrentMonth: false 
        });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const curDate = new Date(year, month, i);
      grid.push({ 
        dayNum: i, 
        dateKey: getLocalDateKey(curDate), 
        isCurrentMonth: true 
      });
    }
    
    const remainingCells = 42 - grid.length;
    for(let i = 1; i <= remainingCells; i++) {
        const nextDate = new Date(year, month + 1, i);
        grid.push({ 
            dayNum: nextDate.getDate(), 
            dateKey: getLocalDateKey(nextDate),
            isCurrentMonth: false
        });
    }

    return grid;
  }, [currentMonthDate]);

  // 3. Lọc danh sách Appointment theo ngày đang chọn
  const appointmentsOnSelectedDate = useMemo(() => {
    // LOG 3: Kiểm tra ngày đang được chọn (Selected Key)
    console.log(`[DEBUG] Filtering for Selected Date Key: ${selectedDateKey}`);
    console.log(`[DEBUG] Total Appointments available:`, appointments.length);

    const filtered = appointments.filter(apt => {
        const aptDateKey = getLocalDateKey(apt.appointmentDate);
        
        // LOG 4: Kiểm tra từng item xem có khớp không
        const isMatch = aptDateKey === selectedDateKey;
        // Chỉ log những item khớp để đỡ rối, hoặc log tất cả nếu danh sách ít
        if (isMatch) {
            console.log(`[DEBUG] MATCH FOUND! Apt ID: ${apt.id}, Apt Date (ISO): ${apt.appointmentDate}, Calculated Key: ${aptDateKey}`);
        }

        return isMatch;
    });

    // LOG 5: Kết quả lọc cuối cùng
    console.log(`[DEBUG] Final Filtered List for ${selectedDateKey}:`, filtered);

    return filtered;
  }, [selectedDateKey, appointments]);

  // --- HANDLERS ---

  const handlePrevMonth = () => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));

  const handleOpenSetTime = (apt: Appointment) => {
    setEditingApt(apt);
    const dateObj = new Date(apt.appointmentDate);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    
    const isDefaultTime = hours === '00' && minutes === '00';
    setTimeSlot(isDefaultTime ? "08:00" : `${hours}:${minutes}`);
    
    setIsModalOpen(true);
  };

  const handleSaveTime = async () => {
    if (!editingApt || !timeSlot) return;
    try {
      await AppointmentService.updateTimeSlot(editingApt.id, timeSlot);
      alert("Time updated successfully!");
      setIsModalOpen(false);
      fetchAppointments(); 
    } catch (error) {
      console.error(error);
      alert("Failed to update time");
    }
  };

  const displaySelectedDate = useMemo(() => {
    const [y, m, d] = selectedDateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }, [selectedDateKey]);

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
            {currentMonthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={handleNextMonth} className="p-2 hover:bg-white/20 rounded-full transition">
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT: CALENDAR GRID */}
        <div className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-7 mb-4 border-b border-gray-100 pb-2">
            {WEEKDAYS.map(day => (
              <div key={day} className="text-center font-bold text-gray-400 text-sm uppercase">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarGrid.map((cell, idx) => {
              // Lọc appointment cho ô lịch này
              const dayApts = appointments.filter(a => getLocalDateKey(a.appointmentDate) === cell.dateKey);
              const pendingCount = dayApts.filter(a => a.status === 'Pending').length;
              const confirmedCount = dayApts.filter(a => ['Confirmed', 'ReadyToDonate', 'Completed'].includes(a.status)).length;
              
              const isSelected = selectedDateKey === cell.dateKey;
              const isToday = getLocalDateKey(new Date()) === cell.dateKey;

              return (
                <div 
                  key={idx}
                  onClick={() => {
                      console.log(`[DEBUG] Clicked Date: ${cell.dateKey}`);
                      setSelectedDateKey(cell.dateKey);
                  }}
                  className={clsx(
                    "h-24 md:h-32 border rounded-xl p-2 cursor-pointer transition-all relative flex flex-col justify-between hover:shadow-md",
                    isSelected ? "border-[#CF2222] bg-red-50" : "border-gray-100 bg-white",
                    !cell.isCurrentMonth && "bg-gray-50/50 opacity-50 grayscale",
                    isToday && !isSelected && "border-blue-300 bg-blue-50 ring-1 ring-blue-200"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className={clsx(
                        "font-bold text-sm",
                        isSelected ? "text-[#CF2222]" : "text-gray-700"
                    )}>
                        {cell.dayNum}
                    </span>
                    {isToday && <span className="text-[10px] font-bold text-blue-500 uppercase">Today</span>}
                  </div>

                  {/* Indicators */}
                  <div className="flex flex-col gap-1 w-full">
                    {pendingCount > 0 && (
                        <div className="w-full text-[10px] font-bold text-center bg-yellow-100 text-yellow-700 rounded px-1 py-0.5 border border-yellow-200 truncate">
                            {pendingCount} Pending
                        </div>
                    )}
                    {confirmedCount > 0 && (
                        <div className="w-full text-[10px] font-bold text-center bg-green-100 text-green-700 rounded px-1 py-0.5 border border-green-200 truncate">
                            {confirmedCount} Set
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
            <h3 className="text-xl font-bold text-gray-800 mb-2">Appointments List</h3>
            
            <p className="text-[#CF2222] font-semibold text-lg mb-6 border-b border-red-200 pb-4">
              {displaySelectedDate}
            </p>

            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
              {appointmentsOnSelectedDate.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
                    <div className="bg-gray-100 p-4 rounded-full mb-3">
                        <ClockIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="italic">No appointments found for this day.</p>
                    <p className="text-xs text-gray-400 mt-2">(Check console log for debug info)</p>
                </div>
              ) : (
                appointmentsOnSelectedDate.map(apt => {
                  const aptTime = new Date(apt.appointmentDate);
                  const hours = aptTime.getHours();
                  const minutes = aptTime.getMinutes();
                  const isTimeSet = !(hours === 0 && minutes === 0);
                  
                  const timeString = aptTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

                  return (
                    <div key={apt.id} className={clsx(
                        "p-4 rounded-xl shadow-sm border flex flex-col gap-2 transition-all group",
                        apt.status === 'Pending' ? "bg-yellow-50 border-yellow-200 hover:border-yellow-300" : "bg-white border-gray-100 hover:border-red-200"
                    )}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-gray-900 text-lg">{apt.name || apt.user?.name || "Unknown"}</div>
                          <div className="text-sm text-gray-500 mt-0.5">{apt.phone || "No phone number"}</div>
                        </div>
                        <div className={clsx(
                          "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                          apt.status === 'Confirmed' ? "bg-green-100 text-green-700" :
                          apt.status === 'ReadyToDonate' ? "bg-blue-100 text-blue-700" :
                          apt.status === 'Pending' ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-600"
                        )}>
                          {apt.status}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
                        {isTimeSet ? (
                          <div className="flex items-center gap-2 text-gray-700 font-bold bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                            <ClockIcon className="w-4 h-4 text-[#CF2222]" />
                            {timeString}
                          </div>
                        ) : (
                          <span className="text-sm text-red-500 font-medium italic flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" /> Time not set
                          </span>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[400px] p-6">
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">Set Appointment Time</h3>
            <p className="text-sm text-gray-500">Please choose a time slot for the donor.</p>
          </div>
          
          {editingApt && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-1">Donor Name</p>
                <p className="font-bold text-gray-900 text-lg">{editingApt.name || editingApt.user?.name}</p>
            </div>
          )}
          
          <div className="mt-2">
            <Label>Time Slot</Label>
            <Input 
              type="time" 
              value={timeSlot} 
              onChange={(e) => setTimeSlot(e.target.value)}
              className="text-2xl font-bold text-center h-16 tracking-widest text-[#CF2222]" 
            />
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg flex gap-2 items-start">
               <span className="mt-0.5">ℹ️</span>
               <p>Setting a time will automatically confirm this appointment and notify the donor.</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleSaveTime} className="bg-[#CF2222] hover:bg-red-700 text-white shadow-lg">Confirm & Save</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}