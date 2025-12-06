// src/app/(admin)/(others-pages)/record-donation/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import RecordDonationForm from "@/components/record-donation/RecordDonationForm";
import { AppointmentService } from "@/services/AppointmentService";
import { Droplet, Clock, CheckCircle } from "lucide-react";
import clsx from "clsx";

// Kiểu dữ liệu cho Item trong hàng chờ
interface QueueItem {
  id: number;
  name: string;
  dob: string;
  bloodType: string; // Nhóm máu dự kiến (từ lúc đăng ký)
}

export default function RecordDonationPage() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [selectedDonor, setSelectedDonor] = useState<QueueItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Tự động fetch danh sách sẵn sàng hiến (ReadyToDonate)
  const fetchQueue = async () => {
    setLoading(true);
    try {
      const res = await AppointmentService.getReadyToDonateAppointments();
      const mappedData = res.map((apt: any) => ({
        id: apt.id,
        name: apt.name || apt.user?.name || "Unknown",
        dob: apt.dob,
        bloodType: apt.bloodType || "A",
      }));
      setQueue(mappedData);

      // Nếu donor đang chọn không còn trong list, clear selection
      if (selectedDonor && !mappedData.find((d: any) => d.id === selectedDonor.id)) {
        setSelectedDonor(null);
      }
    } catch (error) {
      console.error("Failed to fetch donation queue", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  // Xử lý lưu thông tin túi máu
  const handleSaveRecord = async (formData: any) => {
    if (!selectedDonor) return;
    
    setIsSubmitting(true);
    try {
      // Gọi API tạo Blood Unit
      // appointmentId là bắt buộc để backend update trạng thái appointment thành Completed
      const payload = {
        appointmentId: selectedDonor.id,
        volume: parseInt(formData.volume),
        bloodType: formData.bloodType,
        rhType: "+", // Mặc định hoặc thêm trường Rh vào form nếu cần
      };

      await AppointmentService.submitBloodRecord(payload);
      
      alert(`✅ Đã lưu túi máu thành công cho ${selectedDonor.name}!`);
      
      // Refresh danh sách
      setSelectedDonor(null);
      fetchQueue();

    } catch (error) {
      console.error("Save failed", error);
      alert("Lỗi khi lưu thông tin túi máu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6 font-inter">
      <div className="mx-auto max-w-[1600px]">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-red-600">🩸</span> Record Donation (Collection)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          
          {/* --- LEFT: QUEUE (Ready To Donate) --- */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-green-50 flex justify-between items-center">
              <h3 className="font-semibold text-green-800">Ready for Collection</h3>
              <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">
                {queue.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
              {loading ? (
                <p className="text-center text-gray-400 mt-10">Updating queue...</p>
              ) : queue.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                  <CheckCircle size={32} className="mb-2 opacity-20" />
                  <p>Không còn người chờ lấy máu</p>
                </div>
              ) : (
                queue.map((donor) => (
                  <div
                    key={donor.id}
                    onClick={() => setSelectedDonor(donor)}
                    className={clsx(
                      "cursor-pointer rounded-lg p-3 border transition-all hover:shadow-md",
                      selectedDonor?.id === donor.id 
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-100 bg-white hover:border-green-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-sm">
                        {donor.bloodType}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm">{donor.name}</h4>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Clock size={12} /> Waiting...
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* --- RIGHT: FORM NHẬP LIỆU --- */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
            {selectedDonor ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 h-full overflow-y-auto">
                <div className="mb-6 border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-bold text-gray-800">Thông tin túi máu thu được</h2>
                  <p className="text-sm text-gray-500">
                    Người hiến: <span className="font-semibold text-black">{selectedDonor.name}</span>
                  </p>
                </div>

                <div className="max-w-2xl">
                  {/* Reuse Component Form có sẵn, truyền data của người đang chọn */}
                  <RecordDonationForm 
                    initialData={{
                      name: selectedDonor.name,
                      date: new Date().toISOString().split('T')[0], // Mặc định hôm nay
                      volume: "250", // Mặc định
                      bloodType: selectedDonor.bloodType as any,
                    }}
                    onSave={handleSaveRecord}
                    onCancel={() => setSelectedDonor(null)}
                  />
                  
                  {isSubmitting && (
                    <p className="mt-4 text-sm text-red-500 animate-pulse font-medium">
                      Đang lưu thông tin và cập nhật kho máu...
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
                <Droplet size={64} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Chọn người hiến từ danh sách để nhập túi máu.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}