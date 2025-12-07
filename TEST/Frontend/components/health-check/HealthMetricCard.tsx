import React from 'react';

interface HealthMetricCardProps {
  label: string;
  value: string | number;
  className?: string;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  label,
  value,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {/* Label */}
      <div className="font-bold text-xl text-black uppercase dark:text-white">
        {label}
      </div>
      
      <div className="flex h-[90px] w-full items-center justify-center rounded-xl bg-[#CF2222] px-6 shadow-sm">
        <span className="text-4xl font-bold text-white whitespace-nowrap">
          {value}
        </span>
      </div>
    </div>
  );
};

export default HealthMetricCard;