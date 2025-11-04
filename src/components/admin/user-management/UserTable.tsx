// src/components/admin/user-management/UserTable.tsx
import React from 'react';
import { User } from '@/context/AuthContext'; // Sửa: Dùng kiểu User
import { StatusBadge } from './StatusBadge';
import { ActionButtons } from './ActionButtons';
import { RoleDto } from '@/types/user'; 

interface UserTableProps {
  users: User[]; // Sửa: employees -> users
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const tableHeaders = [
    'No.',
    'Username',
    'Tên (Name)',
    'Vai trò (Role)',
    'Trạng thái (Status)', // Giữ lại cột này (mặc dù backend chưa có)
    'Action',
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] text-left">
        <thead>
          <tr className="bg-red-500/25">
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="p-4 font-bold uppercase text-sm text-gray-800"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Sửa: Map qua 'users' */}
          {users.map((user, index) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="p-4 text-gray-700">{index + 1}.</td>
              <td className="p-4 text-gray-700 font-medium">{user.username}</td>
              <td className="p-4 text-gray-700">{user.name || 'N/A'}</td>
              <td className="p-4 text-gray-700">{user.role}</td>
              <td className="p-4">
                {/* Giả lập trạng thái Active */}
                <StatusBadge status={'Active'} />
              </td>
              <td className="p-4">
                <ActionButtons 
                  onEdit={() => onEdit(user)}
                  onDelete={() => onDelete(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};