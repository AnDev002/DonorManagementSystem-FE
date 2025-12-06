// src/types/donation.ts
export type BloodType = 'A' | 'B' | 'AB' | 'O';

export interface DonationRecord {
  id: string | number;
  name: string;
  date: string;       // DD/MM/YYYY
  volume: string;     // e.g. "250 mL"
  bloodType: BloodType;
  status?: 'Completed' | 'Pending'; // Tùy chọn thêm
}