// src/components/notification/NotificationList.tsx
import { notificationItems } from "@/lib/data/notificationData";
import NotificationItem from "./NotificationItem";

/**
 * ĐÃ CẬP NHẬT:
 * - Style đồng bộ với các thẻ form của trang Donation (rounded-xl, shadow-lg, padding)
 * - Xóa style border và dark mode CỦA CONTAINER,
 * vì NotificationItem bên trong đã tự xử lý dark mode.
 */
const NotificationList = () => {
  return (
    <div
      className="w-full rounded-xl bg-white p-6 shadow-lg md:p-8"
    >
      {/* Giảm khoảng cách gap một chút */}
      <div className="flex flex-col gap-5">
        {notificationItems.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;