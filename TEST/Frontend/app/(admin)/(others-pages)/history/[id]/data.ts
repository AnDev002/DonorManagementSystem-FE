import { DonationDetail, JourneyStep } from "@/types/history";

/**
 * Dữ liệu cho các hàng chi tiết (Key-Value)
 * (Gộp từ data2 và data3 cũ)
 * data2[0] ("First blood donation") được dùng làm tiêu đề
 * UI Fix: Removed labelMarginTop
 */
export const donationDetails: DonationDetail[] = [
  {
    label: "Day:",
    value: "01/02/2024",
    isLabelBold: false,
    isLabelInset: true,
  },
  {
    label: "Location:",
    value: "Bach Mai Hospital",
    isLabelBold: false,
    isLabelInset: false,
  },
  {
    label: "Amount of blood:",
    value: "200ml",
    isLabelBold: false,
    isLabelInset: false,
  },
  {
    label: "Type:",
    value: "Platelets",
    isLabelBold: false,
    isLabelInset: true,
  },
  {
    label: "Weight:",
    value: "45kg",
    isLabelBold: false,
    isLabelInset: true,
  },
];

/**
 * Dữ liệu cho các bước "Hành trình đơn vị máu"
 * (Lấy từ code JSX)
 */
export const bloodJourneySteps: JourneyStep[] = [
  {
    iconSrc: "/assets/SvgAsset3.svg",
    iconAlt: "Svg Asset 3",
    title: "Donate blood",
    date: "01/02/2024",
    showConnector: true,
  },
  {
    iconSrc: "/assets/SvgAsset2.svg",
    iconAlt: "Svg Asset 2",
    title: "Warehouse",
    date: "01/02/2024",
    showConnector: true,
  },
  {
    iconSrc: "/assets/SvgAsset1.svg",
    iconAlt: "Svg Asset 1",
    title: "Export to VietDuc University Hospital",
    date: "02/02/2024",
    showConnector: false,
  },
];