// src/app/(admin)/(others-pages)/history/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import DonationHistoryTable from "@/components/history/DonationHistoryTable";
import HistoryHeaderGraphic from "@/components/history/HistoryHeaderGraphic";
import { AppointmentService, AppointmentHistoryItem } from "@/services/AppointmentService"; 
import { History } from "@/types/history"; 

export default function DonationHistoryPage() {
  const [historyData, setHistoryData] = useState<History[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm fetch dữ liệu
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Gọi API lấy lịch sử
      const data: AppointmentHistoryItem[] = await AppointmentService.getMyHistory();
      
      // Map dữ liệu từ Backend format sang Frontend UI format
      const mappedData: History[] = data.map((item) => ({
        id: item.id,
        donorName: item.name || item.user?.name || "Bạn", 
        date: item.appointmentDate, 
        status: item.status, // TypeScript sẽ tự khớp vì ta đã update interface History
      }));

      setHistoryData(mappedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xử lý hủy lịch
  const handleCancel = async (id: number | string) => {
    const isConfirmed = confirm("Are you sure you want to cancel this appointment?");
    if (!isConfirmed) return;

    try {
      await AppointmentService.cancelAppointment(id);
      alert("Appointment cancelled successfully.");
      fetchData();
    } catch (error) {
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-4 md:px-6 2xl:px-10 py-4">
         <h1 className="text-2xl font-bold text-red-600">My History</h1>
         <HistoryHeaderGraphic />
      </div>

      <div className="px-4 md:px-6 2xl:px-10">
        <div className="mt-7.5">
          <DonationHistoryTable
            title="Registration List"
            data={historyData}
            isLoading={isLoading}
            onCancelAppointment={handleCancel} // Truyền hàm hủy xuống
          />
        </div>
      </div>
    </div>
  );
}