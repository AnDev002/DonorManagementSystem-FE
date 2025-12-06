// 📁 src/components/appointments/AppointmentHeader.tsx
'use client';
import React from 'react';
import Image from 'next/image';

// (Tên cũ: Component1)
// Component này chuyên để xử lý các icon được xếp chồng tuyệt đối
type PositionedImageProps = {
  width: string;
  height: string;
  top?: string;
  left?: string;
  zIndex: string;
  hasBackground?: boolean;
  hasPadding?: boolean;
  src: string;
  alt: string;
};

const PositionedImage: React.FC<PositionedImageProps> = ({
  width,
  height,
  top,
  left,
  zIndex,
  hasBackground,
  hasPadding,
  src,
  alt,
}) => {
  // Do tính chất chồng chéo phức tạp, một số style vẫn phải inline
  const style: React.CSSProperties = {
    position: 'absolute',
    top,
    left,
    zIndex: parseInt(zIndex, 10),
    width,
    height,
    ...(hasBackground && {
      backgroundImage: "url('/assets/SvgAsset10.svg')",
    }),
    ...(hasPadding && { paddingBottom: '3.4px' }),
  };

  return <Image style={style} src={src} alt={alt} width={0} height={0} />;
};

// Props cho data icon avatar
type AvatarIconData = {
  width: string;
  height: string;
  top?: string;
  left?: string;
  zIndex: string;
  hasBackground?: boolean;
  hasPadding?: boolean;
};

type AppointmentHeaderProps = {
  title: string;
  avatarIconData: AvatarIconData[];
};

const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({
  title,
  avatarIconData,
}) => {
  return (
    <div className="flex w-full max-w-[1280px] items-start justify-between">
      {/* Phần tiêu đề và icon back */}
      <div className="flex items-start">
        <div
          className="flex flex-col items-end justify-end bg-contain bg-no-repeat p-1"
          style={{ backgroundImage: "url('/assets/SvgAsset15.svg')" }}
        >
          <Image
            width={60}
            height={60}
            src="/assets/SvgAsset1.1.svg"
            alt="Blood Icon"
            className="h-9 w-9"
          />
        </div>
        <h1 className="ml-3.5 mt-1 font-inter text-3xl font-bold text-red-600">
          {title}
        </h1>
      </div>

     
    </div>
  );
};

export default AppointmentHeader;