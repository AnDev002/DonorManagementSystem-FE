// 📁 src/components/appointments/ActionButtons.tsx
import React from 'react';

const ActionButtons = () => {
  return (
    <div className="mt-16 flex items-center justify-center gap-11">
      <button
        type="button"
        className="h-14 w-32 rounded-lg bg-red-600 text-2xl font-medium text-white shadow-lg transition hover:bg-red-700"
      >
        Update
      </button>
      <button
        type="button"
        className="h-14 w-32 rounded-lg bg-white text-2xl font-medium text-black shadow-lg transition hover:bg-gray-100"
      >
        Cancel
      </button>
    </div>
  );
};

export default ActionButtons;