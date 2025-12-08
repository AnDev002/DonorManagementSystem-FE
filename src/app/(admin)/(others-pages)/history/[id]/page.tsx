// src/app/(admin)/(others-pages)/history/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // <-- IMPORT useParams
import HistoryHeaderGraphic from "@/components/history/HistoryHeaderGraphic";
import {
  DonationDetailRow,
  BloodJourneyStep,
} from "@/components/history/HistoryDetailComponents";
import Button from "@/components/ui/button/Button";
import {
  ChevronLeftIcon,
  HistoryIcon,
  DropletIcon,
  WarehouseIcon,
  TruckIcon,
  PackageIcon,
} from "@/icons";
import { AppointmentService } from "@/services/AppointmentService";
import { DonationDetail } from "@/types/history";

// Interface cho Step hành trình
interface JourneyStepData {
  icon: any;
  iconAlt: string;
  title: string;
  date: string;
  showConnector: boolean;
}

export default function HistoryDetailPage() {
  const router = useRouter();
  const params = useParams(); // <-- SỬ DỤNG HOOK useParams
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  // State lưu dữ liệu
  const [details, setDetails] = useState<DonationDetail[]>([]);
  const [journeySteps, setJourneySteps] = useState<JourneyStepData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Nếu không có ID, tắt loading và báo lỗi ngay
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Gọi API
        const data = await AppointmentService.getAppointmentById(id);

        if (!data) {
          setError("Appointment information not found.");
          return;
        }

        // --- Xử lý dữ liệu hiển thị ---
        const dateObj = new Date(data.appointmentDate);
        const dateString = dateObj.toLocaleDateString("en-GB");
        const timeString = dateObj.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });

        // 1. Map thông tin chi tiết
        const mappedDetails: DonationDetail[] = [
          {
            label: "Day:",
            value: dateString,
            isLabelBold: false,
            isLabelInset: true,
          },
          {
            label: "Time:",
            value: timeString,
            isLabelBold: false,
            isLabelInset: true,
          },
          {
            label: "Location:",
            value: data.location,
            isLabelBold: false,
            isLabelInset: false,
          },
          {
            label: "Type:",
            value: data.bloodType ? `Blood Type ${data.bloodType}` : "Whole Blood",
            isLabelBold: false,
            isLabelInset: true,
          },
          {
            label: "Donor Name:",
            value: data.name,
            isLabelBold: false,
            isLabelInset: false,
          },
        ];
        setDetails(mappedDetails);

        // 2. Map hành trình (Giả lập các bước sau bước 1)
        const nextDay = new Date(dateObj);
        nextDay.setDate(dateObj.getDate() + 1);
        const nextDayString = nextDay.toLocaleDateString("en-GB");

        setJourneySteps([
          {
            icon: DropletIcon,
            iconAlt: "Donate blood",
            title: "Donate blood",
            date: dateString,
            showConnector: true,
          },
          {
            icon: WarehouseIcon,
            iconAlt: "Warehouse",
            title: "Processing & Storage",
            date: dateString,
            showConnector: true,
          },
          {
            icon: TruckIcon,
            iconAlt: "Distribution",
            title: "Ready for Distribution",
            date: nextDayString,
            showConnector: false,
          },
        ]);

      } catch (err) {
        console.error(err);
        setError("Connection error or failed to load data.");
      } finally {
        setLoading(false); // Luôn tắt loading dù thành công hay thất bại
      }
    };

    fetchData();
  }, [id]);

  // Xử lý nút Back
  const handleGoBack = () => router.back();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
          <p className="text-gray-500 font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-red-500 font-semibold text-lg">{error}</p>
        <Button onClick={handleGoBack} size="sm" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100">
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-6xl h-auto px-4 py-6 mx-auto">
      
      <header className="flex flex-wrap items-center justify-between w-full gap-4">
        <div className="flex items-center gap-2">
          <HistoryIcon className="w-8 h-8 text-red-600" />
          <h1 className="font-inter text-3xl min-w-[108px] whitespace-nowrap text-red-600 leading-6 font-bold">
            History Detail #{id}
          </h1>
        </div>
        <HistoryHeaderGraphic />
      </header>

      {/* BLOCK 1: DETAILS */}
      <div className="bg-red-600/10 dark:bg-red-900/20 mt-8 flex flex-col w-full h-auto p-6 md:p-8 rounded-xl shadow-lg">
        <h2 className="font-inter text-xl whitespace-nowrap text-black dark:text-white leading-6 font-bold">
          Donation Information
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-0 md:px-4">
          {details.map((detail, index) => (
            <DonationDetailRow key={index} {...detail} />
          ))}
        </div>
      </div>

      {/* BLOCK 2: JOURNEY */}
      <div className="bg-red-600/10 dark:bg-red-900/20 mt-8 flex flex-col md:flex-row justify-between items-start p-6 md:p-8 w-full h-auto rounded-xl shadow-lg overflow-hidden relative">
        <div className="flex flex-col justify-start items-start w-full max-w-lg">
          <h3 className="font-inter text-xl whitespace-nowrap text-black dark:text-white leading-none font-bold">
            Blood Unit Journey
          </h3>
          <div className="mt-6 ml-1 flex flex-col gap-4">
            {journeySteps.map((step, index) => (
              <BloodJourneyStep
                key={index}
                icon={step.icon}
                iconAlt={step.iconAlt}
                title={step.title}
                date={step.date}
                showConnector={step.showConnector}
              />
            ))}
          </div>
        </div>

        {/* Decoration Icon */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 hidden md:block self-end md:absolute md:bottom-0 md:right-0 md:-mr-8 md:-mb-8 opacity-10 text-red-900/50">
          <PackageIcon className="w-full h-full" strokeWidth={0.5} />
        </div>
      </div>

      <div className="w-full flex justify-center mt-8 pb-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleGoBack}
          startIcon={<ChevronLeftIcon />}
        >
          Back to History
        </Button>
      </div>
    </div>
  );
}