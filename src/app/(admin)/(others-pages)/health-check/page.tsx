// src/app/(admin)/(others-pages)/health-check/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import HealthCheckForm from "@/components/health-check/HealthCheckForm";
import { AppointmentService } from "@/services/AppointmentService";
import { User, Calendar, Phone } from "lucide-react";
import clsx from "clsx";

// Kiểu dữ liệu cho bệnh nhân
interface Patient {
  id: number;
  name: string;
  dob: string;
  phone: string;
  appointmentDate: string;
  gender?: string;
}

export default function HealthCheckPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Tự động Fetch danh sách chờ khám (Confirmed) khi vào trang
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await AppointmentService.getConfirmedAppointments();
      const mappedData = res.map((item: any) => ({
        id: item.id,
        name: item.name || item.user?.name || "Unknown",
        dob: item.dob,
        phone: item.phone,
        appointmentDate: item.appointmentDate,
      }));
      setPatients(mappedData);
      
      // Nếu đang chọn một bệnh nhân mà bệnh nhân đó không còn trong list (đã xử lý xong), bỏ chọn
      if (selectedPatient && !mappedData.find((p: any) => p.id === selectedPatient.id)) {
        setSelectedPatient(null);
      }
    } catch (error) {
      console.error("Failed to fetch patients", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const calculateAge = (dobString: string) => {
    if (!dobString) return 0;
    const birthDate = new Date(dobString);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Xử lý Confirm từ Form
  const handleConfirmHealthCheck = async (formData: any) => {
    if (!selectedPatient) return;

    setIsSubmitting(true);
    try {
      await AppointmentService.submitHealthCheck(selectedPatient.id, {
        weight: parseFloat(formData.weight),
        bloodPressure: formData.bloodPressure,
        heartRate: parseInt(formData.heartRate),
        temperature: parseFloat(formData.temperature),
        isNormal: formData.isNormal,
        notes: formData.notes,
      });

      alert(formData.isNormal 
        ? "✅ Sức khỏe ĐẠT! Bệnh nhân đã được chuyển sang danh sách chờ lấy máu." 
        : "⚠️ Sức khỏe KHÔNG ĐẠT. Đã từ chối hiến máu.");
      
      // Reset form và reload lại danh sách (bệnh nhân vừa khám sẽ biến mất)
      setSelectedPatient(null);
      fetchPatients(); 

    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi lưu kết quả.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6 font-inter">
      <div className="mx-auto max-w-[1600px]">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-red-600">🩺</span> Health Check & Screening
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          
          {/* --- CỘT TRÁI: DANH SÁCH CHỜ (CONFIRMED) --- */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">Waiting Queue</h3>
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold">
                {patients.length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
              {loading ? (
                <p className="text-center text-gray-400 mt-10">Loading...</p>
              ) : patients.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                  <p>Hết danh sách chờ</p>
                </div>
              ) : (
                patients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={clsx(
                      "cursor-pointer rounded-lg p-3 border transition-all hover:shadow-md",
                      selectedPatient?.id === patient.id 
                        ? "border-red-500 bg-red-50" 
                        : "border-gray-100 bg-white hover:border-red-200"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{patient.name}</h4>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <User size={12} /> {calculateAge(patient.dob)} tuổi
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Phone size={12} /> {patient.phone}
                        </div>
                      </div>
                      <div className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                        {new Date(patient.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* --- CỘT PHẢI: FORM KHÁM --- */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
            {selectedPatient ? (
              <div className="h-full overflow-y-auto custom-scrollbar">
                <HealthCheckForm 
                  donor={{
                    ...selectedPatient,
                    age: calculateAge(selectedPatient.dob)
                  }}
                  onConfirm={handleConfirmHealthCheck}
                  onCancel={() => setSelectedPatient(null)}
                  isSubmitting={isSubmitting}
                />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
                <User size={64} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Chọn một bệnh nhân từ danh sách chờ để bắt đầu khám.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}