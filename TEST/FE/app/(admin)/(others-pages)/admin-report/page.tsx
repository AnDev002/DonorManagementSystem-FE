"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import AppSidebar from "@/components/admin/layout/AppSidebar";
import AppHeader from "@/components/admin/layout/AppHeader";
import { Droplet, Calendar, Users, MapPin, Activity } from "lucide-react";

// Dynamically import Chart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// --- MOCK DATA ---
const STATS_DATA = [
  { label: "Total Blood Donations", value: "2,207", icon: Droplet, color: "text-red-600", bg: "bg-red-100" },
  { label: "Donates This Month", value: "180", icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Appointments This Week", value: "12", icon: Calendar, color: "text-purple-600", bg: "bg-purple-100" },
];

// --- CHART CONFIGURATIONS ---

// 1. Monthly Donations (Bar Chart)
const monthlyDonationsOptions: ApexOptions = {
  chart: { type: "bar", toolbar: { show: false }, fontFamily: "'Inter', sans-serif" },
  colors: ["#465FFF"],
  plotOptions: {
    bar: { borderRadius: 4, columnWidth: "40%" },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  grid: { borderColor: "#F3F4F6", strokeDashArray: 4 },
  tooltip: { theme: "light" },
};

const monthlyDonationsSeries = [{
  name: "Donations",
  data: [20, 30, 10, 20, 30, 20, 10, 10] // Data extracted from your snippet
}];

// 2. Blood Type Distribution (Donut Chart)
const bloodTypeOptions: ApexOptions = {
  chart: { type: "donut", fontFamily: "'Inter', sans-serif" },
  labels: ["Type A", "Type B", "Type O", "Type AB", "Rare"],
  colors: ["#D92D20", "#F97066", "#FDB022", "#32D583", "#465FFF"], // Red, Light Red, Yellow, Green, Blue
  plotOptions: {
    pie: { donut: { size: "65%" } }
  },
  dataLabels: { enabled: false },
  legend: { position: "bottom" },
  tooltip: { theme: "light" },
};

const bloodTypeSeries = [50, 40, 30, 20, 10]; // Data extracted from your snippet

// 3. Donation Locations (Bar Chart - Horizontal)
const locationOptions: ApexOptions = {
  chart: { type: "bar", toolbar: { show: false }, fontFamily: "'Inter', sans-serif" },
  plotOptions: {
    bar: { horizontal: true, borderRadius: 4, barHeight: "50%" }
  },
  colors: ["#D92D20"],
  dataLabels: { enabled: false },
  xaxis: { categories: ["Trinh Van Bo", "Lang Sinh Vien", "Hoa Lac", "Xuan Thuy"] },
  grid: { borderColor: "#F3F4F6", strokeDashArray: 4 },
  tooltip: { theme: "light" },
};

const locationSeries = [{
  name: "Donors",
  data: [40, 30, 20, 10] // Data extracted from your snippet
}];

// --- COMPONENTS ---

const StatCard = ({ label, value, icon: Icon, color, bg }: { label: string, value: string, icon: any, color: string, bg: string }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h4 className="mt-2 text-3xl font-bold text-gray-900">{value}</h4>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${bg} ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function ReportingPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* 1. Sidebar */}
      <AppSidebar />

      {/* 2. Main Content */}
      <div className="flex flex-1 flex-col lg:ml-[290px]">
        {/* Header */}
        <AppHeader />

        <main className="flex-1 p-6 lg:p-8">
          {/* Page Title */}
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report and Analysis</h1>
              <p className="text-sm text-gray-500">Overview of blood donation activities and statistics.</p>
            </div>
            <div className="flex gap-3">
               {/* Date Filter Button Mockup */}
               <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                 <Calendar size={16} />
                 This Month
               </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STATS_DATA.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            
            {/* Chart 1: Monthly Trends */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
              <h3 className="mb-6 text-lg font-bold text-gray-900">Total Blood Donations (Last 8 Months)</h3>
              <div className="h-[350px] w-full">
                <ReactApexChart options={monthlyDonationsOptions} series={monthlyDonationsSeries} type="bar" height="100%" />
              </div>
            </div>

            {/* Chart 2: Blood Type Distribution */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-gray-900">Blood Type Distribution</h3>
              <div className="flex h-[350px] items-center justify-center">
                <ReactApexChart options={bloodTypeOptions} series={bloodTypeSeries} type="donut" width="100%" />
              </div>
            </div>

            {/* Chart 3: Donation Locations */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <MapPin size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900">Blood Donation Locations</h3>
              </div>
              <div className="h-[300px] w-full">
                <ReactApexChart options={locationOptions} series={locationSeries} type="bar" height="100%" />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}