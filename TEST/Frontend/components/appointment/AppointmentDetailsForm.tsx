// 📁 src/components/appointments/AppointmentDetailsForm.tsx
import React from 'react';
import FormInput from '@/components/ui/form/FormInput';
import Image from 'next/image';

// Icons (có thể tách ra file riêng nếu muốn)
const CalendarIcon = () => (
  <Image
    width={22.3}
    height={21.8}
    src="/assets/SvgAsset21.svg"
    alt="Calendar"
  />
);
const DropdownIcon = () => (
  <Image
    width={12.7}
    height={7.4}
    src="/assets/SvgAsset22.svg"
    alt="Dropdown"
    className="-rotate-90"
  />
);

const AppointmentDetailsForm = () => {
  return (
    <div className="mt-16 w-full max-w-[1267px] rounded-lg bg-red-500/10 p-12 shadow-lg">
      {/* Sử dụng Grid 2 cột */}
      <div className="grid grid-cols-1 gap-x-56 gap-y-8 md:grid-cols-2">
        {/* Cột trái */}
        <div className="flex flex-col gap-y-7">
          <h2 className="font-inter text-xl font-bold text-black">
            Choose an appointment
          </h2>
          <FormInput
            label="Province/City"
            value="Hà Nội"
            icon={<DropdownIcon />}
          />
          <FormInput label="Day" value="30/04/2025" icon={<CalendarIcon />} />
          <FormInput
            label="Additional notes if any"
            value=""
            isTextArea={true}
          />
        </div>

        {/* Cột phải */}
        <div className="flex flex-col gap-y-8 md:mt-10">
          <FormInput
            label="Blood donation locations"
            value="Bệnh viện Bạch Mai"
            icon={<DropdownIcon />}
          />
          <FormInput
            label="Time"
            value="8:00am - 10:00am"
            icon={<DropdownIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsForm;