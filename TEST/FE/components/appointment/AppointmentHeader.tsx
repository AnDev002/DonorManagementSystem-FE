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
          className="flex h-[31.7px] w-[21.7px] flex-col items-end justify-end bg-contain bg-no-repeat p-1"
          style={{ backgroundImage: "url('/assets/SvgAsset15.svg')" }}
        >
          <Image
            width={7}
            height={12}
            src="/assets/SvgAsset16.svg"
            alt="Back"
          />
        </div>
        <h1 className="ml-3.5 mt-1 font-inter text-3xl font-bold text-red-600">
          {title}
        </h1>
      </div>

      {/* Phần Avatar Icon phức tạp */}
      <div className="relative mt-0.5 h-[61px] w-[329px]">
        <div
          className="absolute left-[266px] z-20 flex h-[61px] w-[63px] flex-col items-center justify-center bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('/assets/SvgAsset1.svg')" }}
        >
          <div
            className="flex h-[41.2px] w-[45.7px] -scale-100 flex-col items-center justify-between"
          >
            <div className="relative h-[24.1px] w-[45.7px]">
              {avatarIconData.map((item, index) => (
                <PositionedImage
                  key={index}
                  width={item.width}
                  height={item.height}
                  top={item.top}
                  left={item.left}
                  zIndex={item.zIndex}
                  hasBackground={item.hasBackground}
                  hasPadding={item.hasPadding}
                  src="/assets/SvgAsset7.svg"
                  alt="Svg Asset 7"
                />
              ))}
            </div>
            {/* ... (Các phần còn lại của icon avatar) ... */}
          </div>
        </div>
        <div
          className="absolute top-10 z-10 h-0.5 w-[300px]"
          style={{
            background:
              'linear-gradient(270deg,rgba(195,19,19,1) 50%,rgba(209,147,147,0.36) 80%,rgba(215,198,198,0.09) 141%,rgba(217,217,217,0) 151%)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default AppointmentHeader;