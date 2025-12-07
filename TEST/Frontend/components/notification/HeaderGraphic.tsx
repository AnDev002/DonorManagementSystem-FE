// src/components/notification/HeaderGraphic.tsx
"use client";

import Image from "next/image";
import { headerGraphicParts, HeaderGraphicPart } from "@/lib/data/notificationData";
import clsx from "clsx"; // Thư viện tiện ích để nối class có điều kiện

/**
 * Đây là Component1 cũ, được đổi tên và gõ kiểu
 * Nó chỉ được sử dụng nội bộ trong HeaderGraphic
 */
const GraphicPart = ({
  width,
  height,
  top,
  left,
  zIndex,
  hasBackgroundImage,
  hasPaddingBottom,
  imageSrc,
  alt,
}: HeaderGraphicPart) => (
  <Image
    // style được giữ lại cho các giá trị top/left/zIndex động
    style={{
      position: "absolute",
      top: top,
      left: left,
      zIndex: zIndex,
    }}
    // class được dùng cho các style tĩnh/có điều kiện
    className={clsx(
      hasBackgroundImage && "bg-[url('/assets/SvgAsset10.svg')]",
      hasPaddingBottom && "pb-[3.4px]"
    )}
    width={parseFloat(width)}
    height={parseFloat(height)}
    src={imageSrc}
    alt={alt}
  />
);

/**
 * Component chính cho phần graphic của header
 * ĐÃ CẬP NHẬT: Thêm w-full và max-w-[329px] để responsive
 */
const HeaderGraphic = () => {
  return (
    // Thêm w-full, max-w, và md:ml-auto để căn phải trên desktop
    <div className="relative h-[61px] w-full max-w-[329px] md:ml-auto">
      {/* Lớp div chứa cái chuông */}
      <div
        className="absolute left-[266px] z-20 flex h-[61px] w-[63px] flex-col
                   items-center justify-center bg-[url('/assets/SvgAsset1.svg')]"
        // Căn chỉnh cái chuông sang phải cùng với vạch gradient
        style={{ left: "calc(100% - 63px)" }}
      >
        <div
          className="flex h-[41.2px] w-[45.7px] -rotate-180 flex-col
                     items-center justify-between"
        >
          {/* Vùng chứa các mảnh ghép của chuông */}
          <div className="relative h-[24.1px] w-[45.7px]">
            {headerGraphicParts.map((part, index) => (
              <GraphicPart
                key={index}
                id={index}
                {...part}
                imageSrc="/assets/SvgAsset7.svg"
                alt="Svg Asset 7 Part"
              />
            ))}
          </div>

          <Image
            width={17.4}
            height={2.1}
            src="/assets/SvgAsset2.svg"
            alt="Svg Asset 2"
          />

          {/* Phần đế chuông */}
          <div className="relative h-[15.6px] w-[25.9px]">
            <Image
              style={{ position: "absolute", left: "8.7px", zIndex: 20 }}
              width={17.3}
              height={15.6}
              src="/assets/SvgAsset3.svg"
              alt="Svg Asset 3"
            />
            <div
              className="absolute z-10 flex h-[15.6px] w-[25.9px] items-center
                         justify-between bg-[url('/assets/SvgAsset4.svg')] pl-[0.4px] pr-[9.1px]"
            >
              <Image
                width={3.7}
                height={4.2}
                src="/assets/SvgAsset5.svg"
                alt="Svg Asset 5"
              />
              <Image
                width={14.2}
                height={9.7}
                src="/assets/SvgAsset6.svg"
                alt="Svg Asset 6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Đường gạch ngang gradient (căn phải) */}
      <div
        className="absolute right-0 top-[40px] z-10 h-[3px] w-full max-w-[300px]
                   bg-gradient-to-r from-red-700 from-50% via-red-400/36 via-80% to-transparent to-[151%]"
      ></div>
    </div>
  );
};

export default HeaderGraphic;