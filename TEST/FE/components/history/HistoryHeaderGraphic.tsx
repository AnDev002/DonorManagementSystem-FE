// src/components/history/HistoryHeaderGraphic.tsx
"use client";

import Image from "next/image";
import {
  historyHeaderGraphicParts,
  HeaderGraphicPart,
} from "@/lib/data/historyData";
import clsx from "clsx";

/**
 * Đây là Component1 cũ, được đổi tên và gõ kiểu
 * Nó render một mảnh ghép của cái chuông
 */
const GraphicPart = ({
  width,
  height,
  top,
  left,
  zIndex,
  hasBackgroundImage,
  hasPaddingBottom,
}: HeaderGraphicPart) => (
  <Image
    style={{
      position: "absolute",
      top: top || "0px", // Xử lý giá trị undefined
      left: left || "0px", // Xử lý giá trị undefined
      zIndex: zIndex,
    }}
    className={clsx(
      // Sử dụng SvgAsset13 theo code mới
      hasBackgroundImage && "bg-[url('/assets/SvgAsset13.svg')]",
      hasPaddingBottom && "pb-[3.4px]"
    )}
    width={parseFloat(width)}
    height={parseFloat(height)}
    src="/assets/SvgAsset10.svg" // Sử dụng SvgAsset10 theo code mới
    alt="Svg Asset 10 Part"
  />
);

/**
 * Component chính cho phần graphic của header trang History
 */
const HistoryHeaderGraphic = () => {
  return (
    <div className="relative h-[61px] w-[329px]">
      {/* Lớp div chứa cái chuông (SvgAsset4) */}
      <div
        className="absolute left-[266px] z-20 flex h-[61px] w-[63px] flex-col
                   items-center justify-center bg-[url('/assets/SvgAsset4.svg')]"
      >
        <div
          className="flex h-[41.2px] w-[45.7px] -rotate-180 flex-col
                     items-center justify-between"
        >
          {/* Vùng chứa các mảnh ghép (Component1) */}
          <div className="relative h-[24.1px] w-[45.7px]">
            {historyHeaderGraphicParts.map((part, index) => (
              <GraphicPart key={index} {...part} />
            ))}
          </div>

          {/* SvgAsset5 */}
          <Image
            width={17.4}
            height={2.1}
            src="/assets/SvgAsset5.svg"
            alt="Svg Asset 5"
          />

          {/* Phần đế chuông */}
          <div className="relative h-[15.6px] w-[25.9px]">
            {/* SvgAsset6 */}
            <Image
              style={{ position: "absolute", left: "8.7px", zIndex: 20 }}
              width={17.3}
              height={15.6}
              src="/assets/SvgAsset6.svg"
              alt="Svg Asset 6"
            />
            {/* SvgAsset7, 8, 9 */}
            <div
              className="absolute z-10 flex h-[15.6px] w-[25.9px] items-center
                         justify-between bg-[url('/assets/SvgAsset7.svg')] pl-[0.4px] pr-[9.1px]"
            >
              <Image
                width={3.7}
                height={4.2}
                src="/assets/SvgAsset8.svg"
                alt="Svg Asset 8"
              />
              <Image
                width={14.2}
                height={9.7}
                src="/assets/SvgAsset9.svg"
                alt="Svg Asset 9"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Đường gạch ngang gradient */}
      <div
        className="absolute top-[40px] z-10 h-[3px] w-[300px]
                   bg-gradient-to-r from-red-700 from-50% via-red-400/36 via-80% to-transparent to-[151%]"
      ></div>
    </div>
  );
};

export default HistoryHeaderGraphic;