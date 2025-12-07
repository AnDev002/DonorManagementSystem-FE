// 📁 src/components/appointments/DonorInfoForm.tsx
import React from 'react';
import FormInput from '@/components/ui/form/FormInput';
import Image from 'next/image';

// Định nghĩa các icon hay dùng
const EditIcon = () => (
  <Image
    width={8.4}
    height={9.5}
    src="/assets/SvgAsset26.svg"
    alt="Edit"
  />
);
const CalendarIcon = () => (
  <Image
    width={22.3}
    height={21.8}
    src="/assets/SvgAsset30.svg"
    alt="Calendar"
  />
);
const DropdownIcon = () => (
  <Image
    width={12.7}
    height={7.4}
    src="/assets/SvgAsset27.svg"
    alt="Dropdown"
    className="-rotate-90"
  />
);

const DonorInfoForm = () => {
  return (
    // Sử dụng Grid layout cho responsive
    <div className="relative mt-7 w-full max-w-[1267px] rounded-lg bg-red-500/10 p-12 shadow-lg">
      <h2 className="font-inter text-xl font-bold text-black">
        Blood donor information
      </h2>

      {/* Row 1: Name & Phone */}
      <div className="mt-6 grid grid-cols-1 gap-x-56 gap-y-4 md:grid-cols-2">
        <FormInput label="Name" value="Nguyễn Mạnh Dũng" icon={<EditIcon />} />
        <FormInput
          label="Phone number"
          value="0954436218"
          icon={<EditIcon />}
        />
      </div>

      {/* Row 2: Email & Birthday */}
      <div className="mt-12 grid grid-cols-1 gap-x-56 gap-y-4 md:grid-cols-2">
        <FormInput label="Email" value="Dungmanh0415@gmail.com" />
        <FormInput
          label="Birthday"
          value="05/10/1990"
          icon={<CalendarIcon />}
        />
      </div>

      {/* Row 3: Address */}
      <div className="mt-12">
        <h3 className="mb-4 font-inter text-xl font-semibold text-black">
          Address
        </h3>
        {/* Grid 3 cột cho địa chỉ */}
        <div className="grid grid-cols-1 gap-x-14 gap-y-4 md:grid-cols-3">
          <FormInput
            label="Province/City"
            value="Hà Nội"
            icon={<DropdownIcon />}
          />
          <FormInput
            label="District"
            value="Hoàn Kiếm"
            icon={<DropdownIcon />}
          />
          <FormInput label="Specific address" value="Số nhà 8, phố Hàng Buồm" />
        </div>
      </div>

      {/* Row 4: Blood Type */}
      <div className="mt-8">
        <FormInput
          label="Blood type"
          value="A"
          icon={<DropdownIcon />}
          containerClassName="w-full max-w-[340px]"
        />
      </div>

      {/* Decorative Image */}
      <div className="absolute bottom-0 right-0 z-0">
        <Image
          width={301}
          height={311}
          src="/assets/SvgAsset31.svg"
          alt=""
          className="opacity-50"
        />
      </div>
    </div>
  );
};

export default DonorInfoForm;