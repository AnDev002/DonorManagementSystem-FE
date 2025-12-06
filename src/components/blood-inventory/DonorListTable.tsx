import React from 'react';
import clsx from 'clsx';
import { Donor, BloodType } from '@/types/index';
// Sử dụng Lucide Icons cho thống nhất với UserTable
import { Eye, Check, X } from 'lucide-react'; 

// Mock data (Giữ nguyên như cũ)
const MOCK_DONORS: Donor[] = [
  { id: 1, code: "DON-001", name: "Nguyen Van A", address: "Ha Noi", age: 26, bloodType: "AB" },
  { id: 2, code: "DON-002", name: "Nguyen Van B", address: "Ha Noi", age: 40, bloodType: "A" },
  // ... (các dữ liệu khác)
];

interface DonorListTableProps {
  data?: Donor[];
  onAddClick?: () => void;
  onDetailClick?: (donor: Donor) => void;
  onAccept?: (donor: Donor) => void; // Thêm prop Accept
  onReject?: (donor: Donor) => void; // Thêm prop Reject
}

const BloodTypeBadge = ({ type }: { type: BloodType }) => {
  const colors = {
    A: 'bg-blue-100 text-blue-800',
    B: 'bg-green-100 text-green-800',
    AB: 'bg-purple-100 text-purple-800',
    O: 'bg-red-100 text-red-800',
  };
  return (
    <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-medium border border-opacity-20", colors[type])}>
      {type}
    </span>
  );
};

export default function DonorListTable({ 
  data = MOCK_DONORS, 
  onAddClick, 
  onDetailClick,
  onAccept,
  onReject
}: DonorListTableProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-red-600 font-open-sans">
             Register Confirmation
          </h2>
          <p className="text-sm text-gray-500 mt-1">Review and approve donor registrations</p>
        </div>
        
        {/* Nút Add có thể không cần thiết ở trang Confirmation, nhưng tôi vẫn giữ nếu bạn muốn dùng lại component */}
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="inline-flex items-center justify-center px-6 py-2.5 border border-red-600 text-sm font-semibold text-red-600 bg-white hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            + Add New
          </button>
        )}
      </div>

      {/* Table Section */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-xs font-semibold tracking-wider text-gray-500 uppercase text-center w-16">
                  No.
                </th>
                <th className="p-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Donor Name
                </th>
                 <th className="p-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Code
                </th>
                <th className="p-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Address
                </th>
                <th className="p-4 text-xs font-semibold tracking-wider text-gray-500 uppercase text-center">
                  Age
                </th>
                <th className="p-4 text-xs font-semibold tracking-wider text-gray-500 uppercase text-center">
                  Blood
                </th>
                <th className="p-4 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className="group hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="p-4 text-sm font-medium text-gray-500 text-center">
                    {index + 1}.
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                   <td className="p-4 text-sm text-gray-500 font-mono">
                    {item.code}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {item.address}
                  </td>
                  <td className="p-4 text-sm text-gray-600 text-center">
                    {item.age}
                  </td>
                  <td className="p-4 text-center">
                    <BloodTypeBadge type={item.bloodType} />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Nút View Detail */}
                      <button 
                        onClick={() => onDetailClick?.(item)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Nút Accept */}
                      <button 
                        onClick={() => onAccept?.(item)}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
                        title="Accept Registration"
                      >
                        <Check size={18} />
                      </button>

                      {/* Nút Reject */}
                      <button 
                        onClick={() => onReject?.(item)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                        title="Reject Registration"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}