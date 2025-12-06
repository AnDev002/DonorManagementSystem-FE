// Frontend/components/donation/DonorInfoForm.tsx
"use client";
import React from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import DatePicker from "../form/date-picker";
import { CombinedAppointmentForm } from "@/types/appointment"; 

interface Props {
  data: CombinedAppointmentForm;
  onUpdate: (field: keyof CombinedAppointmentForm, value: string) => void;
}

const bloodTypeOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

const DonorInfoForm: React.FC<Props> = ({ data, onUpdate }) => {
  return (
    <form action="#" className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Label htmlFor="donorName">Họ và Tên</Label>
        <Input
          id="donorName"
          placeholder="John Doe"
          value={data.name}
          onChange={(e) => onUpdate("name", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="donorEmail">Email</Label>
        <Input
          id="donorEmail"
          placeholder="example@gmail.com"
          type="email"
          value={data.email}
          onChange={(e) => onUpdate("email", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="donorPhone">Số điện thoại</Label>
        <Input
          id="donorPhone"
          placeholder="+123 456 7890"
          value={data.phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="donorDOB">Ngày sinh</Label>
        <DatePicker
          id="donorDOB"
          value={data.dob} 
          // Sửa: Lỗi "Date[] is not assignable to string"
          onChange={(dateStr: string) => onUpdate("dob", dateStr)} 
        />
      </div>
      <div>
        <Label htmlFor="donorBloodType">Nhóm máu</Label>
        <Select
          id="donorBloodType" // Prop 'id' giờ đã hợp lệ
          value={data.bloodType}
          // SỬA LỖI: Component Select trả về 'value' (string), không phải 'event'
          onChange={(value: string) => onUpdate("bloodType", value)}
          options={bloodTypeOptions} 
          placeholder="Chọn nhóm máu"
        />
      </div>
    </form>
  );
};

export default DonorInfoForm;