// src/app/(admin)/(others-pages)/history/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
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
import useGoBack from "@/hooks/useGoBack";
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

export default function HistoryDetailPage({ params }: { params: { id: string } }) {
  const goBack = useGoBack();
  const { id } = params;

  // State lưu dữ liệu
  const [details, setDetails] = useState<DonationDetail[]>([]);
  const [journeySteps, setJourneySteps] = useState<JourneyStepData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Gọi API lấy chi tiết lịch hẹn theo ID
        const data = await AppointmentService.getAppointmentById(id);

        if (!data) {
          setError("Không tìm thấy thông tin lịch hẹn.");
          return;
        }

        // Format ngày tháng
        const dateObj = new Date(data.appointmentDate);
        const dateString = dateObj.toLocaleDateString("vi-VN");
        const timeString = dateObj.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        });

        // 2. Map dữ liệu vào bảng chi tiết (Details Row)
        const mappedDetails: DonationDetail[] = [
          {
            label: "Day:",
            value: dateString,
            isLabelBold: false,
            isLabelInset: true,
          },
          {
            label: "Time:",
            value: timeString, // Thêm giờ
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
            label: "Donor Name:", // Thêm tên người hiến
            value: data.name,
            isLabelBold: false,
            isLabelInset: false,
          },
          // Ghi chú: Nếu có thông tin thể tích/cân nặng từ API thì map vào đây
          // Hiện tại AppointmentData cơ bản chưa có Volume kết quả, có thể để placeholder hoặc ẩn
        ];

        setDetails(mappedDetails);

        // 3. Map dữ liệu vào Hành trình (Blood Journey)
        // Lưu ý: Các bước sau 'Donate blood' đang là giả lập dựa trên ngày hiến
        const nextDay = new Date(dateObj);
        nextDay.setDate(dateObj.getDate() + 1);
        const nextDayString = nextDay.toLocaleDateString("vi-VN");

        setJourneySteps([
          {
            icon: DropletIcon,
            iconAlt: "Donate blood",
            title: "Donate blood",
            date: dateString, // Ngày thực tế
            showConnector: true,
          },
          {
            icon: WarehouseIcon,
            iconAlt: "Warehouse",
            title: "Processing & Storage",
            date: dateString, // Giả lập cùng ngày
            showConnector: true,
          },
          {
            icon: TruckIcon,
            iconAlt: "Distribution",
            title: "Ready for Distribution",
            date: nextDayString, // Giả lập ngày hôm sau
            showConnector: false,
          },
        ]);

      } catch (err) {
        console.error(err);
        setError("Lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">Loading details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={goBack} size="sm">Back</Button>
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

      <div className="w-full flex justify-center mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={goBack}
          startIcon={<ChevronLeftIcon />}
        >
          Back to History
        </Button>
      </div>
    </div>
  );
}