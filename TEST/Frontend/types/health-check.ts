export interface HealthMetric {
  label: string;
  value: string | number;
  unit?: string;
  isNormal?: boolean; // Tùy chọn: để highlight nếu chỉ số bất thường
}

export interface HealthCheckData {
  donorName: string;
  age: number;
  weight: number;
  bloodType: string;
  temperature: number;
  bloodPressure: string;
  heartRate: number;
  isNormal: boolean; // Trạng thái 'Normal'
  finalStatus: 'Approved' | 'Not Approved' | 'Pending';
}