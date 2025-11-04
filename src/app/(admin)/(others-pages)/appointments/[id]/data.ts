import {
  IconLayer,
  StatusStep,
  StatusLabel,
  AppointmentDetail,
} from "@/types/appointment";

// Dữ liệu cho các layer của icon thông báo
export const notificationIconLayers: IconLayer[] = [
  {
    width: "3.9px",
    height: "5.5px",
    top: "12.5px",
    left: "41.8px",
    zIndex: "50",
    hasBackground: false,
    hasPadding: false,
  },
  {
    width: "9px",
    height: "12.6px",
    top: "8.9px",
    left: "35.7px",
    zIndex: "40",
    hasBackground: false,
    hasPadding: false,
  },
  {
    width: "28.6px",
    height: "23.5px",
    top: "0.6px",
    left: "13.9px",
    zIndex: "30",
    hasBackground: false,
    hasPadding: false,
  },
  {
    width: "39.9px",
    height: "24.1px",
    left: "2.5px",
    zIndex: "20",
    hasBackground: true,
    hasPadding: true,
  },
  {
    width: "9px",
    height: "12.6px",
    top: "9px",
    zIndex: "10",
    hasBackground: false,
    hasPadding: false,
  },
];

// Dữ liệu cho các icon trên thanh trạng thái
export const statusSteps: StatusStep[] = [
  {
    left: "336px",
    zIndex: "30",
    iconSrc: "/assets/SvgAsset2.3.svg",
    iconAlt: "Svg Asset 1",
  },
  {
    left: "675px",
    zIndex: "20",
    iconSrc: "/assets/SvgAsset1.3.svg",
    iconAlt: "Svg Asset 2",
  },
  {
    zIndex: "10",
    iconSrc: "/assets/SvgAsset2.3.svg",
    iconAlt: "Svg Asset 3",
  },
];

// Dữ liệu cho các nhãn trên thanh trạng thái
export const statusLabels: StatusLabel[] = [
  {
    label: "Registered",
    minWidth: "102px",
    isMuted: true,
    isNormalWeight: true,
  },
  {
    label: "Waiting for approval",
    minWidth: "192px",
    isMuted: false,
    isNormalWeight: false,
  },
  {
    label: "Approved",
    minWidth: "92px",
    isMuted: true,
    isNormalWeight: true,
  },
];

// Dữ liệu chi tiết lịch hẹn
export const appointmentDetails: AppointmentDetail[] = [
  {
    text: "Registered schedule",
    minWidth: "251px",
    isBold: true,
  },
  {
    text: "Nguyễn Mạnh Dũng (+84) 954436218",
    minWidth: "450px",
    isBold: false,
    marginTop: "45px",
  },
  {
    text: "Địa chỉ hiến máu: Bệnh viện Bạch Mai",
    minWidth: "440px",
    isBold: false,
    marginTop: "23px",
  },
  {
    text: "Thời gian cụ thể: 8h sáng ngày 30 tháng 4 năm 2025",
    minWidth: "625px",
    isBold: false,
    marginTop: "23px",
  },
];