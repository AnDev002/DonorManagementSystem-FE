"use client";
import React from "react";
import { DonationDetail } from "@/types/history";
import clsx from "clsx";

/**
 * Kiểu dữ liệu mới cho JourneyStep
 */
interface JourneyStepProps {
  icon: React.ElementType; // <-- THAY ĐỔI
  iconAlt: string;
  title: string;
  date: string;
  showConnector: boolean;
}

export const DonationDetailRow: React.FC<DonationDetail> = ({
  label,
  value,
  isLabelBold,
  isLabelInset,
}) => (
  // ... (component này không đổi)
  <div className="grid w-full grid-cols-2 items-end gap-2">
    <div
      className={clsx(
        "font-inter text-base leading-6 text-gray-500 dark:text-gray-400 whitespace-nowrap",
        isLabelBold ? "font-bold" : "font-medium",
        isLabelInset && "ml-0.5"
      )}
    >
      {label}
    </div>
    <div className="font-inter text-base font-normal leading-6 text-black dark:text-white whitespace-nowrap text-right md:text-left">
      {value}
    </div>
  </div>
);

/**
 * Component đã được cập nhật
 */
export const BloodJourneyStep: React.FC<JourneyStepProps> = ({ // <-- THAY ĐỔI
  icon: IconComponent, // <-- THAY ĐỔI
  iconAlt,
  title,
  date,
  showConnector,
}) => (
  <div className="flex w-full items-start gap-3.5">
    {/* Icon và vạch nối */}
    <div className="relative flex flex-col items-center">
      {/* THAY ĐỔI: Render icon trong 1 div */}
      <div 
        className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white p-2 text-red-600 shadow"
        aria-label={iconAlt}
      >
        <IconComponent className="w-6 h-6" />
      </div>
      {showConnector && (
        <div className="my-2 h-16 w-px bg-gray-300" />
      )}
    </div>

    {/* Nội dung text */}
    <div className="flex flex-col gap-1 pt-1.5">
      <div className="font-inter text-base font-medium leading-none text-black dark:text-white whitespace-nowrap">
        {title}
      </div>
      <div className="font-inter text-sm font-medium leading-none text-gray-400 whitespace-nowrap">
        {date}
      </div>
    </div>
  </div>
);