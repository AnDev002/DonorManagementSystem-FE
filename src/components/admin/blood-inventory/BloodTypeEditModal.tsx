"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { InventoryService } from "@/services/InventoryService";

interface BloodTypeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentType: string;
}

export default function BloodTypeEditModal({
  isOpen,
  onClose,
  onSuccess,
  currentType,
}: BloodTypeEditModalProps) {
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState(false);

  // Lấy tên hiện tại bỏ chữ "TYPE " để hiển thị trong input
  useEffect(() => {
    if (isOpen && currentType) {
      setNewType(currentType.replace("TYPE ", ""));
    }
  }, [isOpen, currentType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newType.trim()) return alert("Vui lòng nhập tên nhóm máu");

    setLoading(true);
    try {
      await InventoryService.updateTypeName(currentType, newType);
      alert("Cập nhật thành công!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật tên nhóm máu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[400px] p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Rename Blood Type</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label>New Name</Label>
          <Input 
            value={newType} 
            onChange={(e) => setNewType(e.target.value)} 
            placeholder="Ex: A, B, O..." 
            
          />
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={loading} className="bg-blue-600 text-white hover:bg-blue-700">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}