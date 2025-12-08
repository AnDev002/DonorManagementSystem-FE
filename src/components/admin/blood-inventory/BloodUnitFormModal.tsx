// src/components/admin/blood-inventory/BloodUnitFormModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { InventoryService } from "@/services/InventoryService";

interface BloodUnitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback để reload lại dữ liệu sau khi lưu
  initialData?: any; // Nếu có data thì là Edit, không thì là Add
}

export default function BloodUnitFormModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: BloodUnitFormModalProps) {
  const [formData, setFormData] = useState({
    bloodType: "A",
    rhType: "+",
    volume: "250",
    storageLocation: "Cold Storage A1",
    collectionDate: new Date().toISOString().split('T')[0], // Mặc định hôm nay
    expiryDate: "",
  });
  const [loading, setLoading] = useState(false);

  // Load dữ liệu khi mở form Edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        bloodType: initialData.bloodType || "A", // Lưu ý: Backend cần trả về trường này
        rhType: initialData.rhType || "+",
        volume: initialData.volume?.toString() || "250",
        storageLocation: initialData.storageLocation || "",
        collectionDate: initialData.collectionDate || "",
        expiryDate: initialData.expiryDate || "",
      });
    } else {
      // Reset form khi Add new
      setFormData({
        bloodType: "A",
        rhType: "+",
        volume: "250",
        storageLocation: "Cold Storage A1",
        collectionDate: new Date().toISOString().split('T')[0],
        expiryDate: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        volume: Number(formData.volume),
        appointmentId: 0, // 0 đánh dấu là nhập thủ công (Backend cần xử lý logic này nếu required)
      };

      if (initialData?.id) {
        await InventoryService.update(initialData.id, payload);
        alert("Update successful!");
      } else {
        await InventoryService.create(payload);
        alert("Added successfully!");
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      alert("Error occurred: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[600px] p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800">
        {initialData ? "Update Blood Unit" : "Import New Blood Unit"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Blood Type</Label>
            <select
              className="w-full h-11 rounded-lg border border-gray-300 px-3"
              value={formData.bloodType}
              onChange={(e) => handleChange("bloodType", e.target.value)}
              disabled={!!initialData} // Không cho sửa nhóm máu khi edit
            >
              {["A", "B", "AB", "O"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>RH Type</Label>
            <select
              className="w-full h-11 rounded-lg border border-gray-300 px-3"
              value={formData.rhType}
              onChange={(e) => handleChange("rhType", e.target.value)}
            >
              <option value="+">Positive (+)</option>
              <option value="-">Negative (-)</option>
            </select>
          </div>
        </div>

        <div>
          <Label>Volume (ml)</Label>
          <Input
            type="number"
            value={formData.volume}
            onChange={(e) => handleChange("volume", e.target.value)}
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
            value={formData.storageLocation}
            onChange={(e) => handleChange("storageLocation", e.target.value)}
            placeholder="Ex: Fridge #2 - Shelf 3"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Info"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}