"use client";
import React from "react";
import DonorListTable from "@/components/blood-inventory/DonorListTable"; 
import { Donor } from "@/types/index";

export default function RegisterConfirmationPage() {
  
  const handleDetailClick = (item: Donor) => {
    console.log("View detail:", item);
    // Logic mở modal chi tiết
  };

  const handleAccept = (item: Donor) => {
    if (confirm(`Are you sure you want to ACCEPT donor ${item.name}?`)) {
      console.log("Accepted:", item.id);
      // Gọi API approve
    }
  };

  const handleReject = (item: Donor) => {
    if (confirm(`Are you sure you want to REJECT donor ${item.name}?`)) {
      console.log("Rejected:", item.id);
      // Gọi API reject
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6 2xl:p-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Confirmation
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <a className="font-medium" href="/">Dashboard /</a>
            </li>
            <li className="font-medium text-red-600">Confirmation</li>
          </ol>
        </nav>
      </div>

      <div className="flex flex-col gap-10">
        <DonorListTable 
          // onAddClick={...} // Có thể bỏ nếu trang này chỉ để duyệt
          onDetailClick={handleDetailClick}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}