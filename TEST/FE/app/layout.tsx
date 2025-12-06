import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/context/ClientProviders"; 

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trang chủ Hiến máu",
  description: "Quyền lợi của người hiến máu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {/* 2. Bọc toàn bộ ứng dụng bằng ClientProviders */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}