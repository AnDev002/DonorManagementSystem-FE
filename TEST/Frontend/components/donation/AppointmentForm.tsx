// Frontend/components/donation/AppointmentForm.tsx
"use client";
import React from "react";
import DatePicker from "../form/date-picker";
import Label from "../form/Label";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";
import { CombinedAppointmentForm } from "@/types/appointment"; 

interface Props {
  data: CombinedAppointmentForm;
  onUpdate: (field: keyof CombinedAppointmentForm, value: string) => void;
}

const locationOptions = [
  { value: "Location A", label: "Địa điểm A" },
  { value: "Location B", label: "Địa điểm B" },
  { value: "Location C", label: "Địa điểm C" },
];

const AppointmentForm: React.FC<Props> = ({ data, onUpdate }) => {
  return (
    <form action="#" className="flex flex-col gap-5">
      <div>
        <Label htmlFor="appointmentDate">Ngày hẹn</Label>
        <DatePicker
          id="appointmentDate"
          value={data.appointmentDate}
          // Sửa: Lỗi "Date[] is not assignable to string"
          onChange={(dateStr: string) => onUpdate("appointmentDate", dateStr)}
        />
      </div>
      <div>
        <Label htmlFor="appointmentLocation">Địa điểm</Label>
        <Select
          id="appointmentLocation" // Prop 'id' giờ đã hợp lệ
          value={data.location}
          // SỬA LỖI: Component Select trả về 'value' (string), không phải 'event'
          onChange={(value: string) => onUpdate("location", value)}
          options={locationOptions}
          placeholder="Chọn địa điểm"
        />
      </div>
      <div>
        <Label htmlFor="appointmentNotes">Ghi chú</Label>
        <TextArea
          id="appointmentNotes"
          placeholder="Ghi chú thêm (nếu có)..."
          rows={4}
          value={data.notes}
          // SỬA LỖI: Component TextArea trả về 'value' (string), không phải 'event'
          onChange={(value: string) => onUpdate("notes", value)}
        />
      </div>
    </form>
  );
};

export default AppointmentForm;