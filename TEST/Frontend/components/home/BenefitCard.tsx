// home/BenefitCard.tsx
"use client"; // Cần "use client" vì dùng useState
import React, { useState } from "react";
import { ChevronLeftIcon, ArrowRightIcon } from "@/icons"; // Import icons

// Dữ liệu cho 3 tab carousel
const benefitsData = [
  {
    title: "Được tư vấn về sức khoẻ",
    items: [
      "Được giải thích về quy trình hiến máu và các tai biến có thể xảy ra trong và sau khi hiến máu.",
      "Được cung cấp thông tin về dấu hiệu, triệu chứng do nhiễm vi rút viêm gan, HIV và một số bệnh lây qua đường truyền máu, tình dục khác.",
      "Được xét nghiệm sàng lọc một số vi rút lây qua đường truyền máu, tình dục (HIV, Giang mai, viêm gan,...) sau khi hiến máu.",
      "Được tư vấn hướng dẫn cách chăm sóc sức khoẻ, tư vấn về kết quả bất thường sau hiến máu.",
      "Được bảo mật về kết quả khám lâm sàng, kết quả xét nghiệm.",
    ],
  },
  {
    title: "Được nhận quà tặng và hỗ trợ",
    items: [
      "Được bồi dưỡng, chăm sóc theo các quy định hiện hành.",
      "Nhận quà tặng lưu niệm (hiện vật hoặc tiền mặt) theo giá trị tương ứng.",
      "Được hỗ trợ chi phí đi lại (hoặc vé xe) theo quy định.",
      "Được nhận giấy chứng nhận hiến máu tình nguyện.",
      "Được ưu tiên truyền máu miễn phí tại các cơ sở y tế công lập trên toàn quốc khi bản thân có nhu cầu.",
    ],
  },
  {
    title: "Được tôn vinh và ghi nhận",
    items: [
      "Được xem xét, xét tặng các danh hiệu, giải thưởng, kỷ niệm chương về hiến máu nhân đạo.",
      "Được tôn vinh tại các sự kiện, chương trình vinh danh người hiến máu tiêu biểu.",
      "Tham gia vào cộng đồng những người hiến máu, lan tỏa tinh thần nhân ái.",
      "Nhận được sự trân trọng từ gia đình, bạn bè và xã hội.",
      "Cảm thấy tự hào về hành động cao đẹp cứu người của mình.",
    ],
  },
];

/**
 * Component Thẻ Quyền lợi (thẻ màu đỏ)
 * ĐÃ CẬP NHẬT thành carousel
 */
const BenefitCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? benefitsData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === benefitsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentBenefit = benefitsData[currentIndex];

  return (
    <div
      className="relative flex h-full w-full flex-col rounded-lg bg-red-600 p-6 text-white shadow-lg md:p-8"
      // Bỏ gradient, dùng màu đỏ đồng nhất
    >
      {/* Nút điều hướng TRÁI */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40 md:left-4"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      {/* Nút điều hướng PHẢI */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40 md:right-4"
        aria-label="Next slide"
      >
        <ArrowRightIcon className="h-6 w-6" />
      </button>

      {/* Nội dung slide - Thêm key để React re-render transition (nếu có) */}
      <div key={currentIndex} className="flex flex-col px-8 md:px-12">
        <h3
          className="w-full text-center text-2xl font-bold leading-tight md:text-3xl"
        >
          {currentBenefit.title}
        </h3>

        {/* ===== LIST NỘI DUNG CỦA SLIDE HIỆN TẠI ===== */}
        <div
          className="mt-6 w-full text-base font-normal leading-relaxed md:text-lg"
        >
          <ul className="list-disc space-y-3 pl-5">
            {currentBenefit.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;