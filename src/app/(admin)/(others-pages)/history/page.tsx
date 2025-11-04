// Frontend/app/(admin)/(others-pages)/history/page.tsx
"use client"; // <-- BƯỚC 1: Chuyển thành Client Component

import React, { useState, useEffect } from "react";
import DonationHistoryTable from "@/components/history/DonationHistoryTable";
import HistoryHeaderGraphic from "@/components/history/HistoryHeaderGraphic";
import { HistoryService } from "@/services/HistoryService"; // <-- BƯỚC 2: Import service
import { History } from "@/types/history"; // <-- BƯỚC 3: Import kiểu dữ liệu

export default function DonationHistoryPage() {
  // BƯỚC 4: Tạo state để lưu dữ liệu và trạng thái loading
  const [historyData, setHistoryData] = useState<History[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // BƯỚC 5: Fetch dữ liệu khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await HistoryService.getHistoryList();
      setHistoryData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <HistoryHeaderGraphic />

      <div className="px-4 md:px-6 2xl:px-10">
        <div className="mt-7.5">
          {/* BƯỚC 6: Truyền dữ liệu và trạng thái loading vào Bảng */}
          <DonationHistoryTable
            title="Lịch sử Hiến máu"
            data={historyData}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}