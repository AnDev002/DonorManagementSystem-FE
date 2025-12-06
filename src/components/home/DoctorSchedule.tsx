"use client";

import React from "react";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Star, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import clsx from "clsx";

// --- MOCK DATA ---

const doctorInfo = {
  name: "Dr. Nguyen Van A",
  role: "Chuyên khoa Huyết học",
  id: "DOC-2025-88",
  bio: "Trưởng khoa Huyết học - Truyền máu với hơn 15 năm kinh nghiệm. Chuyên gia tư vấn sức khỏe người hiến máu và an toàn truyền máu.",
  contact: {
    phone: "(+84) 912 345 678",
    email: "dr.nguyenvana@hospitals.vn",
    location: "Phòng 302, Tòa nhà A, Bệnh viện Bạch Mai",
  },
};

// Dữ liệu lịch làm việc giả lập (Tháng hiện tại)
const calendarDays = [
  { day: "Sun", date: 27, isCurrentMonth: false, events: [] },
  { day: "Mon", date: 28, isCurrentMonth: false, events: [] },
  { day: "Tue", date: 29, isCurrentMonth: false, events: [] },
  { day: "Wed", date: 30, isCurrentMonth: false, events: [] },
  { day: "Thu", date: 1, isCurrentMonth: true, events: ["08:00", "14:00"] },
  { day: "Fri", date: 2, isCurrentMonth: true, events: ["08:00"] },
  { day: "Sat", date: 3, isCurrentMonth: true, events: [] },
  
  { day: "Sun", date: 4, isCurrentMonth: true, events: [] },
  { day: "Mon", date: 5, isCurrentMonth: true, events: ["08:00", "10:00", "14:00"] },
  { day: "Tue", date: 6, isCurrentMonth: true, isToday: true, events: ["08:00", "16:00"] },
  { day: "Wed", date: 7, isCurrentMonth: true, events: [] },
  { day: "Thu", date: 8, isCurrentMonth: true, events: ["13:00"] },
  { day: "Fri", date: 9, isCurrentMonth: true, events: ["09:00", "15:00"] },
  { day: "Sat", date: 10, isCurrentMonth: true, events: [] },
];

// --- COMPONENTS ---

const InfoRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex-shrink-0 p-2 bg-red-50 text-red-600 rounded-full">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const DoctorProfileCard = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header Cover */}
      <div className="h-24 bg-gradient-to-r from-red-600 to-red-400 relative"></div>
      
      <div className="px-6 pb-6">
        {/* Avatar & Basic Info */}
        <div className="relative flex justify-between items-end -mt-12 mb-6">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-md">
              {/* Placeholder Avatar */}
              <User size={48} className="text-gray-400" />
            </div>
            <div className="mb-1">
              <h3 className="text-xl font-bold text-gray-900">{doctorInfo.name}</h3>
              <p className="text-sm text-red-600 font-medium">{doctorInfo.role}</p>
            </div>
          </div>
          
          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 italic mb-6 border-l-4 border-red-200 pl-3">
          "{doctorInfo.bio}"
        </p>

        {/* Details List */}
        <div className="space-y-2">
          <InfoRow icon={ShieldCheck} label="Staff ID" value={doctorInfo.id} />
          <InfoRow icon={Phone} label="Contact" value={doctorInfo.contact.phone} />
          <InfoRow icon={Mail} label="Email" value={doctorInfo.contact.email} />
          <InfoRow icon={MapPin} label="Office" value={doctorInfo.contact.location} />
        </div>

        {/* Action Button */}
        <button className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
          Chỉnh sửa thông tin
        </button>
      </div>
    </div>
  );
};

const ScheduleCalendar = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col h-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Clock className="text-red-600" /> 
          Lịch làm việc
        </h3>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button className="p-1 hover:bg-white rounded-md transition shadow-sm"><ChevronLeft size={18} className="text-gray-600" /></button>
          <span className="text-sm font-semibold text-gray-700 px-2">Tháng 5, 2025</span>
          <button className="p-1 hover:bg-white rounded-md transition shadow-sm"><ChevronRight size={18} className="text-gray-600" /></button>
        </div>
      </div>

      {/* Calendar Grid Header */}
      <div className="grid grid-cols-7 mb-2">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day, idx) => (
          <div key={idx} className="text-center text-xs font-bold text-gray-400 uppercase py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {calendarDays.map((item, idx) => (
          <div 
            key={idx}
            className={clsx(
              "relative flex flex-col items-center justify-start py-2 rounded-xl h-20 border transition-all cursor-pointer group",
              item.isToday 
                ? "bg-red-600 text-white border-red-600 shadow-md transform scale-105 z-10" 
                : "bg-white border-gray-100 text-gray-700 hover:border-red-200 hover:shadow-sm"
            )}
          >
            <span className={clsx(
              "text-sm font-bold mb-1",
              !item.isCurrentMonth && "opacity-30"
            )}>
              {item.date}
            </span>
            
            {/* Event Dots */}
            <div className="flex gap-1 flex-wrap justify-center px-1">
              {item.events.map((_, eventIdx) => (
                <div 
                  key={eventIdx} 
                  className={clsx(
                    "w-1.5 h-1.5 rounded-full",
                    item.isToday ? "bg-white" : "bg-red-500"
                  )} 
                />
              ))}
            </div>

            {/* Hover Tooltip (Simple) */}
            {item.events.length > 0 && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                {item.events.length} ca trực
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Upcoming Shifts Section */}
      <div className="mt-auto border-t border-gray-100 pt-4">
        <h4 className="text-sm font-bold text-gray-700 mb-3">Ca trực sắp tới (Hôm nay)</h4>
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {["08:00 - 12:00", "13:30 - 17:00"].map((shift, idx) => (
            <div key={idx} className="flex-shrink-0 flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm font-medium border border-red-100">
              <Clock size={16} />
              {shift}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const DoctorSchedule = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 py-8 md:py-12">
      
      {/* Title Section */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900">
          Thông tin & Lịch làm việc
        </h2>
        <p className="text-gray-500 mt-2">Xem thông tin chi tiết và lịch trực của bác sĩ để đặt hẹn phù hợp.</p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Profile (4/12) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <DoctorProfileCard />
        </div>

        {/* Right Column: Schedule (8/12) */}
        <div className="lg:col-span-7 xl:col-span-8 h-full">
          <ScheduleCalendar />
        </div>

      </div>
    </section>
  );
};

export default DoctorSchedule;