// src/components/notification/NotificationItem.tsx
"use client";

import React from "react";
import clsx from "clsx";
import Badge from "@/components/ui/badge/Badge";
import { Notification } from "@/services/NotificationService"; // Import kiểu dữ liệu thật
import { 
  ClockIcon, 
  CheckCircleIcon, 
  BellIcon, 
  MailIcon, 
  MoreHorizontalIcon, 
  InfoIcon,
  AlertIcon
} from "@/icons";

interface NotificationItemProps {
  item: Notification; // Dùng kiểu dữ liệu từ API
  onRead?: (id: number) => void;
}

// Helper chọn icon dựa trên TYPE (giống Dropdown)
const getIconByType = (type: string) => {
  const props = { className: "w-6 h-6" };
  switch (type) {
    case 'SUCCESS': return <CheckCircleIcon {...props} className="w-6 h-6 text-green-500" />;
    case 'WARNING': return <AlertIcon {...props} className="w-6 h-6 text-yellow-500" />;
    case 'ERROR': return <AlertIcon {...props} className="w-6 h-6 text-red-500" />;
    default: return <InfoIcon {...props} className="w-6 h-6 text-blue-500" />;
  }
};

const NotificationItem = ({ item, onRead }: NotificationItemProps) => {
  // Format thời gian
  const timeString = new Date(item.createdAt).toLocaleString('vi-VN', {
    hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
  });

  return (
    <div 
      onClick={() => !item.isRead && onRead?.(item.id)}
      className={clsx(
        "relative flex w-full items-start gap-4 border-b border-gray-100 pb-5 pt-2 transition-all rounded-lg p-3 cursor-pointer",
        !item.isRead ? "bg-blue-50/60 hover:bg-blue-50" : "bg-white hover:bg-gray-50"
      )}
    >
      
      {/* 1. Icon bên trái */}
      <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm">
        {getIconByType(item.type)}
      </div>

      {/* 2. Nội dung text */}
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={clsx("text-base font-semibold", !item.isRead ? "text-gray-900" : "text-gray-600")}>
            {item.title}
          </span>
          <span className="text-sm font-normal text-gray-400 flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5" />
            {timeString}
          </span>
        </div>
        <p className={clsx("text-sm font-normal", !item.isRead ? "text-gray-800" : "text-gray-500")}>
          {item.message}
        </p>
      </div>

      {/* 3. Tag "New" */}
      {!item.isRead && (
        <div className="ml-auto flex-shrink-0 pl-2">
          <Badge variant="solid" color="primary" size="sm">
            Mới
          </Badge>
        </div>
      )}

      {/* 4. Icon menu (Optional) */}
      <button className="ml-2 flex-shrink-0 rounded-full p-1.5 text-gray-400 hover:bg-gray-200">
        <MoreHorizontalIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default NotificationItem;