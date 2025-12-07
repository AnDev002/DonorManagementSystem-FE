"use client"; 
import React from "react";
// Không cần import Image
import HistoryHeaderGraphic from "@/components/history/HistoryHeaderGraphic";
import {
  DonationDetailRow,
  BloodJourneyStep,
} from "@/components/history/HistoryDetailComponents";
import { donationDetails } from "./data"; // Chỉ import data chi tiết
import Button from "@/components/ui/button/Button";
// BƯỚC 1: Import các icon cần dùng
import { ChevronLeftIcon, HistoryIcon, DropletIcon, WarehouseIcon, TruckIcon } from "@/icons"; 
import useGoBack from "@/hooks/useGoBack";
// Import icon giữ chỗ cho ảnh trang trí
import { PackageIcon } from "@/icons";

// BƯỚC 2: Tạo dữ liệu hành trình MỚI (vì data.ts cũ dùng string)
const bloodJourneySteps = [
  {
    icon: DropletIcon, // Truyền component
    iconAlt: "Donate blood",
    title: "Donate blood",
    date: "01/02/2024",
    showConnector: true,
  },
  {
    icon: WarehouseIcon, // Truyền component
    iconAlt: "Warehouse",
    title: "Warehouse",
    date: "01/02/2024",
    showConnector: true,
  },
  {
    icon: TruckIcon, // Truyền component
    iconAlt: "Export to VietDuc University Hospital",
    title: "Export to VietDuc University Hospital",
    date: "02/02/2024",
    showConnector: false,
  },
];


export default function HistoryDetailPage() {
  const goBack = useGoBack(); 

  return (
    <div className="flex flex-col w-full max-w-6xl h-auto px-4 py-6 mx-auto">
      
      <header className="flex flex-wrap items-center justify-between w-full gap-4">
        <div className="flex items-center gap-2">
          {/* BƯỚC 3: Thay icon tiêu đề */}
          <HistoryIcon className="w-8 h-8 text-red-600" />
          <h1 className="font-inter text-3xl min-w-[108px] whitespace-nowrap text-red-600 leading-6 font-bold">
            History
          </h1>
        </div>
        <HistoryHeaderGraphic />
      </header>

      <div className="bg-red-600/10 dark:bg-red-900/20 mt-8 flex flex-col w-full h-auto p-6 md:p-8 rounded-xl shadow-lg">
        <h2 className="font-inter text-xl whitespace-nowrap text-black dark:text-white leading-6 font-bold">
          First blood donation
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-0 md:px-4">
          {donationDetails.map((detail, index) => (
            <DonationDetailRow key={index} {...detail} />
          ))}
        </div>
      </div>

      <div className="bg-red-600/10 dark:bg-red-900/20 mt-8 flex flex-col md:flex-row justify-between items-start p-6 md:p-8 w-full h-auto rounded-xl shadow-lg overflow-hidden relative">
        <div className="flex flex-col justify-start items-start w-full max-w-lg">
          <h3 className="font-inter text-xl whitespace-nowrap text-black dark:text-white leading-none font-bold">
            Your blood unit journey
          </h3>
          <div className="mt-6 ml-1 flex flex-col gap-4">
            {/* BƯỚC 4: Map qua dữ liệu mới */}
            {bloodJourneySteps.map((step, index) => (
              <BloodJourneyStep 
                key={index} 
                icon={step.icon} // Truyền component
                iconAlt={step.iconAlt}
                title={step.title}
                date={step.date}
                showConnector={step.showConnector}
              />
            ))}
          </div>
        </div>

        {/* BƯỚC 5: Thay ảnh trang trí bằng icon giữ chỗ */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 hidden md:block self-end md:absolute md:bottom-0 md:right-0 md:-mr-8 md:-mb-8 opacity-10 text-red-900/50">
          <PackageIcon
            className="w-full h-full"
            strokeWidth={0.5}
          />
        </div>
      </div>

      <div className="w-full flex justify-center mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={goBack}
          startIcon={<ChevronLeftIcon />}
        >
          Back to History
        </Button>
      </div>
    </div>
  );
}