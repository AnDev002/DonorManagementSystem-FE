// 📁 src/components/appointments/StatusTracker.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { AlignCenter, TextAlignCenter } from 'lucide-react';

// (Tên cũ: Component3)
export type StatusStep = {
  text: string;
  minWidth: string;
  isDimmed: boolean;
  isLightFont: boolean;
  marginLeft?: string;
  isCenter?: boolean;
};

const StatusStepLabel: React.FC<StatusStep> = ({
  text,
  minWidth,
  isDimmed,
  isLightFont,
  marginLeft,
  isCenter = false,
}) => (
  <div
    className={`font-inter text-xl leading-6 ${
      isDimmed ? 'text-gray-400' : 'text-black'
    } ${isLightFont ? 'font-normal' : 'font-medium'} ${isCenter ? 'text-center' : ''}`}
    style={{
      minWidth: minWidth,
      marginLeft: marginLeft,
    }}
  >
    {text}
  </div>
);

// Props cho component chính
type StatusTrackerProps = {
  statusStepsData: StatusStep[];
};

const StatusTracker: React.FC<StatusTrackerProps> = ({ statusStepsData }) => {
  return (
    <div className="mt-4 flex w-full max-w-[808px] flex-col gap-1.5">
      {/* Thanh progress bar (Không thay đổi) */}
      <div className="relative ml-6 h-[70px] w-[754px]">
        <Image
          className="absolute left-[334px] z-20 "
          width={70}
          height={70}
          src="/assets/SvgAsset1.3.svg"
          alt="Current Step"
        />
        <div className="absolute top-[23px] z-10 h-9 w-full rounded-full bg-red-500">
          <Image
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2"
            width={20}
            height={20}
            src="/assets/SvgAsset2.3.svg"
            alt="Step 1"
          />
          <Image
            className="absolute right-4 top-1/2 z-40 -translate-y-1/2"
            width={20}
            height={20}
            src="/assets/SvgAsset2.3.svg"
            alt="Step 3"
          />
          {/* Lớp nền của thanh progress */}
          <div className="absolute left-1/2 top-1/2 z-10 h-2.5 w-[calc(100%-40px)] -translate-x-1/2 -translate-y-1/2 bg-red-200"></div>
        </div>
      </div>

      {/* Nhãn của các bước (ĐÃ SỬA) */}
      <div className="flex justify-start mt-2">
        {statusStepsData.map((step) => {
          // SỬA: Căn giữa nhãn "Waiting for approval"
          if (step.text === 'Waiting for approval') {
            // Thêm 8px vào margin-left (187px -> 195px) để căn giữa
            const modifiedStep = { ...step, marginLeft: '195px', };
            return <StatusStepLabel isCenter={true} key={modifiedStep.text} {...modifiedStep} />;
          }
          return <StatusStepLabel key={step.text} {...step} />;
        })}
      </div>
    </div>
  );
};

export default StatusTracker;