import React from "react";
import Link from "next/link";
import { HeartPulse, Droplet } from "lucide-react"; // Sử dụng icon từ thư viện
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen w-full bg-white dark:bg-gray-900 font-inter">
        
        {/* --- CỘT TRÁI: FORM --- */}
        <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 xl:w-5/12 xl:px-20">
          
          {/* Logo Mobile (Chỉ hiện trên màn nhỏ) */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
              <HeartPulse size={20} strokeWidth={3} />
            </div>
            <span className="text-2xl font-bold text-red-600 uppercase tracking-wide">
              B-Donor
            </span>
          </div>

          {/* Nội dung Form con (SignIn, SignUp...) */}
          <div className="w-full">
            {children}
          </div>

          {/* Footer bản quyền */}
          <div className="mt-10 text-center lg:text-left">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} B-Donor. All rights reserved.
            </p>
          </div>
        </div>

        {/* --- CỘT PHẢI: TRANG TRÍ (Gradient Đỏ) --- */}
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-[#B41919] to-[#8E1212]">
            
            {/* Họa tiết trang trí bằng Icon chìm */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
               <Droplet className="absolute top-10 left-10 text-white w-32 h-32 transform -rotate-12" />
               <HeartPulse className="absolute bottom-20 right-20 text-white w-64 h-64 opacity-50" />
               <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full blur-[150px] opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Nội dung giới thiệu */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-center text-white">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl border border-white/30">
                <HeartPulse size={48} className="text-white" />
              </div>
              <h2 className="mb-4 text-4xl font-bold leading-tight">
                Give Blood, <br/> Save Lives
              </h2>
              <p className="max-w-md text-lg text-red-100 font-light">
                Join our community of heroes. Your donation can make a difference in someone's life today.
              </p>
            </div>
          </div>
          
          {/* Nút đổi theme nằm góc dưới phải */}
          <div className="absolute bottom-6 right-6 z-50">
            <ThemeTogglerTwo />
          </div>
        </div>

      </div>
    </ThemeProvider>
  );
}