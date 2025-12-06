// src/app/(admin)/(others-pages)/appointments/page.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// BƯỚC 1: Import component AppointmentDetailRow (vẫn cần dùng)
import {
  AppointmentDetailRow,
} from "@/components/appointment/AppointmentComponents";

// BƯỚC 2: Import StatusTracker (component MỚI) và kiểu dữ liệu của nó
import StatusTracker, {
  type StatusStep,
} from '@/components/appointment/StatusTracker';

// BƯỚC 3: Import data cho phần chi tiết (vẫn cần dùng)
import {
  appointmentDetails,
} from "./[id]/data";

// (Không cần import statusSteps, statusLabels, StatusStepIcon, StatusStepLabel nữa)
import Button from "@/components/ui/button/Button";

// BƯỚC 4: Định nghĩa dữ liệu cho component StatusTracker
// Dữ liệu này được lấy từ file `[id]/page.tsx` để đảm bảo giao diện giống hệt
const statusStepsData: StatusStep[] = [
  { text: 'Registered', minWidth: '102px', isDimmed: true, isLightFont: true },
  {
    text: 'Waiting for approval',
    minWidth: '192px',
    isDimmed: false,
    isLightFont: false,
    marginLeft: '187px'
  },
  {
    text: 'Approved',
    minWidth: '92px',
    isDimmed: true,
    isLightFont: true,
    marginLeft: '235px',
  },
];

// Đổi tên component chính thành tên có ý nghĩa
const AppointmentDetailPage = () => {
  const router = useRouter(); // Hook này cần "use client"

  // Hàm xử lý điều hướng
  const handleUpdateClick = () => {
    // Bạn cần thay '123' bằng ID thực tế của lịch hẹn này
    // Ví dụ: router.push(`/appointments/${appointment.id}`);
    router.push("/appointments/123"); 
  };

  return (
    <div className="flex flex-col items-center w-full h-auto max-w-6xl mx-auto p-4 md:p-6 2xl:p-10">
      
      {/* Header (Giữ nguyên) */}
      <div className="flex flex-col md:flex-row justify-between items-start w-full mb-6 gap-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <Image
            width={35}
            height={35}
            src="/assets/SvgAsset1.1.svg"
            alt="Svg Asset 18"
          />
          <h1 className="font-inter text-2xl md:text-3xl font-bold text-red-600 whitespace-nowrap">
            Registered schedule
          </h1>
        </div>
      </div>

      {/* BƯỚC 5: THAY THẾ code stepper cũ bằng component StatusTracker */}
      {/* Căn giữa component và set w-full để nó tự co giãn đúng */}
      <div className="flex justify-center w-full mt-6">
        <StatusTracker statusStepsData={statusStepsData} />
      </div>

      {/* Appointment Details Card (Giữ nguyên) */}
      <div className="bg-red-600/10 dark:bg-red-900/20 mt-8 md:mt-12 flex flex-col w-full h-auto p-6 md:p-12 rounded-lg shadow-lg">
        <AppointmentDetailRow 
          text={appointmentDetails[0].text} 
          isBold={appointmentDetails[0].isBold} 
        />
        
        <div className="space-y-4 mt-6 md:mt-8">
          {appointmentDetails.slice(1).map((detail, index) => (
            <AppointmentDetailRow 
              key={index}
              text={detail.text} 
              isBold={detail.isBold}
            />
          ))}
        </div>

        {/* Action Buttons - (Giữ nguyên) */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 w-full">
          <Button
            size="md"
            className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white text-lg md:text-xl font-medium px-8 py-3"
            onClick={handleUpdateClick} // Thêm sự kiện onClick ở đây
          >
            Update appointment
          </Button>
          <Button
            size="md"
            variant="outline"
            className="w-full md:w-auto bg-white dark:bg-gray-800 text-lg md:text-xl font-medium px-8 py-3"
          >
            Cancel appointment
          </Button>
        </div>
      </div>

      {/* Support Card - (Giữ nguyên) */}
      <div className="bg-red-600/10 dark:bg-red-900/20 rounded-lg w-full h-auto mt-8 md:mt-12 p-6 shadow-lg">
        {/* Contact Staff */}
        <div className="flex justify-between items-center w-full cursor-pointer group">
          <div className="flex flex-col gap-2">
            <h4 className="font-inter text-xl md:text-2xl font-bold text-black dark:text-white">
              Do you need support?
            </h4>
            <div className="flex items-center gap-2">
              <div className="flex justify-center items-center w-5 h-5">
                <Image
                  width={17.5}
                  height={17.5}
                  src="/assets/SvgAsset22.svg"
                  alt="Svg Asset 22"
                />
              </div>
              <span className="font-inter text-base md:text-xl text-black dark:text-gray-200 font-normal">
                Contact staff
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center h-6 transition-transform group-hover:translate-x-1">
            <Image
              width={7.4}
              height={12.7}
              src="/assets/SvgAsset21.svg"
              alt="Chevron Right"
            />
          </div>
        </div>

        <div className="w-full border-t border-gray-300/50 my-4"></div>

        {/* Support Center */}
        <div className="flex justify-between items-center w-full cursor-pointer group">
          <div className="flex items-center gap-2">
            <Image
              width={20}
              height={20}
              src="/assets/SvgAsset20.svg"
              alt="Support Icon"
            />
            <span className="ml-2 font-inter text-base md:text-xl text-black dark:text-gray-200 font-normal">
              Support center
            </span>
          </div>
          <div className="flex flex-col justify-center items-center h-6 transition-transform group-hover:translate-x-1">
            <Image
              width={7.4}
              height={12.7}
              src="/assets/SvgAsset19.svg"
              alt="Chevron Right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;