// src/components/notification/NotificationItem.tsx
"use client";

import { NotificationItemData } from "@/lib/data/notificationData";
import clsx from "clsx";
import Badge from "@/components/ui/badge/Badge"; 
// BƯỚC 1: Import các icon (đã được định nghĩa trong index.tsx)
import { 
  ClockIcon, // <-- Đã có
  CheckCircleIcon, 
  BellIcon, 
  MailIcon, 
  MoreHorizontalIcon, // <-- Đã có
  InfoIcon 
} from "@/icons";

interface NotificationItemProps {
  item: NotificationItemData;
}

// BƯỚC 2: Tạo hàm helper để chọn icon bên trái
const getIconByTitle = (title: string) => {
  const props = { className: "w-5 h-5 opacity-80" };
  if (title.includes("Nhắc lịch")) return <ClockIcon {...props} />; // <-- Dùng ClockIcon
  if (title.includes("Thông báo")) return <CheckCircleIcon {...props} />;
  if (title.includes("Cập nhật")) return <BellIcon {...props} />;
  if (title.includes("Thư cảm ơn")) return <MailIcon {...props} />;
  return <InfoIcon {...props} />;
};

const NotificationItem = ({ item }: NotificationItemProps) => {
  return (
    <div className="relative flex w-full items-start gap-4 border-b border-gray-100 pb-5 pt-2 dark:border-gray-800">
      
      {/* 1. Icon bên trái */}
      <div
        className={clsx(
          "flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
        )}
      >
        {getIconByTitle(item.title)}
      </div>

      {/* 2. Nội dung text (Xóa item.titleIcon) */}
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-800 dark:text-white/90">
            {item.title}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {item.timestamp}
          </span>
        </div>
        <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
          {item.message}
        </p>
      </div>

      {/* 3. Tag "New" (Giữ nguyên) */}
      {item.isNew && (
        <div className="ml-auto flex-shrink-0 pl-2">
          <Badge variant="solid" color="primary" size="sm">
            New
          </Badge>
        </div>
      )}

      {/* 4. Icon bên phải */}
      <button className="ml-2 flex-shrink-0 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/5 dark:hover:text-gray-300">
        <MoreHorizontalIcon className="w-5 h-5" /> {/* <-- Dùng MoreHorizontalIcon */}
      </button>
    </div>
  );
};

export default NotificationItem;