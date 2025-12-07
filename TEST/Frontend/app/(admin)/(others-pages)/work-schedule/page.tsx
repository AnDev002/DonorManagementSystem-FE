// src/app/(admin)/(others-pages)/work-schedule/page.tsx
import React from "react";
import WorkSchedule from "@/components/schedule/WorkSchedule"; // Đảm bảo bạn đã lưu component tối ưu ở bước trước vào đường dẫn này

export default function WorkSchedulePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <WorkSchedule />
    </div>
  );
}