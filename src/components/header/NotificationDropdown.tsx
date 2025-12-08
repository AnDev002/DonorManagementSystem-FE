// src/components/header/NotificationDropdown.tsx
"use client";
import React, { useState, useEffect } from "react";
// ... imports cũ giữ nguyên
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { NotificationService, Notification } from "@/services/NotificationService";
import { 
  BellIcon, 
  CheckCircleIcon, 
  AlertIcon, 
  InfoIcon, 
  ClockIcon 
} from "@/icons";
import clsx from "clsx";

// Helper chọn icon
const getIcon = (type: string) => {
  const className = "w-6 h-6";
  switch (type) {
    case 'SUCCESS': return <CheckCircleIcon className={clsx(className, "text-green-500")} />;
    case 'WARNING': return <AlertIcon className={clsx(className, "text-yellow-500")} />;
    case 'ERROR': return <AlertIcon className={clsx(className, "text-red-500")} />;
    default: return <InfoIcon className={clsx(className, "text-blue-500")} />;
  }
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const data = await NotificationService.getMyNotifications();
      if (Array.isArray(data)) {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.isRead).length);
      }
    } catch (error) {
      console.error("Failed to fetch notifications");
    }
  };

  // Fetch khi mount và polling mỗi 30s
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) fetchNotifications(); // Refresh khi mở
  };

  const handleRead = async (id: number) => {
    try {
        // Optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
        
        await NotificationService.markAsRead(id);
    } catch (e) {
        console.error(e);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="relative flex items-center justify-center w-10 h-10 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:text-white"
      >
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-red-400"></span>
            <span className="relative inline-flex w-3 h-3 rounded-full bg-red-500"></span>
          </span>
        )}
        <BellIcon className="w-5 h-5" />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute right-0 mt-2 w-80 sm:w-96 flex flex-col rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
        </div>

        <div className="flex flex-col max-h-[400px] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
                No notifications.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => !item.isRead && handleRead(item.id)}
                className={clsx(
                    "flex gap-4 p-4 border-b border-gray-50 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/5 cursor-pointer transition-colors",
                    !item.isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : "bg-white dark:bg-transparent"
                )}
              >
                <div className="flex-shrink-0 mt-1">
                    {getIcon(item.type)}
                </div>
                <div className="flex-1">
                    <p className={clsx("text-sm font-medium", !item.isRead ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400")}>
                        {item.title}
                    </p>
                    <p 
                        className="text-xs text-gray-500 mt-1 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.message }}
                    />
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleString('en-GB')}
                    </p>
                </div>
                {!item.isRead && (
                    <div className="flex-shrink-0 self-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                )}
              </div>
            ))
          )}
        </div>
      </Dropdown>
    </div>
  );
}