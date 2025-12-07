"use client";
import React from "react";
import Image from "next/image";
import {
  IconLayer, // This will become unused
  StatusStep,
  StatusLabel,
  AppointmentDetail,
} from "@/types/appointment";
import clsx from "clsx";

// Component for each layer of the icon (ví dụ: icon chuông thông báo)
// THIS COMPONENT IS OVERLY COMPLEX AND LIKELY NO LONGER NEEDED IF WE SIMPLIFY THE HEADER
export const NotificationIconLayer: React.FC<IconLayer> = ({
  width,
  height,
  top,
  left,
  zIndex,
  hasBackground,
  hasPadding,
}) => (
  <Image
    className={`absolute ${
      hasBackground ? "bg-[url('/assets/SvgAsset13.svg')]" : ""
    } ${hasPadding ? "pb-[3.4px]" : ""}`}
    style={{ top, left, zIndex }}
    width={parseFloat(width)}
    height={parseFloat(height)}
    src="/assets/SvgAsset10.svg"
    alt="Svg Asset 10"
  />
);

// Component cho icon trên thanh trạng thái
// SIMPLIFIED: Removed layout styles (left, zIndex). Layout will be handled by parent flexbox.
export const StatusStepIcon: React.FC<Omit<StatusStep, 'left' | 'zIndex'>> = ({
  iconSrc,
  iconAlt,
}) => (
  <div
    className="flex items-center justify-center w-12 h-12 md:w-[50px] md:h-[50px]"
  >
    <Image
      width={41.7}
      height={41.7}
      src={iconSrc}
      alt={iconAlt}
    />
  </div>
);

// Component cho nhãn trên thanh trạng thái
// SIMPLIFIED: Removed minWidth. Layout will be handled by parent flexbox (flex-1).
export const StatusStepLabel: React.FC<Omit<StatusLabel, 'minWidth'>> = ({
  label,
  isMuted,
  isNormalWeight,
}) => (
  <div
    className={clsx(
      "font-inter text-sm md:text-xl whitespace-nowrap leading-6 text-center",
      isMuted ? "text-gray-400" : "text-black dark:text-white",
      isNormalWeight ? "font-normal" : "font-medium"
    )}
  >
    {label}
  </div>
);

// Component cho mỗi dòng chi tiết lịch hẹn
// SIMPLIFIED: Removed minWidth, converted marginTop to standard Tailwind class.
export const AppointmentDetailRow: React.FC<Omit<AppointmentDetail, 'minWidth' | 'marginTop'> & { className?: string }> = ({
  text,
  isBold,
  className = ""
}) => (
  <div
    className={clsx(
      "font-inter text-lg md:text-2xl whitespace-nowrap text-black dark:text-gray-200 leading-6",
      isBold ? "font-bold" : "font-normal",
      className
    )}
  >
    {text}
  </div>
);