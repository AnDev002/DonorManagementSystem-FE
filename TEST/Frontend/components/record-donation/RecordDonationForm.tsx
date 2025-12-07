// src/components/record-donation/RecordDonationForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { DonationRecord } from "@/types/donation";

interface RecordDonationFormProps {
  initialData?: DonationRecord | null; // Dữ liệu ban đầu nếu là Edit
  onSave: (data: Partial<DonationRecord>) => void;
  onCancel: () => void;
}

export default function RecordDonationForm({ initialData, onSave, onCancel }: RecordDonationFormProps) {
  // State quản lý form
  const [formData, setFormData] = useState<Partial<DonationRecord>>({
    name: "",
    date: "",
    volume: "",
    bloodType: "A", // Default
  });

  // Load dữ liệu khi sửa
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", date: "", volume: "", bloodType: "A" }); // Reset nếu tạo mới
    }
  }, [initialData]);

  const handleChange = (field: keyof DonationRecord, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      
      {/* 1. Name Field */}
      <div className="w-full">
        <Label className="mb-2 text-xl font-bold uppercase text-black dark:text-white">
          Name
        </Label>
        <Input
          className="h-[60px] w-full rounded-xl border border-gray-300 bg-white px-6 text-2xl font-bold text-black focus:border-[#CF2222] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="ENTER DONOR NAME"
          required
        />
      </div>

      {/* 2. Date Field */}
      <div className="w-full">
        <Label className="mb-2 text-xl font-bold uppercase text-black dark:text-white">
          Date
        </Label>
        <Input
          type="date"
          className="h-[60px] w-full rounded-xl border border-gray-300 bg-white px-6 text-xl text-black focus:border-[#CF2222] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formData.date} // Lưu ý: format phải là YYYY-MM-DD cho input date
          onChange={(e) => handleChange("date", e.target.value)}
          required
        />
      </div>

      {/* 3. Volume Field */}
      <div className="w-full">
        <Label className="mb-2 text-xl font-bold uppercase text-black dark:text-white">
          Volume (mL)
        </Label>
        <div className="relative">
          <Input
            className="h-[60px] w-full rounded-xl border border-gray-300 bg-white px-6 text-xl text-black focus:border-[#CF2222] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={formData.volume}
            onChange={(e) => handleChange("volume", e.target.value)}
            placeholder="e.g. 250, 350, 450"
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-bold">mL</span>
        </div>
      </div>

      {/* 4. Blood Type Field */}
      <div className="w-full">
        <Label className="mb-2 text-xl font-bold uppercase text-black dark:text-white">
          Blood Type
        </Label>
        <select
          className="h-[60px] w-full appearance-none rounded-xl border border-gray-300 bg-white px-6 text-xl font-bold text-black focus:border-[#CF2222] focus:ring-0 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formData.bloodType}
          onChange={(e) => handleChange("bloodType", e.target.value as any)}
        >
          <option value="A">Type A</option>
          <option value="B">Type B</option>
          <option value="AB">Type AB</option>
          <option value="O">Type O</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-[#CF2222] px-8 py-3 text-base font-bold text-white shadow-md hover:bg-red-700 transition-all"
        >
          {initialData ? "Update Record" : "Create Record"}
        </button>
      </div>
    </form>
  );
}