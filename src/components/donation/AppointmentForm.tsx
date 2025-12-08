"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "../form/date-picker";
import Label from "../form/Label";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";
import { CombinedAppointmentForm } from "@/types/appointment"; 
import { LocationService } from "@/services/LocationService"; // <-- Import mới

interface Props {
  data: CombinedAppointmentForm;
  onUpdate: (field: keyof CombinedAppointmentForm, value: any) => void;
}

const AppointmentForm: React.FC<Props> = ({ data, onUpdate }) => {
  const [locations, setLocations] = useState<{value: string, label: string}[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch danh sách địa điểm khi component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const sites = await LocationService.getActiveSites();
        const options = sites.map(site => ({
          value: site.id.toString(), // Select component thường dùng value string
          label: `${site.name} - ${site.address}`
        }));
        setLocations(options);
      } catch (error) {
        console.error("Failed to load locations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  return (
    <form action="#" className="flex flex-col gap-5">
      <div>
        <Label htmlFor="appointmentDate">Appointment Date</Label>
        <DatePicker
          id="appointmentDate"
          value={data.appointmentDate}
          onChange={(dateStr: string) => onUpdate("appointmentDate", dateStr)}
        />
      </div>
      <div>
        <Label htmlFor="appointmentLocation">Location</Label>
        {loading ? (
            <p className="text-sm text-gray-500">Loading locations...</p>
        ) : (
            <Select
            id="appointmentLocation"
            // Lưu ý: data.location bây giờ sẽ lưu ID dạng string
            value={data.location} 
            onChange={(value: string) => onUpdate("location", value)}
            options={locations}
            placeholder="Select donation site"
            />
        )}
      </div>
      <div>
        <Label htmlFor="appointmentNotes">Notes</Label>
        <TextArea
          id="appointmentNotes"
          placeholder="Additional notes (optional)..."
          rows={4}
          value={data.notes}
          onChange={(value: string) => onUpdate("notes", value)}
        />
      </div>
    </form>
  );
};

export default AppointmentForm;