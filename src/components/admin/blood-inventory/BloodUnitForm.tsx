"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { BloodUnit } from "@/services/InventoryService";

interface BloodUnitFormProps {
  initialData?: Partial<BloodUnit> | null;
  onSubmit: (data: Partial<BloodUnit>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const BloodUnitForm: React.FC<BloodUnitFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  isSubmitting = false 
}) => {
  // Khởi tạo state form
  const [formData, setFormData] = useState<Partial<BloodUnit>>({
    bloodType: "A",
    rhType: "+",
    volume: 250,
    collectionDate: new Date().toISOString().split('T')[0], // Mặc định hôm nay
    expiryDate: "", 
    storageLocation: "",
    status: "Available"
  });

  // Load dữ liệu khi Edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        // Format lại date nếu cần để hiển thị đúng trong input type="date"
        collectionDate: initialData.collectionDate?.split('T')[0],
        expiryDate: initialData.expiryDate?.split('T')[0]
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof BloodUnit, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Blood Type</Label>
          <select 
            className="w-full h-11 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-red-500"
            value={formData.bloodType}
            onChange={(e) => handleChange("bloodType", e.target.value)}
          >
            {['A', 'B', 'AB', 'O'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <Label>Rh Type</Label>
          <select 
            className="w-full h-11 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-red-500"
            value={formData.rhType}
            onChange={(e) => handleChange("rhType", e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </div>
      </div>

      <div>
        <Label>Volume (ml)</Label>
        <Input 
          type="number" 
          placeholder="250, 350, 450..." 
          value={formData.volume} 
          onChange={(e) => handleChange("volume", parseInt(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Collection Date</Label>
          <Input 
            type="date" 
            value={formData.collectionDate} 
            onChange={(e) => handleChange("collectionDate", e.target.value)}
          />
        </div>
        <div>
          <Label>Expiry Date</Label>
          <Input 
            type="date" 
            value={formData.expiryDate} 
            onChange={(e) => handleChange("expiryDate", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>Storage Location</Label>
        <Input 
          placeholder="e.g. Fridge A1, Shelf 2" 
          value={formData.storageLocation} 
          onChange={(e) => handleChange("storageLocation", e.target.value)}
        />
      </div>

      <div>
        <Label>Status</Label>
        <select 
          className="w-full h-11 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-red-500"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="Available">Available</option>
          <option value="About to expire">About to expire</option>
          <option value="Expired">Expired</option>
          <option value="Used">Used</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white">
          {initialData ? "Update Unit" : "Create Unit"}
        </Button>
      </div>
    </form>
  );
};

export default BloodUnitForm;