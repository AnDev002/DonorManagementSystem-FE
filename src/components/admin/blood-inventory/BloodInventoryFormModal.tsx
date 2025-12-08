"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import { InventoryService } from "@/services/InventoryService";
import Label from "@/components/form/Label";
import { LocationService } from "@/services/LocationService";

interface BloodInventoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BloodInventoryFormModal({
  isOpen,
  onClose,
  onSuccess,
}: BloodInventoryFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [siteOptions, setSiteOptions] = useState<{id: number, name: string}[]>([]);
  
  const [formData, setFormData] = useState<{
    bloodType: string;
    rhType: string;
    volume: number;
    appointmentId: number | ""; 
    sourceLocationId: number | ""; // <-- Trường mới: Địa điểm nguồn
  }>({
    bloodType: "A",
    rhType: "+",
    volume: 250,
    appointmentId: "", 
    sourceLocationId: "", 
  });

  const [isCustomType, setIsCustomType] = useState(false);
  const commonTypes = ["A", "B", "AB", "O"];

  // 2. SỬA: Reset form mỗi khi mở modal
  useEffect(() => {
    if (isOpen) {
      // Reset form
      setFormData({
        bloodType: "A",
        rhType: "+",
        volume: 250,
        appointmentId: "",
        sourceLocationId: "",
      });
      setIsCustomType(false);

      // Load sites
      LocationService.getAllSites().then(sites => {
        // Chỉ lấy id và name để hiển thị đơn giản
        setSiteOptions(sites.map(s => ({ id: s.id, name: s.name })));
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: any = {
        ...formData,
        volume: Number(formData.volume),
      };

      // Xử lý appointmentId
      if (payload.appointmentId === "" || payload.appointmentId === 0) {
        delete payload.appointmentId;
        
        // Nếu không có appointment (nhập tay), bắt buộc phải có sourceLocationId
        if (!payload.sourceLocationId) {
            alert("Vui lòng chọn địa điểm nguồn (Source Location) khi nhập thủ công.");
            setLoading(false);
            return;
        }
        payload.sourceLocationId = Number(payload.sourceLocationId);
      } else {
        payload.appointmentId = Number(payload.appointmentId);
        // Nếu nhập từ appointment thì source location sẽ tự lấy từ appointment (logic backend xử lý)
        delete payload.sourceLocationId; 
      }

      await InventoryService.create(payload);
      alert("Import successful!");
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Create failed", error);
      alert(error.response?.data?.message || "Import error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[600px] p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 uppercase">
          Create / Import Blood Group
        </h2>
        <p className="text-sm text-gray-500">
          Add a new unit. If the blood type doesn't exist, a new group will be created.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Hàng 1: Nhóm máu (Cho phép nhập mới) */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label>Blood Type Name</Label>
            {!isCustomType ? (
                <div className="flex gap-2">
                    <select
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    value={formData.bloodType}
                    onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                    >
                    {commonTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <button 
                        type="button"
                        onClick={() => { setIsCustomType(true); setFormData({...formData, bloodType: ""}) }}
                        className="whitespace-nowrap px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                    >
                        Other?
                    </button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <Input 
                        placeholder="Enter Type (e.g. X, Bombay)" 
                        value={formData.bloodType}
                        onChange={(e) => setFormData({...formData, bloodType: e.target.value.toUpperCase()})}
                    />
                    <button 
                        type="button"
                        onClick={() => { setIsCustomType(false); setFormData({...formData, bloodType: "A"}) }}
                        className="whitespace-nowrap px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                </div>
            )}
          </div>
          
          <div>
            <Label>Rh Type</Label>
            <select
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              value={formData.rhType}
              onChange={(e) => setFormData({ ...formData, rhType: e.target.value })}
            >
              <option value="+">Positive (+)</option>
              <option value="-">Negative (-)</option>
            </select>
          </div>
        </div>

        {/* Hàng 2: Thể tích */}
        <div>
          <Label>Volume (ml)</Label>
          <div className="flex items-center gap-4 mt-2">
            {[250, 350, 450].map((vol) => (
              <label key={vol} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="volume"
                  checked={formData.volume === vol}
                  onChange={() => setFormData({ ...formData, volume: vol })}
                  className="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">{vol} ml</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hàng 3: Appointment ID */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase border-b pb-2">Source Information</h4>
            
            {/* Cách 1: Nhập từ Appointment ID */}
            <div className="mb-4">
                <Label>Option 1: Import via Appointment ID</Label>
                <Input 
                    type="number" 
                    placeholder="Enter Appointment ID"
                    value={formData.appointmentId}
                    onChange={(e) => setFormData({
                        ...formData, 
                        appointmentId: e.target.value ? Number(e.target.value) : "",
                        sourceLocationId: "" // Clear source nếu nhập ID
                    })}
                />
            </div>

            <div className="text-center text-xs text-gray-400 mb-4">- OR -</div>

            {/* Cách 2: Nhập thủ công (Chọn địa điểm) */}
            <div className={formData.appointmentId ? "opacity-50 pointer-events-none" : ""}>
                <Label>Option 2: Manual Import Source</Label>
                <select
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none focus:border-red-500"
                    value={formData.sourceLocationId}
                    onChange={(e) => setFormData({...formData, sourceLocationId: e.target.value})}
                    disabled={!!formData.appointmentId}
                >
                    <option value="">Select Donation Site...</option>
                    {siteOptions.map(site => (
                        <option key={site.id} value={site.id}>{site.name}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? "Processing..." : "Import"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}