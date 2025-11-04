// homepage/page.tsx
import HeroBanner from "@/components/home/HeroBanner";
import BenefitsSection from "@/components/home/BenefitsSection";
import InfoSection from "@/components/home/InfoSection";
import CriteriaSection from "@/components/home/CriteriaSection"; // <-- IMPORT MỚI
import ActivitiesSection from "@/components/home/ActivitiesSection"; // <-- IMPORT MỚI

/**
 * Trang chủ (Homepage)
 * Đã được cập nhật đầy đủ.
 */
export default function HomePage() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center overflow-x-hidden bg-gray-50">
      {/* 1. Component Hero Banner */}
      <HeroBanner />

      {/* 2. Component Info Cards (3 thẻ trắng) */}
      <InfoSection />

      {/* 3. Component Khối Quyền lợi (vàng + đỏ) */}
      <BenefitsSection />

      {/* 4. Component Tiêu chuẩn (khối đỏ bo góc) */}
      <CriteriaSection />

      {/* 5. Component Hoạt động (khối đỏ full-width) */}
      <ActivitiesSection />

      {/* PHẦN FOOTER:
        Trong ảnh không có Footer, nếu bạn muốn thêm
        component PageFooter.tsx cũ, hãy đặt nó ở đây.
        <PageFooter /> 
      */}
    </main>
  );
}