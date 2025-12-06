"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import { InventoryService } from "@/services/InventoryService";
import Label from "@/components/form/Label";

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
  
  // 1. SỬA: Đặt giá trị mặc định là chuỗi rỗng "" (Không để số 1)
  const [formData, setFormData] = useState<{
    bloodType: string;
    rhType: string;
    volume: number;
    appointmentId: number | ""; 
  }>({
    bloodType: "A",
    rhType: "+",
    volume: 250,
    appointmentId: "", // <--- QUAN TRỌNG: Phải là rỗng
  });

  const [isCustomType, setIsCustomType] = useState(false);
  const commonTypes = ["A", "B", "AB", "O"];

  // 2. SỬA: Reset form mỗi khi mở modal
  useEffect(() => {
    if (isOpen) {
      setFormData({
        bloodType: "A",
        rhType: "+",
        volume: 250,
        appointmentId: "", // <--- QUAN TRỌNG: Reset về rỗng
      });
      setIsCustomType(false);
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

      // 3. LOGIC QUAN TRỌNG: Nếu rỗng thì xóa field này đi
      if (payload.appointmentId === "" || payload.appointmentId === 0) {
        delete payload.appointmentId; // Backend sẽ nhận là undefined -> Chạy vào nhánh nhập thủ công
      } else {
        payload.appointmentId = Number(payload.appointmentId);
      }

      await InventoryService.create(payload);
      alert("Nhập kho thành công!");
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Create failed", error);
      // Hiển thị thông báo lỗi cụ thể hơn
      alert(error.response?.data?.message || "Lỗi nhập kho: ID lịch hẹn có thể đã tồn tại hoặc không hợp lệ.");
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
        <div>
           <Label>Source Appointment ID (Optional)</Label>
           <Input 
             type="number" 
             placeholder="Leave empty to create new type / manual import"
             value={formData.appointmentId}
             onChange={(e) => setFormData({...formData, appointmentId: e.target.value ? Number(e.target.value) : ""})}
           />
           <p className="text-xs text-gray-500 mt-1">
             ⚠️ Để trống trường này nếu bạn muốn tạo Nhóm máu mới hoặc nhập kho thủ công.
           </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? "Creating..." : "Create Group / Import"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}