"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { Check, X } from "lucide-react";
import clsx from "clsx";

// Kiểu dữ liệu props nhận từ trang cha
interface HealthCheckFormProps {
  donor: {
    id: number | string;
    name: string;
    age: number;
    // Các thông tin khác nếu cần
  } | null;
  onConfirm: (data: any) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const HealthCheckForm: React.FC<HealthCheckFormProps> = ({ 
  donor, 
  onConfirm, 
  onCancel,
  isSubmitting 
}) => {
  // State cho các chỉ số
  const [formData, setFormData] = useState({
    weight: "",
    bloodType: "",
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    notes: "",
  });

  // State cho Trigger Tick (Approved / Not Approved)
  // null = chưa chọn, true = Approved, false = Not Approved
  const [approvalStatus, setApprovalStatus] = useState<boolean | null>(null);

  // Reset form khi đổi bệnh nhân
  useEffect(() => {
    if (donor) {
      setFormData({
        weight: "",
        bloodType: "", // Có thể set mặc định nếu có data
        temperature: "36.5",
        bloodPressure: "120/80",
        heartRate: "75",
        notes: "",
      });
      setApprovalStatus(null);
    }
  }, [donor]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (approvalStatus === null) {
      alert("Vui lòng chọn trạng thái APPROVED hoặc NOT APPROVED.");
      return;
    }
    // Gom dữ liệu gửi lên
    const payload = {
      ...formData,
      isNormal: approvalStatus, // true/false
    };
    onConfirm(payload);
  };

  if (!donor) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
        <p className="text-xl text-gray-500">Vui lòng chọn bệnh nhân từ danh sách phía trên để bắt đầu khám.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl bg-white p-6 shadow-lg md:p-8 animate-fadeIn">
      
      {/* --- HEADER: THÔNG TIN BỆNH NHÂN (READ ONLY) --- */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h2 className="mb-4 text-2xl font-bold uppercase text-red-600">
          Thông tin bệnh nhân
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Họ và Tên</Label>
            <div className="flex h-12 items-center rounded-lg bg-gray-100 px-4 text-lg font-bold text-gray-800">
              {donor.name}
            </div>
          </div>
          <div>
            <Label>Tuổi</Label>
            <div className="flex h-12 items-center rounded-lg bg-gray-100 px-4 text-lg font-bold text-gray-800">
              {donor.age}
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION: CHỈ SỐ SỨC KHỎE (INPUTS) --- */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold uppercase text-gray-800">
          Chỉ số sinh tồn & Xét nghiệm nhanh
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Weight */}
          <div>
            <Label>Cân nặng (kg) <span className="text-red-500">*</span></Label>
            <Input 
              type="number" 
              placeholder="VD: 65" 
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
          </div>

          {/* Blood Type */}
          <div>
            <Label>Nhóm máu (Test nhanh) <span className="text-red-500">*</span></Label>
            <select
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10"
              value={formData.bloodType}
              onChange={(e) => handleChange("bloodType", e.target.value)}
            >
              <option value="">Chọn nhóm máu</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>

          {/* Temp */}
          <div>
            <Label>Nhiệt độ (°C)</Label>
            <Input 
              type="number" 
            //   step="0.1"
              value={formData.temperature}
              onChange={(e) => handleChange("temperature", e.target.value)}
            />
          </div>

          {/* BP */}
          <div>
            <Label>Huyết áp (mmHg)</Label>
            <Input 
              placeholder="120/80" 
              value={formData.bloodPressure}
              onChange={(e) => handleChange("bloodPressure", e.target.value)}
            />
          </div>

          {/* Heart Rate */}
          <div>
            <Label>Nhịp tim (bpm)</Label>
            <Input 
              type="number" 
              value={formData.heartRate}
              onChange={(e) => handleChange("heartRate", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- SECTION: NOTES --- */}
      <div className="mb-8">
        <Label>Ghi chú bác sĩ / Lý do từ chối</Label>
        <TextArea 
          rows={3} 
          placeholder="Nhập ghi chú thêm..." 
          value={formData.notes}
          onChange={(val) => handleChange("notes", val)}
        />
      </div>

      {/* --- SECTION: TRIGGER CHECKBOXES (QUAN TRỌNG) --- */}
      <div className="mb-10 rounded-xl bg-gray-50 p-6 border border-gray-200">
        <h2 className="mb-4 text-center text-xl font-bold uppercase text-gray-800">
          Kết luận
        </h2>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
          
          {/* Box 1: APPROVED */}
          <div 
            onClick={() => setApprovalStatus(true)}
            className={clsx(
              "cursor-pointer flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all w-[180px]",
              approvalStatus === true 
                ? "border-green-500 bg-green-50 shadow-md transform scale-105" 
                : "border-gray-300 bg-white hover:border-green-300"
            )}
          >
            <div className={clsx(
              "flex h-8 w-8 items-center justify-center rounded-full border-2",
              approvalStatus === true ? "border-green-500 bg-green-500 text-white" : "border-gray-300"
            )}>
              {approvalStatus === true && <Check size={20} strokeWidth={4} />}
            </div>
            <span className={clsx(
              "font-bold text-lg",
              approvalStatus === true ? "text-green-600" : "text-gray-500"
            )}>
              APPROVED
            </span>
          </div>

          {/* Box 2: NOT APPROVED */}
          <div 
            onClick={() => setApprovalStatus(false)}
            className={clsx(
              "cursor-pointer flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all w-[180px]",
              approvalStatus === false 
                ? "border-red-500 bg-red-50 shadow-md transform scale-105" 
                : "border-gray-300 bg-white hover:border-red-300"
            )}
          >
            <div className={clsx(
              "flex h-8 w-8 items-center justify-center rounded-full border-2",
              approvalStatus === false ? "border-red-500 bg-red-500 text-white" : "border-gray-300"
            )}>
              {approvalStatus === false && <X size={20} strokeWidth={4} />}
            </div>
            <span className={clsx(
              "font-bold text-lg",
              approvalStatus === false ? "text-red-600" : "text-gray-500"
            )}>
              NOT APPROVED
            </span>
          </div>

        </div>
      </div>

      {/* --- FOOTER: ACTION BUTTONS --- */}
      <div className="flex flex-col-reverse items-center justify-end gap-4 md:flex-row">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          Cancel
        </Button>

        <Button 
          variant="outline"
          className="w-full md:w-auto bg-gray-100 text-gray-700 hover:bg-gray-200 border-none"
        >
          Save Draft
        </Button>

        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full md:w-auto bg-[#CF2222] hover:bg-red-700 px-8 text-lg font-bold shadow-lg text-white"
        >
          {isSubmitting ? "Processing..." : "CONFIRM"}
        </Button>
      </div>

    </div>
  );
};

export default HealthCheckForm;