
import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tag?: string;
  tagColor?: string;
  hasNotification?: boolean;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  icon, 
  title, 
  subtitle, 
  tag, 
  tagColor, 
  hasNotification = false,
  children 
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 relative">
      {hasNotification && (
        <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-cyan-500"></div>
      )}
      <div className="flex items-start">
        <div className="mr-4">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
            {tag && (
              <span className={`text-xs font-medium px-2 py-1 rounded ${tagColor}`}>
                {tag}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;
