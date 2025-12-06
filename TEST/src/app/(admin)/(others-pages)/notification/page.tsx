// src/app/(admin)/(others-pages)/notification/page.tsx
import NotificationList from "@/components/notification/NotificationList";
// BƯỚC 1: Import icon (BellIcon không được dùng, nhưng giữ lại)
import { BellIcon } from "@/icons";
import Image from "next/image"; // Thêm Image

export default function NotificationPage() {
  return (
    // BƯỚC 2: Dùng layout của donation/page.tsx
    <div className="flex w-full flex-col items-center justify-start px-4 py-12">
      <div className="flex w-full max-w-6xl flex-col items-center">
        
        {/* BƯỚC 3: Dùng Header của donation/page.tsx */}
        <header className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-8 mb-12">
          <div className="flex flex-shrink-0 items-center gap-3">
            {/* Dùng Image component thay vì <img> */}
            <Image
              width={35}
              height={35}
              src="/assets/SvgAsset1.1.svg"
              alt="Notification Icon"
              className="h-9 w-9"
            />
            {/* Cập nhật H1 style cho giống donation page (font-bold, md:text-3xl) */}
            <h1 className="font-inter text-center text-2xl font-bold text-red-600 md:text-left md:text-3xl">
              Notification
            </h1>
          </div>
          {/* HeaderGraphic đã bị xóa để giống donation page */}
        </header>

        {/* BƯỚC 4: Dùng Main content wrapper của donation/page.tsx */}
        <main className="relative w-full">
          <div className="flex flex-col gap-8">
            <NotificationList />
          </div>
        </main>
      </div>
    </div>
  );
}