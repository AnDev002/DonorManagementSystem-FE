// src/components/home/CriteriaSection.tsx
import React from "react";
import CriteriaCard from "./CriteriaCard"; 
// BƯỚC 1: Import các icon (đã được định nghĩa trong index.tsx)
import { 
  UserCheckIcon, 
  HeartPulseIcon, 
  BanIcon, 
  WineOffIcon, 
  FileCheckIcon, // <-- Đã có
  AwardIcon // <-- Đã có
} from "@/icons";

// BƯỚC 2: Cập nhật dữ liệu
const criteriaData = [
  {
    icon: UserCheckIcon, 
    text: "Mang theo chứng minh nhân dân/hộ chiếu",
  },
  {
    icon: HeartPulseIcon, 
    text: "Cân nặng: Nam ≥ 45 kg Nữ ≥ 45 kg",
  },
  {
    icon: BanIcon, 
    text: "Không mắc hoặc không có các hành vi nguy cơ lây nhiễm HIV, không nhiễm viêm gan B, viêm gan C, và các virus lây qua đường truyền máu",
  },
  {
    icon: WineOffIcon, 
    text: "Không nghiện ma túy, rượu bia và các chất kích thích",
  },
  {
    icon: FileCheckIcon, // <-- Dùng icon đã import
    text: "Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp, hô hấp, dạ dày...",
  },
];

const CriteriaSection = () => {
  return (
    <section className="mt-12 w-full max-w-6xl px-4">
      <div className="rounded-xl bg-red-600 p-6 shadow-lg md:p-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Thẻ Tiêu đề (màu vàng) */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-yellow-300 p-6 text-center md:row-span-2">
            <AwardIcon // <-- Dùng icon đã import
              className="h-12 w-12 text-red-700"
            />
            <h2 className="mt-4 text-2xl font-bold text-red-700">
              Tiêu chuẩn tham gia hiến máu
            </h2>
          </div>

          {/* 5 Thẻ Tiêu chuẩn (màu trắng) */}
          {criteriaData.map((item, index) => (
            <CriteriaCard key={index} icon={item.icon} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CriteriaSection;