"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import AppSidebar from "@/components/admin/layout/AppSidebar";
import AppHeader from "@/components/admin/layout/AppHeader";
import { Droplet, Calendar, Activity, MapPin } from "lucide-react";
import { ReportService } from "@/services/ReportService";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StatCard = ({ label, value, icon: Icon, color, bg }: any) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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

export default function ReportingPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await ReportService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  // --- Config Biểu đồ ---
  const monthlySeries = [{ name: "Donations", data: stats?.monthlyStats?.map((s: any) => s.count) || [] }];
  const monthlyOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "'Inter', sans-serif" },
    colors: ["#465FFF"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "40%" } },
    dataLabels: { enabled: false },
    xaxis: { categories: stats?.monthlyStats?.map((s: any) => s.month) || [] },
    grid: { borderColor: "#F3F4F6", strokeDashArray: 4 },
  };

  const donutSeries = stats?.bloodTypeStats?.map((s: any) => s.count) || [];
  const donutLabels = stats?.bloodTypeStats?.map((s: any) => s.type) || [];
  const bloodTypeOptions: ApexOptions = {
    chart: { type: "donut", fontFamily: "'Inter', sans-serif" },
    labels: donutLabels,
    colors: ["#D92D20", "#F97066", "#FDB022", "#32D583", "#465FFF"],
    legend: { position: "bottom" },
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-inter">
      <AppSidebar />
      <div className="flex flex-1 flex-col lg:ml-[290px]">
        <AppHeader />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-8">
             <h1 className="text-2xl font-bold text-gray-900">Report and Analysis</h1>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard label="Total Inventory" value={loading ? "..." : (stats?.totalInventory ?? 0)} icon={Droplet} color="text-red-600" bg="bg-red-100" />
            <StatCard label="Donations This Month" value={loading ? "..." : (stats?.donationsThisMonth ?? 0)} icon={Activity} color="text-blue-600" bg="bg-blue-100" />
            <StatCard label="Appointments This Week" value={loading ? "..." : (stats?.appointmentsThisWeek ?? 0)} icon={Calendar} color="text-purple-600" bg="bg-purple-100" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
              <h3 className="mb-6 text-lg font-bold text-gray-900">Total Blood Donations (Last 6 Months)</h3>
              <div className="h-[350px] w-full">
                {!loading && <ReactApexChart options={monthlyOptions} series={monthlySeries} type="bar" height="100%" />}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-bold text-gray-900">Inventory by Blood Type</h3>
              <div className="flex h-[350px] items-center justify-center">
                {!loading && (donutSeries.length > 0 ? <ReactApexChart options={bloodTypeOptions} series={donutSeries} type="donut" width="100%" /> : <p className="text-gray-400">No data</p>)}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}