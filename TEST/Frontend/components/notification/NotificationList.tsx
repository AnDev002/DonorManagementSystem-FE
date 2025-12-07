// src/components/notification/NotificationList.tsx
"use client";

import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { NotificationService, Notification } from "@/services/NotificationService";
import { BellIcon } from "@/icons";

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Hàm load dữ liệu
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await NotificationService.getMyNotifications();
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (error) {
      console.error("Failed to load notifications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Hàm xử lý khi đọc
  const handleRead = async (id: number) => {
    try {
      // Cập nhật UI ngay lập tức (Optimistic update)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      // Gọi API background
      await NotificationService.markAsRead(id);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="w-full rounded-xl bg-white p-8 shadow-lg text-center text-gray-500">
        Đang tải thông báo...
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="w-full rounded-xl bg-white p-12 shadow-lg flex flex-col items-center justify-center text-gray-400 gap-4">
        <div className="p-4 bg-gray-50 rounded-full">
          <BellIcon className="w-10 h-10 opacity-50" />
        </div>
        <p>Bạn chưa có thông báo nào.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex flex-col gap-2">
        {notifications.map((item) => (
          <NotificationItem 
            key={item.id} 
            item={item} 
            onRead={handleRead}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;