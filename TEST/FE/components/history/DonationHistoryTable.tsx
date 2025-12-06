// Frontend/components/history/DonationHistoryTable.tsx
import React from "react";
import { History } from "@/types/history"; // Import kiểu dữ liệu
import { Badge } from "@/components/ui/badge/Badge";
import Link from "next/link";
import DetailsButton from "../ui/button/DetailsButton";

// BƯỚC 1: Định nghĩa props cho component
interface Props {
  title: string;
  data: History[];
  isLoading: boolean;
}

const DonationHistoryTable: React.FC<Props> = ({ title, data, isLoading }) => {
  // BƯỚC 2: Xử lý trạng thái loading
  if (isLoading) {
    return (
      <div className="w-full p-4 text-center border rounded-lg border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        Đang tải dữ liệu...
      </div>
    );
  }

  // BƯỚC 3: Xử lý khi không có dữ liệu
  if (data.length === 0) {
    return (
      <div className="w-full p-4 text-center border rounded-lg border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        Không tìm thấy lịch sử hiến máu.
      </div>
    );
  }

  // BƯỚC 4: Render dữ liệu
  return (
    <div className="w-full border rounded-lg border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-4 border-b border-stroke dark:border-strokedark md:px-6 xl:px-7.5">
        <h2 className="font-semibold text-gray-800 text-title-sm dark:text-white">
          {title}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stroke dark:border-strokedark">
              <th className="p-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400 xl:p-5">
                Mã Đợt
              </th>
              <th className="p-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400 xl:p-5">
                Người Hiến
              </th>
              <th className="p-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400 xl:p-5">
                Ngày Hiến
              </th>
              <th className="p-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400 xl:p-5">
                Trạng Thái
              </th>
              <th className="p-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400 xl:p-5">
                Chi Tiết
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="p-4 xl:p-5">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {item.id}
                  </p>
                </td>
                <td className="p-4 xl:p-5">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {item.donorName}
                  </p>
                </td>
                <td className="p-4 xl:p-5">
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {item.date}
                  </p>
                </td>
                <td className="p-4 xl:p-5">
                  <Badge color={item.status === "Completed" ? "success" : "warning"}>
                    {item.status}
                  </Badge>
                </td>
                <td className="p-4 xl:p-5">
                  <DetailsButton href={`/history/${item.id}`} />
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