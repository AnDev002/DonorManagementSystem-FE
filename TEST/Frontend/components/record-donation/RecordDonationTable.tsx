// src/components/record-donation/RecordDonationTable.tsx
import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { DonationRecord } from '@/types/donation';

interface RecordDonationTableProps {
  data: DonationRecord[];
  onView?: (record: DonationRecord) => void;
  onEdit?: (record: DonationRecord) => void;
  onDelete?: (record: DonationRecord) => void;
}

const BloodTypeBadge = ({ type }: { type: string }) => {
  const colors: Record<string, string> = {
    A: 'bg-blue-100 text-blue-800 border-blue-200',
    B: 'bg-green-100 text-green-800 border-green-200',
    AB: 'bg-purple-100 text-purple-800 border-purple-200',
    O: 'bg-red-100 text-red-800 border-red-200',
  };
  return (
    <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-bold border", colors[type] || 'bg-gray-100')}>
      {type}
    </span>
  );
};

export default function RecordDonationTable({ 
  data, 
  onView, 
  onEdit, 
  onDelete 
}: RecordDonationTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 dark:border-gray-700">
              <th className="p-4 text-xs font-semibold tracking-wider uppercase text-center w-16">No.</th>
              <th className="p-4 text-xs font-semibold tracking-wider uppercase">Donor Name</th>
              <th className="p-4 text-xs font-semibold tracking-wider uppercase">Date</th>
              <th className="p-4 text-xs font-semibold tracking-wider uppercase text-center">Volume</th>
              <th className="p-4 text-xs font-semibold tracking-wider uppercase text-center">Blood Type</th>
              <th className="p-4 text-xs font-semibold tracking-wider text-right uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id} className="group transition-colors">
                  <td className="p-4 text-sm font-medium text-center">{index + 1}</td>
                  <td className="p-4 text-sm font-bold text-gray-900 uppercase">{item.name}</td>
                  <td className="p-4 text-sm">{item.date}</td>
                  <td className="p-4 text-sm text-center">{item.volume}</td>
                  <td className="p-4 text-center">
                    <BloodTypeBadge type={item.bloodType} />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onView && (
                        <button onClick={() => onView(item)} className="p-2 hover:bg-blue-50 rounded-lg transition">
                          <Eye size={18} />
                        </button>
                      )}
                      {onEdit && (
                        <button onClick={() => onEdit(item)} className="p-2 hover:bg-green-50 rounded-lg transition">
                          <Pencil size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(item)} className="p-2 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}