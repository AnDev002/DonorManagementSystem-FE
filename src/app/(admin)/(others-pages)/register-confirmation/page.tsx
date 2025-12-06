"use client";
import React, { useEffect, useState } from "react";
import DonorListTable from "@/components/blood-inventory/DonorListTable"; 
import { AppointmentService } from "@/services/AppointmentService";

export default function RegisterConfirmationPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch danh sách Pending
  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await AppointmentService.getPendingAppointments();
      // Map dữ liệu từ Backend Appointment sang cấu trúc Donor của Table
      const mappedData = res.map((apt: any) => ({
        id: apt.id,
        code: `APT-${apt.id}`,
        name: apt.name, // hoặc apt.user?.name
        address: apt.location,
        age: calculateAge(apt.dob), // Cần hàm tính tuổi
        bloodType: apt.bloodType || 'Unknown',
      }));
      setData(mappedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // 2. Xử lý Accept
  const handleAccept = async (item: any) => {
    if (confirm(`Approve donor ${item.name}?`)) {
      try {
        await AppointmentService.updateStatus(item.id, 'Confirmed');
        alert("Approved successfully!");
        fetchPending(); // Reload list
      } catch (err) {
        alert("Failed to approve");
      }
    }
  };

  // 3. Xử lý Reject
  const handleReject = async (item: any) => {
    if (confirm(`Reject donor ${item.name}?`)) {
      try {
        await AppointmentService.updateStatus(item.id, 'Rejected');
        alert("Rejected successfully!");
        fetchPending(); // Reload list
      } catch (err) {
        alert("Failed to reject");
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 2xl:p-10">
     
      {loading ? <p>Loading...</p> : (
        <DonorListTable 
          data={data}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  );
}