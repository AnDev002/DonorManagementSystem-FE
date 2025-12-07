// Frontend/components/donation/DonationFormActions.tsx
import React from 'react';
import Button from '@/components/ui/button/Button'; // Import Button chuẩn

// --- BƯỚC 1: ĐỊNH NGHĨA PROPS ---
interface Props {
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * Các nút hành động (Register, Cancel) cho form.
 * Đã cập nhật để dùng component Button chuẩn.
 */
// --- BƯỚC 2: Nhận props ---
const DonationFormActions: React.FC<Props> = ({ 
  isSubmitting, 
  onSubmit, 
  onCancel 
}) => {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <Button
        type="button" // Dùng 'button' vì logic submit nằm ở component cha
        size="md"
        className="w-full bg-red-600 px-10 text-base font-medium hover:bg-red-700 sm:w-auto"
        onClick={onSubmit} // <-- SỬA
        disabled={isSubmitting} // <-- SỬA
      >
        {isSubmitting ? "Đang gửi..." : "Register"}
      </Button>
      <Button
        type="button"
        size="md"
        variant="outline"
        className="w-full px-10 text-base font-medium sm:w-auto"
        onClick={onCancel} // <-- SỬA
        disabled={isSubmitting} // <-- SỬA
      >
        Cancel
      </Button>
    </div>
  );
};

export default DonationFormActions;