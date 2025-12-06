// src/components/admin/blood-inventory/BloodTypeDetailModal.tsx
"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { 
  Droplet, 
  Search, 
  Thermometer, 
  Activity, 
  AlertCircle, 
  MapPin, 
  Pencil, 
  Trash2,
  Filter
} from "lucide-react";
import clsx from "clsx";

// --- TYPES ---
export interface BloodUnitDetail {
  id: string;
  rhType: string; // <-- THÊM TRƯỜNG NÀY
  volume: number;
  component: string;
  collectionDate: string;
  expiryDate: string;
  storageLocation: string;
  status: "Available" | "About to expire" | "Expired";
}

interface BloodTypeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  bloodType: string;
  data: BloodUnitDetail[];
  onEditUnit?: (unit: BloodUnitDetail) => void;
  onDeleteUnit?: (unit: BloodUnitDetail) => void;
}

// --- SUB-COMPONENTS ---

const MetricCard = ({ label, value, icon: Icon, colorClass }: { label: string, value: string, icon: any, colorClass: string }) => (
  <div className="flex flex-1 items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-800">{value}</p>
    </div>
    <div className={clsx("flex h-10 w-10 items-center justify-center rounded-full", colorClass)}>
      <Icon size={20} />
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: BloodUnitDetail["status"] }) => {
  const styles = {
    "Available": "bg-green-100 text-green-700 border-green-200",
    "About to expire": "bg-red-100 text-red-700 border-red-200",
    "Expired": "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span className={clsx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", styles[status])}>
      {status}
    </span>
  );
};

// Component Select Filter nhỏ gọn
const FilterSelect = ({ placeholder, options }: { placeholder: string, options: string[] }) => (
  <div className="relative">
    <select className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm outline-none hover:border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 pr-8 cursor-pointer">
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {/* Mũi tên custom */}
    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-1 text-gray-400">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const BloodTypeDetailModal: React.FC<BloodTypeDetailModalProps> = ({
  isOpen,
  onClose,
  bloodType,
  data,
  onEditUnit,
  onDeleteUnit,
}) => {
  const totalVolume = data.reduce((acc, item) => acc + item.volume, 0);
  const expiringCount = data.filter(i => i.status === "About to expire").length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1200px] p-0 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B41919] to-[#D81818] px-8 py-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Droplet className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Inventory Details</h2>
              <p className="text-white/80 text-sm">Managing list for {bloodType}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition">
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-6 bg-gray-50 p-6 md:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
        
        {/* Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <MetricCard label="Blood Type" value={bloodType} icon={Activity} colorClass="bg-blue-50 text-blue-600" />
          <MetricCard label="Total Units" value={data.length.toString()} icon={Droplet} colorClass="bg-red-50 text-red-600" />
          <MetricCard label="Total Volume" value={`${totalVolume} ml`} icon={Thermometer} colorClass="bg-orange-50 text-orange-600" />
          <MetricCard label="Expiring Soon" value={expiringCount.toString()} icon={AlertCircle} colorClass="bg-yellow-50 text-yellow-600" />
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-[350px]">
            <input
              type="text"
              placeholder="Search by Unit ID or Location..."
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm shadow-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-2 flex-1 lg:justify-end">
             <div className="flex items-center text-gray-500 text-sm font-medium mr-1">
                <Filter size={16} className="mr-1" /> Filter:
             </div>
             <div className="w-28">
                <FilterSelect placeholder="Rh Type" options={["Positive (+)", "Negative (-)"]} />
             </div>
             <div className="w-28">
                <FilterSelect placeholder="Volume" options={["250 ml", "350 ml", "450 ml"]} />
             </div>
             <div className="w-40">
                <FilterSelect placeholder="Component" options={["Red blood cells", "Platelets", "Plasma"]} />
             </div>
             <div className="w-32">
                <FilterSelect placeholder="Status" options={["Available", "About to expire", "Expired"]} />
             </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Unit ID</th>
                  {/* CỘT RH-TYPE MỚI */}
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Rh Type</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Component & Vol</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Dates</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Location</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((unit) => (
                  <tr key={unit.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">#{unit.id}</span>
                    </td>
                    {/* DATA CỘT RH-TYPE */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-700">{unit.rhType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{unit.component}</p>
                      <p className="text-xs text-gray-500">{unit.volume} ml</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-14 font-medium text-gray-400">Collected:</span> {unit.collectionDate}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-14 font-medium text-gray-400">Expires:</span> 
                          <span className={unit.status === "About to expire" ? "text-red-600 font-bold" : ""}>
                            {unit.expiryDate}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-sm">{unit.storageLocation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={unit.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => onEditUnit?.(unit)}
                          className="flex items-center gap-1 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition"
                          title="Edit"
                        >
                          <Pencil size={14} />
                          <span>Sửa</span>
                        </button>
                        <button 
                          onClick={() => onDeleteUnit?.(unit)}
                          className="flex items-center gap-1 rounded-lg border border-red-100 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 hover:text-red-700 transition"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
             <p className="text-sm text-gray-500">Showing 1-{data.length} of {data.length}</p>
             <div className="flex gap-2">
               <Button size="sm" variant="outline" className="h-8 py-0 px-3" disabled>Prev</Button>
               <Button size="sm" variant="outline" className="h-8 py-0 px-3">Next</Button>
             </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BloodTypeDetailModal;