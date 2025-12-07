// 📁 src/app/(admin)/.../page.tsx
'use client';

import React from 'react';

// Import các components đã được tách nhỏ
import AppointmentHeader from '@/components/appointment/AppointmentHeader';
import StatusTracker, {
  type StatusStep,
} from '@/components/appointment/StatusTracker';
import DonorInfoForm from '@/components/appointment/DonorInfoForm';
import AppointmentDetailsForm from '@/components/appointment/AppointmentDetailsForm';
import ActionButtons from '@/components/appointment/ActionButtons';

/**
 * Dữ liệu này nên được fetch từ API trong thực tế.
 * Tôi đã định nghĩa type và đổi tên biến cho dễ hiểu.
 */

// Dữ liệu cho các icon trên avatar (trước đây là data1)
const avatarIconData = [
  { width: '3.9px', height: '5.5px', top: '12.5px', left: '41.8px', zIndex: '50' },
  { width: '9px', height: '12.6px', top: '8.9px', left: '35.7px', zIndex: '40' },
  { width: '28.6px', height: '23.5px', top: '0.6px', left: '13.9px', zIndex: '30' },
  {
    width: '39.9px',
    height: '24.1px',
    left: '2.5px',
    zIndex: '20',
    hasBackground: true,
    hasPadding: true,
  },
  { width: '9px', height: '12.6px', top: '9px', zIndex: '10' },
];

// Dữ liệu cho các bước trạng thái (trước đây là data2)
const statusStepsData: StatusStep[] = [
  { text: 'Registered', minWidth: '102px', isDimmed: true, isLightFont: true },
  {
    text: 'Waiting for approval',
    minWidth: '192px',
    isDimmed: false,
    isLightFont: false,
    marginLeft: '187px',
  },
  {
    text: 'Approved',
    minWidth: '92px',
    isDimmed: true,
    isLightFont: true,
    marginLeft: '235px',
  },
];

/**
 * Component trang Update Appointment đã được refactor
 * (Tên cũ: GeneratedComponent)
 */
const UpdateAppointmentPage = () => {
  return (
    // Sử dụng Flexbox layout thay vì fixed height
    <div className="flex min-h-screen w-full flex-col items-center justify-start p-4 md:p-6 2xl:p-10">
      {/* 1. Header Section */}
      <AppointmentHeader
        title="Registered schedule"
        avatarIconData={avatarIconData}
      />

      {/* 2. Status Tracker Section */}
      <StatusTracker statusStepsData={statusStepsData} />

      {/* 3. Donor Info Form Section */}
      <DonorInfoForm />

      {/* 4. Appointment Details Form Section */}
      <AppointmentDetailsForm />

      {/* 5. Action Buttons Section */}
      <ActionButtons />
    </div>
  );
};

export default UpdateAppointmentPage;