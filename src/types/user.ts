// FrontendNext/types/user.ts
export enum RoleDto {
  Admin = 'Admin',
  Donor = 'Donor',
  Doctor = 'Doctor',
}

export interface User {
  id: number;
  username: string;
  name?: string;
  role: 'Admin' | 'Doctor' | 'Donor';
  avatarUrl?: string;
  donorProfile?: {
    id: number;
    phone?: string;
    bloodType?: string;
    rhType?: string;
    address?: string;
    dateOfBirth?: string;
  };
}