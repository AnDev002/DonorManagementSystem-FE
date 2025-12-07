// src/app/(admin)/(others-pages)/homepage/page.tsx
"use client"; 

import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import BenefitsSection from "@/components/home/BenefitsSection";
import InfoSection from "@/components/home/InfoSection";
import CriteriaSection from "@/components/home/CriteriaSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import DoctorSchedule from "@/components/home/DoctorSchedule";
import { useAuth } from "@/context/AuthContext";
import { RoleDto } from "@/types/user";

export default function HomePage() {
  const { user } = useAuth();
  
  // Kiểm tra xem user có phải là bác sĩ không
  const isDoctor = user?.role === RoleDto.Doctor;

  return (
    <main className="flex w-full min-h-screen flex-col items-center overflow-x-hidden bg-gray-50">
      
      {/* --- PHẦN HERO --- */}
      {/* Nếu là Bác sĩ: Hiển thị Lịch làm việc. Nếu là Donor/Khách: Hiển thị Banner */}
      {isDoctor ? <DoctorSchedule /> : <HeroBanner />}

      {/* --- PHẦN THÔNG TIN DÀNH CHO NGƯỜI HIẾN MÁU --- */}
      {/* Ẩn các khối Quyền lợi, Tiêu chuẩn, Thông tin nếu là Bác sĩ */}
      {!isDoctor && (
        <>
          <InfoSection />
          <BenefitsSection />
        </>
      )}
      <CriteriaSection />

      {/* --- PHẦN HOẠT ĐỘNG (Hiển thị cho tất cả) --- */}
      <ActivitiesSection />
    </main>
  );
}