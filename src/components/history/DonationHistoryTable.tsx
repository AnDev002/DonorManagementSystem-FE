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
      label = "Pending Approval";
      break;
    case "Confirmed":
      label = "Confirmed - Please arrive on time";
      break;
    case "ReadyToDonate":
      label = "Screening Passed";
      break;
    case "Completed":
      label = "Completed";
      break;
    case "Cancelled":
      label = "Cancelled";
      break;
    case "Rejected":
      label = "Rejected";
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
    return <div className="w-full p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm border">Loading data...</div>;
  }

  if (data.length === 0) {
    return <div className="w-full p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm border">You have no donation history.</div>;
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
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Donor</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-center">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
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
                            Cancel appointment
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