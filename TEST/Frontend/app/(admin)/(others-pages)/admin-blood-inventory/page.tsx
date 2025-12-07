"use client";

import React, { useState, useEffect, useMemo } from "react";
// ... imports cũ giữ nguyên
import AppSidebar from "@/components/admin/layout/AppSidebar";
import AppHeader from "@/components/admin/layout/AppHeader";
import { ChevronDown, Pencil, Trash2, Plus } from "lucide-react"; 
import Checkbox from "@/components/form/input/Checkbox"; 
import BloodTypeDetailModal from "@/components/admin/blood-inventory/BloodTypeDetailModal";
import BloodInventoryFormModal from "@/components/admin/blood-inventory/BloodInventoryFormModal";
import BloodTypeEditModal from "@/components/admin/blood-inventory/BloodTypeEditModal";
import { InventoryService } from "@/services/InventoryService";

// Sub-component ActionButtons giữ nguyên
const ActionButtons = ({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) => (
  <div className="flex items-center gap-2 justify-center">
    <button onClick={onEdit} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Pencil size={16} /></button>
    <button onClick={onDelete} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
  </div>
);

// Component Filter Select Mới cho Trang chủ
const FilterSelect = ({ label, options, value, onChange }: any) => (
  <div className="relative">
    <select
      className="flex h-11 min-w-[140px] items-center justify-between rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#D81818] outline-none appearance-none cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All {label}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default function AdminBloodInventoryPage() {
  // ... state cũ
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState<string>("");
  const [targetType, setTargetType] = useState("");
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- STATE FILTER MỚI ---
  const [filterType, setFilterType] = useState("");

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await InventoryService.getSummary();
      setInventoryData(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Error:", error);
      setInventoryData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // --- LOGIC FILTER ---
  const filteredInventory = useMemo(() => {
    if (!filterType) return inventoryData;
    return inventoryData.filter(item => item.type.includes(filterType)); // Lọc theo chuỗi (VD: "TYPE A" chứa "A")
  }, [inventoryData, filterType]);

  // ... (Các hàm handle giữ nguyên) ...
  const handleViewDetails = (type: string) => {
    setSelectedBloodType(type);
    setIsDetailModalOpen(true);
  };
  const handleCreateNew = () => setIsCreateModalOpen(true);
  const handleEditType = (type: string) => {
    setTargetType(type);
    setIsEditModalOpen(true);
  };
  const handleDeleteType = async (type: string) => {
    if (confirm(`Delete group ${type}?`)) {
      await InventoryService.deleteType(type);
      fetchInventory();
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-inter">
      <AppSidebar />
      <div className="flex flex-1 flex-col lg:ml-[290px]">
        <AppHeader />
        <main className="flex-1 p-6 md:p-10">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <h2 className="text-[32px] font-bold leading-none text-[#CF2222]">
              Blood inventory list
            </h2>
            <div className="flex flex-wrap gap-3">
               <button 
                 onClick={handleCreateNew}
                 className="flex items-center gap-2 rounded-xl bg-[#CF2222] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-red-700 transition"
               >
                 <Plus size={18} /> Add New Blood Group
               </button>
               
               {/* --- FILTER ĐÃ KÍCH HOẠT --- */}
               <FilterSelect 
                 label="Type" 
                 options={["A", "B", "AB", "O"]} 
                 value={filterType}
                 onChange={setFilterType}
               />
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-[10px] bg-white shadow-md">
            {/* Header Table */}
            <div className="flex items-center justify-between bg-[#D81818]/75 px-6 py-5 text-white md:px-10">
              <div className="w-12 flex justify-center"><Checkbox checked={false} onChange={()=>{}} className="border-white checked:bg-red-800" /></div>
              <div className="w-1/6 text-xl font-bold">Type</div>
              <div className="w-1/6 text-center text-xl font-bold">Total Units</div>
              <div className="w-1/6 text-center text-xl font-bold">Available</div>
              <div className="w-1/6 text-center text-xl font-bold">Expiring</div>
              <div className="w-1/6 text-center text-xl font-bold">Expired</div>
              <div className="w-[100px] text-center text-xl font-bold">Action</div>
            </div>

            {/* Body Table - Render filteredInventory */}
            <div className="flex flex-col p-6 md:p-10 gap-8">
              {loading ? <p className="text-center py-4">Loading...</p> : filteredInventory.map((group, idx) => (
                <div key={idx} className="flex flex-col border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex flex-col items-center py-4 md:flex-row hover:bg-gray-50 rounded-lg transition">
                    {/* ... (Nội dung row giữ nguyên) ... */}
                    <div className="mb-2 w-full md:mb-0 md:w-12 flex justify-center">
                      <Checkbox checked={false} onChange={()=>{}} />
                    </div>
                    <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 md:text-left pl-2">
                        <span className="text-2xl font-semibold text-[#233454] block mb-2">{group.type}</span>
                        <button 
                          onClick={() => handleViewDetails(group.type)}
                          className="rounded-[18px] bg-[#FF8585] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#ff6b6b]"
                        >
                          View Details
                        </button>
                    </div>
                    <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 text-2xl font-bold text-[#233454]">{group.totalQuantity}</div>
                    <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 text-2xl font-bold text-green-600">{group.available}</div>
                    <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 text-2xl font-bold text-yellow-600">{group.expiringSoon}</div>
                    <div className="mb-2 w-full text-center md:mb-0 md:w-1/6 text-2xl font-bold text-red-600">{group.expired}</div>
                    
                    <div className="w-full flex justify-center md:w-[100px]">
                      <ActionButtons 
                        onEdit={() => handleEditType(group.type)}
                        onDelete={() => handleDeleteType(group.type)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Các Modal */}
      <BloodInventoryFormModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={fetchInventory} />
      
      {isDetailModalOpen && (
        <BloodTypeDetailModal 
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          bloodType={selectedBloodType}
        />
      )}

      {isEditModalOpen && (
        <BloodTypeEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          currentType={targetType}
          onSuccess={fetchInventory}
        />
      )}
    </div>
  );
}