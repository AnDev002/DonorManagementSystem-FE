// FrontendNext/app/(admin)/(others-pages)/homepage/page.tsx
"use client"; // Chuyển thành Client Component

import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import BenefitsSection from "@/components/home/BenefitsSection";
import InfoSection from "@/components/home/InfoSection";
import CriteriaSection from "@/components/home/CriteriaSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
// Import thành phần mới
import DoctorSchedule from "@/components/home/DoctorSchedule";
import { useAuth } from "@/context/AuthContext";
import { RoleDto } from "@/types/user";

export default function HomePage() {
  const { user } = useAuth();
  
  // Kiểm tra xem user có phải là bác sĩ không
  const isDoctor = user?.role === RoleDto.Doctor;

  return (
    <main className="flex w-full min-h-screen flex-col items-center overflow-x-hidden bg-gray-50">
      
      {/* --- LOGIC HIỂN THỊ --- */}
      {isDoctor ? (
        // Nếu là Bác sĩ: Hiển thị Component mới
        <DoctorSchedule />
      ) : (
        // Nếu không phải Bác sĩ (Khách/Donor/Admin): Hiển thị Hero Banner cũ
        <HeroBanner />
      )}

      {/* Các phần khác giữ nguyên */}
      <InfoSection />
      <BenefitsSection />
      <CriteriaSection />
      <ActivitiesSection />
    </main>
  );
}