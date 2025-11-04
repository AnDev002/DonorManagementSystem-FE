// home/ActivitiesSection.tsx
"use client"; // <-- THÊM "use client" VÌ SỬ DỤNG STATE
import React, { useState } from "react"; // <-- IMPORT useState
import ActivityCard from "./ActivityCard";

// Dữ liệu cho các thẻ hoạt động
// LƯU Ý: Đã thay thế ảnh và thêm 6 mục mới
const activitiesData = [
  // 3 mục đầu tiên
  {
    imgSrc: "/assets/tonvinhhoichuthapdo.jpg", // Ảnh minh họa 1
    title: "Sôi nổi hoạt động hiến máu tình nguyện - Hội chữ thập đỏ Việt Nam",
    date: "26/01/2025",
  },
  {
    imgSrc: "/assets/vna_potal_thanh_pho_ho_chi_minh_phat_dong_hien_mau_nhan_dao_chung_tay_day_lui_dich_covid-19_stand.jpeg", // Ảnh minh họa 2
    title: "Phát động hiến máu nhân đạo, chung tay đẩy lùi dịch Covid-19",
    date: "07/02/2025",
  },
  {
    imgSrc: "/assets/dhnguyentrai.jpg", // Ảnh minh họa 3
    title:
      'Đại học Nguyễn Trãi tổ chức ngày hội hiến máu "Chia sẻ giọt đào-Trao niềm hy vọng"',
    // Không có ngày
  },
  // 6 mục xem thêm
  {
    imgSrc: "/assets/Chu-nhat-Do-2025-5-1-2048x1365.jpg", // Ảnh minh họa 4
    title: "Ngày hội 'Chủ Nhật Đỏ' 2025: Lan tỏa tinh thần nhân ái",
    date: "15/01/2025",
  },
  {
    imgSrc: "/assets/hanhtrinhdo.jpg", // Ảnh minh họa 5
    title: "Chiến dịch 'Hành Trình Đỏ' kết nối dòng máu Việt",
    date: "10/02/2025",
  },
  {
    imgSrc: "/assets/vietinbank.jpg", // Ảnh minh họa 6
    title: "Ngân hàng VietinBank tổ chức 'Ngày hội hiến máu toàn hệ thống'",
    date: "20/02/2025",
  },
  {
    imgSrc: "/assets/Giot-hong-tri-an.jpg", // Ảnh minh họa 7
    title: "Giọt máu hồng hè 2025 - Sẻ chia yêu thương",
    // Không có ngày
  },
  {
    imgSrc: "/assets/fpt.jpg", // Ảnh minh họa 8
    title: "FPT Software Đà Nẵng: 500 CBNV tham gia hiến máu nhân đạo",
    date: "28/02/2025",
  },
  {
    imgSrc: "/assets/xuanhong.jpg", // Ảnh minh họa 9
    title: "Lễ hội Xuân hồng - Trao giọt máu, gieo mầm sự sống",
    date: "05/03/2025",
  },
];

/**
 * Component Khối "Outstanding Activities"
 */
const ActivitiesSection = () => {
  // Thêm state để quản lý việc "Xem thêm"
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    // Section này có nền đỏ full-width
    <section className="mt-12 w-full bg-red-600 py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Tiêu đề */}
        <h2 className="mb-8 text-center text-3xl font-bold uppercase text-white">
          Outstanding Activities
        </h2>

        {/* Grid 3 cột cho tin tức */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Hiển thị 3 tin đầu tiên */}
          {activitiesData.slice(0, 3).map((activity, index) => (
            <ActivityCard
              key={index}
              imgSrc={activity.imgSrc}
              title={activity.title}
              date={activity.date}
            />
          ))}

          {/* Hiển thị 6 tin tiếp theo nếu showMore là true */}
          {showMore &&
            activitiesData.slice(3).map((activity, index) => (
              <ActivityCard
                key={`more-${index}`}
                imgSrc={activity.imgSrc}
                title={activity.title}
                date={activity.date}
              />
            ))}
        </div>

        {/* Nút "See more" / "Collapse" */}
        <div className="mt-10 text-center">
          <button
            onClick={toggleShowMore} // Thêm sự kiện click
            className="rounded-full border-2 border-white px-8 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-red-600"
          >
            {showMore ? "Thu gọn" : "See more"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;