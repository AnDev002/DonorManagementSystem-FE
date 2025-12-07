// src/components/history/DonationHistoryTable.tsx
import React from "react";
import { History } from "@/types/history";
import Link from "next/link";
import { DetailsButton } from "../ui/button/DetailsButton";
import clsx from "clsx";

interface Props {
  title: string;
  data: History[];
  isLoading: boolean;
  onCancelAppointment: (id: number | string) => void; // Prop mới để xử lý hủy
}

// Helper render Badge trạng thái
const StatusBadge = ({ status }: { status: string }) => {
  let label = status;
  let colorClass = "bg-gray-100 text-gray-600";

  switch (status) {
    case "Pending":
      label = "Chờ duyệt";
      colorClass = "bg-yellow-100 text-yellow-800 border border-yellow-200";
      break;
    case "Confirmed":
      label = "Đã duyệt - Hãy đến đúng giờ";
      colorClass = "bg-blue-100 text-blue-800 border border-blue-200";
      break;
    case "ReadyToDonate":
      label = "Đã khám sàng lọc";
      colorClass = "bg-purple-100 text-purple-800 border border-purple-200";
      break;
    case "Completed":
      label = "Hoàn thành";
      colorClass = "bg-green-100 text-green-800 border border-green-200";
      break;
    case "Cancelled":
      label = "Đã hủy";
      colorClass = "bg-red-100 text-red-800 border border-red-200";
      break;
    case "Rejected":
      label = "Bị từ chối";
      colorClass = "bg-red-100 text-red-800 border border-red-200";
      break;
  }

  return (
    <span className={clsx("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", colorClass)}>
      {label}
    </span>
  );
};

const DonationHistoryTable: React.FC<Props> = ({ title, data, isLoading, onCancelAppointment }) => {
  if (isLoading) {
    return <div className="w-full p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm border">Đang tải dữ liệu...</div>;
  }

  if (data.length === 0) {
    return <div className="w-full p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm border">Bạn chưa có lịch sử đăng ký nào.</div>;
  }

  return (
    <div className="w-full border rounded-lg border-gray-200 bg-white shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-left">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Mã Đợt</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Người Hiến</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Ngày Hẹn</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-center">Trạng Thái</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm font-medium text-gray-900">#{item.id}</td>
                <td className="p-4 text-sm font-medium text-gray-700">{item.donorName}</td>
                <td className="p-4 text-sm text-gray-600">
                    {/* Format ngày giờ hiển thị */}
                    {new Date(item.date).toLocaleDateString("vi-VN")} <br/>
                    <span className="text-xs text-gray-400">
                        {new Date(item.date).toLocaleTimeString("vi-VN", {hour: '2-digit', minute:'2-digit'})}
                    </span>
                </td>
                <td className="p-4 text-center">
                  <StatusBadge status={item.status} />
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {/* Nút Chi tiết */}
                    <DetailsButton href={`/history/${item.id}`} />
                    
                    {/* Nút Hủy: Chỉ hiện khi trạng thái là Pending hoặc Confirmed */}
                    {(item.status === 'Pending' || item.status === 'Confirmed') && (
                        <button 
                            onClick={() => onCancelAppointment(item.id)}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                        >
                            Hủy lịch
                        </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationHistoryTable;