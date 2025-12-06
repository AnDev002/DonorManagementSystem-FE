// FrontendNext/types/user.ts
export enum RoleDto {
  Admin = 'Admin',
  Donor = 'Donor',
  Doctor = 'Doctor',
}

export interface User {
  id: string | number;
  name: string;
  username: string;
  role: string;
  created_at?: string; 
}