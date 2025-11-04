import React from 'react';
import Image from 'next/image';
import { AnimatedBloodLogo } from '@/components/icons/AnimatedBloodLogo';

/**
 * Header cho trang Đăng ký hiến máu.
 * Đã cập nhật typography và spacing.
 */
const DonationPageHeader: React.FC = () => {
  return (
    <header className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-8 mb-12">
      {/* Tiêu đề */}
      <div className="flex flex-shrink-0 items-center gap-3">
        <Image
          width={35}
          height={35}
          src="/assets/SvgAsset1.1.svg"
          alt="Blood Icon"
          className="h-9 w-9"
        />
        <h1 className="font-inter text-center text-2xl font-bold text-red-600 md:text-left md:text-3xl">
          Register blood donation appointment
        </h1>
      </div>

    </header>
  );
};

export default DonationPageHeader;