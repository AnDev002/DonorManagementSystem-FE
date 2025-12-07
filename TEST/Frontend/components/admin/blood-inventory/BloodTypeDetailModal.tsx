"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import { InventoryService } from "@/services/InventoryService";
import { 
  Droplet, Search, Thermometer, Activity, AlertCircle, MapPin, Pencil, Trash2, Filter, ArrowLeft,
  Plus
} from "lucide-react";
import clsx from "clsx";

interface BloodTypeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  bloodType: string;
}

// --- Helper Components ---
const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    "Available": "bg-green-100 text-green-700 border-green-200",
    "About to expire": "bg-red-100 text-red-700 border-red-200",
    "Expired": "bg-gray-100 text-gray-600 border-gray-200",
  };
  return (
    <span className={clsx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", styles[status] || styles["Available"])}>
      {status}
    </span>
  );
};

const MetricCard = ({ label, value, icon: Icon, colorClass }: any) => (
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

// Component FilterSelect
const FilterSelect = ({ 
  placeholder, 
  options, 
  value, 
  onChange 
}: { 
  placeholder: string, 
  options: { label: string, value: string | number }[], 
  value: string | number, 
  onChange: (val: string) => void 
}) => (
  <div className="relative">
    <select 
      className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm outline-none hover:border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 pr-8 cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-1 text-gray-400">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
    </div>
  </div>
);

export default function BloodTypeDetailModal({ isOpen, onClose, bloodType }: BloodTypeDetailModalProps) {
  const [unitData, setUnitData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // View State
  const [view, setView] = useState<"list" | "form">("list");
  const [editingUnit, setEditingUnit] = useState<any>(null);

  // Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ rhType: "", volume: "", status: "" });

  // Form State
  const [formData, setFormData] = useState({
    volume: 250,
    rhType: "+",
    collectionDate: "",
    expiryDate: "",
    storageLocation: "",
    appointmentId: 0 // Dùng làm placeholder, sẽ xóa khi update
  });

  // Fetch dữ liệu
  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await InventoryService.getDetailByType(bloodType);
      setUnitData(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Failed to load details", error);
      setUnitData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && bloodType) {
      fetchDetail();
      setView("list");
      setFilters({ rhType: "", volume: "", status: "" });
      setSearchTerm("");
    }
  }, [isOpen, bloodType]);

  // Logic lọc dữ liệu
  const filteredData = useMemo(() => {
    return unitData.filter(unit => {
      const matchSearch = unit.id.toString().includes(searchTerm) || unit.storageLocation?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRh = filters.rhType ? unit.rhType === filters.rhType : true;
      const matchVolume = filters.volume ? unit.volume === Number(filters.volume) : true;
      const matchStatus = filters.status ? unit.status === filters.status : true;
      return matchSearch && matchRh && matchVolume && matchStatus;
    });
  }, [unitData, searchTerm, filters]);

  // Handle Input Change (Dùng prev state để đảm bảo cập nhật đúng)
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Switch to Create Mode
  const handleCreate = () => {
    setEditingUnit(null);
    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + 35);

    setFormData({
      volume: 250,
      rhType: "+",
      collectionDate: today.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      storageLocation: "Kho A",
      appointmentId: 0
    });
    setView("form");
  };

  // Switch to Edit Mode
  const handleEdit = (unit: any) => {
    setEditingUnit(unit);
    setFormData({
      volume: unit.volume,
      rhType: unit.rhType,
      collectionDate: unit.collectionDate, // Đảm bảo format YYYY-MM-DD từ API
      expiryDate: unit.expiryDate,
      storageLocation: unit.storageLocation || "",
      appointmentId: 0 // Reset appointmentId để không gửi lên khi update
    });
    setView("form");
  };

  // Handle Delete
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this unit?")) {
      try {
        await InventoryService.delete(id);
        fetchDetail();
      } catch (error) {
        alert("Failed to delete unit");
      }
    }
  };

  // Handle Save (Create / Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const cleanType = bloodType.replace("TYPE ", "").trim();
      
      // Clone formData để xử lý payload
      const payload: any = {
        ...formData,
        bloodType: cleanType,
        volume: Number(formData.volume),
        // Chuyển đổi Date sang ISO string chuẩn cho Backend
        collectionDate: new Date(formData.collectionDate).toISOString(),
        expiryDate: new Date(formData.expiryDate).toISOString(),
      };

      // QUAN TRỌNG: Xóa appointmentId nếu là Update hoặc nếu nó = 0
      if (editingUnit || payload.appointmentId === 0) {
        delete payload.appointmentId;
      }

      console.log("Submitting payload:", payload); // Debug xem dữ liệu đúng chưa

      if (editingUnit) {
        await InventoryService.update(editingUnit.id, payload);
        alert("Cập nhật thành công!");
      } else {
        await InventoryService.create(payload);
        alert("Thêm mới thành công!");
      }
      
      setView("list");
      fetchDetail(); 
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  // Metrics Calculation
  const totalVolume = unitData.reduce((acc, item) => acc + item.volume, 0);
  const expiringCount = unitData.filter(i => i.status === "About to expire").length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1200px] p-0 overflow-hidden">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#B41919] to-[#D81818] px-8 py-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Droplet className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {view === "list" ? "Inventory Details" : (editingUnit ? "Edit Unit" : "Add New Unit")}
              </h2>
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

      {/* BODY */}
      <div className="bg-gray-50 p-6 md:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
        
        {/* VIEW 1: LIST */}
        {view === "list" && (
          <div className="flex flex-col gap-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <MetricCard label="Blood Type" value={bloodType} icon={Activity} colorClass="bg-blue-50 text-blue-600" />
              <MetricCard label="Total Units" value={unitData.length.toString()} icon={Droplet} colorClass="bg-red-50 text-red-600" />
              <MetricCard label="Total Volume" value={`${totalVolume} ml`} icon={Thermometer} colorClass="bg-orange-50 text-orange-600" />
              <MetricCard label="Expiring Soon" value={expiringCount.toString()} icon={AlertCircle} colorClass="bg-yellow-50 text-yellow-600" />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:w-[350px]">
                <input 
                  type="text" 
                  placeholder="Search by Unit ID or Location..." 
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm shadow-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="flex flex-wrap items-center gap-2 flex-1 lg:justify-end">
                 <div className="flex items-center text-gray-500 text-sm font-medium mr-1"><Filter size={16} className="mr-1" /> Filter:</div>
                 <div className="w-32"><FilterSelect placeholder="Rh Type" options={[{label:"Positive (+)", value:"+"}, {label:"Negative (-)", value:"-"}]} value={filters.rhType} onChange={(v)=>setFilters({...filters, rhType: v})} /></div>
                 <div className="w-32"><FilterSelect placeholder="Volume" options={[{label:"250 ml", value:"250"}, {label:"350 ml", value:"350"}, {label:"450 ml", value:"450"}]} value={filters.volume} onChange={(v)=>setFilters({...filters, volume: v})} /></div>
                 <div className="w-40"><FilterSelect placeholder="Status" options={[{label:"Available", value:"Available"}, {label:"Expiring", value:"About to expire"}, {label:"Expired", value:"Expired"}]} value={filters.status} onChange={(v)=>setFilters({...filters, status: v})} /></div>
              </div>
              
              <Button onClick={handleCreate} className="bg-[#CF2222] hover:bg-red-700 text-white gap-2 h-10 px-4">
                <Plus size={18} /> Add Unit
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Unit ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Rh Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Component & Vol</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Dates</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr> : 
                     filteredData.length === 0 ? <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500">No matching units found.</td></tr> :
                     filteredData.map((unit) => (
                      <tr key={unit.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4"><span className="font-medium text-gray-900">#{unit.id}</span></td>
                        <td className="px-6 py-4"><span className="font-semibold text-gray-700">{unit.rhType}</span></td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{unit.component}</p>
                          <p className="text-xs text-gray-500">{unit.volume} ml</p>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-600">
                          <div>Coll: {unit.collectionDate}</div>
                          <div className={unit.status === "About to expire" ? "text-red-600 font-bold" : ""}>Exp: {unit.expiryDate}</div>
                        </td>
                        <td className="px-6 py-4"><span className="text-sm">{unit.storageLocation}</span></td>
                        <td className="px-6 py-4"><StatusBadge status={unit.status} /></td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEdit(unit)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Pencil size={16} /></button>
                            <button onClick={() => handleDelete(unit.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FORM (Add / Edit) */}
        {view === "form" && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6">
              <ArrowLeft size={18} /> Back to List
            </button>
            
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
              {editingUnit ? `Edit Unit #${editingUnit.id}` : "Add New Unit"}
            </h3>

            <form onSubmit={handleSave} className="flex flex-col gap-6">
              {/* Row 1: Volume & Rh */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Volume (ml)</label>
                  <Input 
                    type="number" 
                    value={formData.volume} 
                    onChange={(e) => handleChange("volume", Number(e.target.value))} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Rh Type</label>
                  <select 
                    className="w-full h-11 rounded-lg border border-gray-300 px-4 bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                    value={formData.rhType}
                    onChange={(e) => handleChange("rhType", e.target.value)}
                  >
                    <option value="+">Positive (+)</option>
                    <option value="-">Negative (-)</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Dates */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Collection Date</label>
                  <Input 
                    type="date" 
                    value={formData.collectionDate} 
                    onChange={(e) => handleChange("collectionDate", e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Expiry Date</label>
                  <Input 
                    type="date" 
                    value={formData.expiryDate} 
                    onChange={(e) => handleChange("expiryDate", e.target.value)} 
                  />
                  <p className="text-xs text-gray-500 mt-1">Status depends on this date.</p>
                </div>
              </div>

              {/* Row 3: Location */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Storage Location</label>
                <Input 
                  placeholder="E.g. Fridge A - Shelf 2"
                  value={formData.storageLocation} 
                  onChange={(e) => handleChange("storageLocation", e.target.value)} 
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setView("list")}>Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white shadow-md">
                  {loading ? "Saving..." : (editingUnit ? "Update Unit" : "Create Unit")}
                </Button>
              </div>
            </form>
          </div>
        )}

      </div>
    </Modal>
  );
}