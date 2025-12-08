// src/app/(admin)/(others-pages)/donation/page.tsx
"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DonationPageHeader from "@/components/donation/DonationPageHeader";
import DonorInfoForm from "@/components/donation/DonorInfoForm";
import AppointmentForm from "@/components/donation/AppointmentForm";
import DonationFormActions from "@/components/donation/DonationFormActions";
import { CombinedAppointmentForm } from "@/types/appointment"; 
import { AppointmentService } from "@/services/AppointmentService"; 
import { useAuth } from "@/context/AuthContext"; 

export default function CreateDonationPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const calculateAge = (dobString: string) => {
    if (!dobString) return 0;
    const birthDate = new Date(dobString);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Nếu chưa đến tháng sinh hoặc cùng tháng nhưng chưa đến ngày sinh thì trừ 1 tuổi
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const isValidPhone = (phone: string) => {
    const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    return regex.test(phone);
  };

  const [formData, setFormData] = useState<CombinedAppointmentForm>({
    name: user?.name || "",
    email: user?.username || "", 
    phone: "",
    dob: "",
    bloodType: "A+",
    appointmentDate: "", // Format từ DatePicker thường là YYYY-MM-DD
    location: "Bệnh viện Bạch Mai",
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
    
    // Validate dữ liệu
    if (!formData.appointmentDate) {
      setError("Please select an appointment date.");
      return;
    }
    if (!formData.location) { 
        setError("Please select a donation location.");
        return;
    }
    if (!formData.phone) {
        setError("Please enter your phone number.");
        return;
    }
    if (!isValidPhone(formData.phone)) {
        setError("Invalid phone number format. Please check again.");
        return;
    }

    // 2. Thêm Validate tuổi (18+)
    if (!formData.dob) {
        setError("Please select your Date of Birth.");
        return;
    }
    const age = calculateAge(formData.dob);
    if (age < 18) {
        setError(`You must be at least 18 years old to donate blood. (Current age: ${age})`);
        return;
    }

    setIsSubmitting(true);
    
    try {
      // 2. Chuẩn hóa dữ liệu trước khi gửi
      const dateObj = new Date(formData.appointmentDate);
      dateObj.setHours(8, 0, 0, 0); 
      
      const payload = {
        ...formData,
        appointmentDate: dateObj.toISOString(), 
        donationSiteId: Number(formData.location), 
      };

      await AppointmentService.createAppointment(payload as any);

      alert("Registration successful! Please wait for doctor confirmation.");
      router.push("/history");

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while creating the appointment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-start px-4 py-12">
      <div className="flex w-full max-w-6xl flex-col items-center">
        
        <DonationPageHeader />
        
        <main className="relative w-full">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-5 xl:gap-7.5">
            <div className="panel xl:col-span-3 rounded-xl bg-white p-6 shadow-lg md:p-8"> 
              <h3 className="mb-5 text-title-sm font-semibold text-gray-800 dark:text-gray-800">
                Donor Information
              </h3>
              <DonorInfoForm data={formData} onUpdate={handleInputChange} />
            </div>
            <div className="panel xl:col-span-2 rounded-xl bg-white p-6 shadow-lg md:p-8"> 
              <h3 className="mb-5 text-title-sm font-semibold text-gray-800 dark:text-gray-800">
                Schedule Details
              </h3>
              <AppointmentForm data={formData} onUpdate={handleInputChange} />
            </div>
          </div>
          
          {error && (
            <div className="mt-4 text-red-600 font-medium p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              ⚠️ {error}
            </div>
          )}

          <div className="mt-8 flex justify-center pb-10"> 
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