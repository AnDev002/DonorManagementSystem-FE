// src/app/(admin)/page.tsx
import type { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation";
import { getServerToken } from "@/lib/auth.server";
import HomePage from "./(others-pages)/homepage/page"; // Đây là component bạn muốn hiển thị

// 1. Giữ lại metadata (vì đây là Server Component, không có "use client")
export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Page() {
  
  // 2. Giữ lại logic xác thực (nếu bạn vẫn cần)
  // const token = await getServerToken();  
  // console.log('token', token);
  // if (!token) redirect('/signin');

  // 3. Render HomePage thay vì các component E-commerce
  return (
    <HomePage />
  );
}