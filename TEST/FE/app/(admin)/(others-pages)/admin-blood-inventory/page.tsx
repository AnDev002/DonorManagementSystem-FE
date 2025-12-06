// src/app/(admin)/(others-pages)/admin-blood-inventory/page.tsx
"use client";

import React, { useState } from "react";
import AppSidebar from "@/components/admin/layout/AppSidebar";
import AppHeader from "@/components/admin/layout/AppHeader";
import { ChevronDown, Pencil, Trash2 } from "lucide-react"; 
import Checkbox from "@/components/form/input/Checkbox"; 
// BƯỚC 1: Import Modal và Type mới
import BloodTypeDetailModal, { BloodUnitDetail } from "@/components/admin/blood-inventory/BloodTypeDetailModal";

// --- TYPES & DATA ---

interface InventoryBatch {
  id: string;
  collectionDate: string;
  expiryDate: string;
  exportQty: number;
  quantity: number;
}

interface BloodTypeGroup {
  type: string;
  batches: InventoryBatch[];
}

const INVENTORY_DATA: BloodTypeGroup[] = [
  {
    type: "TYPE A",
    batches: [
      { id: "1", collectionDate: "18/03/2025 - 06/04/2025", expiryDate: "21/04/2025 - 08/05/2025", exportQty: 15, quantity: 45 },
    ],
  },
  {
    type: "TYPE B",
    batches: [
      { id: "3", collectionDate: "10/03/2025 - 01/04/2025", expiryDate: "20/04/2025 - 22/05/2025", exportQty: 5, quantity: 48 },
    ],
  },
  // ... (giữ nguyên các data khác)
  {
    type: "TYPE O",
    batches: [{ id: "5", collectionDate: "...", expiryDate: "...", exportQty: 8, quantity: 30 }],
  },
  {
    type: "TYPE AB",
    batches: [{ id: "6", collectionDate: "...", expiryDate: "...", exportQty: 2, quantity: 15 }],
  },
];

// BƯỚC 2: Mock data chi tiết cho Modal (Thực tế sẽ fetch API dựa trên type)
const MOCK_DETAIL_DATA: BloodUnitDetail[] = [
  { id: "A001", volume: 250, component: "Red blood cells", collectionDate: "20/03/2025", expiryDate: "01/05/2025", storageLocation: "Cabinet 1 - A", status: "Available" },
  { id: "A002", volume: 250, component: "Red blood cells", collectionDate: "18/03/2025", expiryDate: "28/04/2025", storageLocation: "Cabinet 3 - A", status: "Available" },
  { id: "A003", volume: 450, component: "Red blood cells", collectionDate: "28/03/2025", expiryDate: "08/05/2025", storageLocation: "Cabinet 3 - D", status: "Available" },
  { id: "A004", volume: 200, component: "Platelets", collectionDate: "06/04/2025", expiryDate: "21/04/2025", storageLocation: "Cabinet 2 - E", status: "About to expire" },
];

// ... (ActionButtons, FilterDropdown components giữ nguyên)
const ActionButtons = ({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) => (
  <div className="flex items-center gap-2 justify-center">
    <button onClick={onEdit} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Pencil size={16} /></button>
    <button onClick={onDelete} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
  </div>
);

const FilterDropdown = ({ label }: { label: string }) => (
  <button className="flex h-11 min-w-[140px] items-center justify-between rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#D81818] hover:text-[#D81818]">
    <span>{label}</span>
    <ChevronDown size={18} className="text-gray-400" />
  </button>
);

export default function AdminBloodInventoryPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // BƯỚC 3: State cho Modal
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState<string>("");

  const allIds = INVENTORY_DATA.flatMap(group => group.batches.map(b => b.id));

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) setSelectedIds(prev => [...prev, id]);
    else setSelectedIds(prev => prev.filter(item => item !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(allIds);
    else setSelectedIds([]);
  };

  // BƯỚC 4: Hàm mở Modal
  const handleViewDetails = (type: string) => {
    setSelectedBloodType(type);
    setIsDetailModalOpen(true);
  };

  const isAllSelected = allIds.length > 0 && selectedIds.length === allIds.length;

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-inter">
      <AppSidebar />

      <div className="flex flex-1 flex-col lg:ml-[290px]">
        <AppHeader />

        <main className="flex-1 p-6 md:p-10">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-[32px] font-bold leading-none text-[#CF2222]">
                Blood inventory list
              </h2>
              {selectedIds.length > 0 && (
                <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-red-700 transition">
                  <Trash2 size={16} />
                  Delete ({selectedIds.length})
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
               <FilterDropdown label="Type" />
               <FilterDropdown label="Date" />
               <FilterDropdown label="Status" />
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-[10px] bg-white shadow-[5px_4px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between bg-[#D81818]/75 px-6 py-5 text-white md:px-10">
              <div className="w-12 flex justify-center">
                <Checkbox 
                  checked={isAllSelected} 
                  onChange={handleSelectAll} 
                  className="border-white checked:bg-red-800"
                />
              </div>
              <div className="w-1/6 text-xl font-bold">Type</div>
              <div className="w-1/6 text-center text-xl font-bold">Collection</div>
              <div className="w-1/6 text-center text-xl font-bold">Expiry</div>
              <div className="w-1/6 text-center text-xl font-bold">Export</div>
              <div className="w-1/6 text-center text-xl font-bold">Inventory</div>
              <div className="w-[100px] text-center text-xl font-bold">Action</div>
            </div>

            <div className="flex flex-col p-6 md:p-10 gap-8">
              {INVENTORY_DATA.map((group, groupIndex) => (
                <div key={groupIndex} className="flex flex-col border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  {group.batches.map((batch, batchIndex) => (
                    <div key={batch.id} className="flex flex-col items-center py-4 md:flex-row hover:bg-gray-50 rounded-lg transition">
                      
                      <div className="mb-2 w-full md:mb-0 md:w-12 flex justify-center">
                        <Checkbox 
                          checked={selectedIds.includes(batch.id)} 
                          onChange={(checked) => handleSelectOne(batch.id, checked)}
                        />
                      </div>

                      <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 md:text-left pl-2">
                        {batchIndex === 0 && (
                          <span className="text-2xl font-semibold text-[#233454] block mb-2">
                            {group.type}
                          </span>
                        )}
                        {/* BƯỚC 5: Gắn sự kiện mở Modal */}
                        <button 
                          onClick={() => handleViewDetails(group.type)}
                          className="rounded-[18px] bg-[#FF8585] px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-[#ff6b6b] transition-colors"
                        >
                          View Details
                        </button>
                      </div>

                      <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 text-xl text-[#233454]">
                        {batch.collectionDate}
                      </div>
                      <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 text-xl font-bold text-[#FF4A4A]">
                        {batch.expiryDate}
                      </div>
                      <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 text-2xl font-bold text-[#233454]">
                        {batch.exportQty}
                      </div>
                      <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 text-2xl font-bold text-[#233454]">
                        {batch.quantity}
                      </div>
                      <div className="w-full flex justify-center md:w-[100px]">
                        <ActionButtons />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* BƯỚC 6: Render Modal */}
      <BloodTypeDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        bloodType={selectedBloodType}
        data={MOCK_DETAIL_DATA} // Trong thực tế, filter data theo selectedBloodType
      />
    </div>
  );
}