// Frontend/app/(admin)/(others-pages)/donation/page.tsx
"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DonationPageHeader from "@/components/donation/DonationPageHeader";
import DonorInfoForm from "@/components/donation/DonorInfoForm";
import AppointmentForm from "@/components/donation/AppointmentForm";
import DonationFormActions from "@/components/donation/DonationFormActions";
import { CombinedAppointmentForm } from "@/types/appointment"; 
import { AppointmentService } from "@/services/AppointmentService"; 

export default function CreateDonationPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<CombinedAppointmentForm>({
    // Donor Info
    name: "",
    email: "",
    phone: "",
    dob: "",
    bloodType: "A+",
    // Appointment Info
    appointmentDate: "",
    location: "Location A",
    notes: ""
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof CombinedAppointmentForm,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);
    
    try {
      await AppointmentService.createAppointment(formData);
      
      alert("Đặt lịch hẹn thành công!");
      router.push("/history");

    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      setIsSubmitting(false);
    }
  };

  return (
    // SỬA: Bọc layout giống trang notification/page.tsx
    <div className="flex w-full flex-col items-center justify-start px-4 py-12">
      <div className="flex w-full max-w-6xl flex-col items-center">
        
        <DonationPageHeader />
        
        {/* SỬA: Bọc nội dung chính trong <main> */}
        <main className="relative w-full">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-5 xl:gap-7.5">
            <div className="panel xl:col-span-3 rounded-xl bg-white p-6 shadow-lg md:p-8"> {/* Thêm style thẻ */}
              <h3 className="mb-5 text-title-sm font-semibold text-gray-800 dark:text-white">
                Thông tin người hiến
              </h3>
              <DonorInfoForm data={formData} onUpdate={handleInputChange} />
            </div>
            <div className="panel xl:col-span-2 rounded-xl bg-white p-6 shadow-lg md:p-8"> {/* Thêm style thẻ */}
              <h3 className="mb-5 text-title-sm font-semibold text-gray-800 dark:text-white">
                Chi tiết Lịch hẹn
              </h3>
              <AppointmentForm data={formData} onUpdate={handleInputChange} />
            </div>
          </div>
          
          {error && (
            <div className="mt-4 text-red-500 p-3 bg-red-100 border border-red-300 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-8 flex justify-center"> {/* Căn giữa các nút */}
            <DonationFormActions
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onCancel={() => router.back()}
            />
          </div>
        </main>
      </div>
    </div>
  );
}