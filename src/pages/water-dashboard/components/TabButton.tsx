
import React from 'react';

interface TabButtonProps {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
  THEME: any;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, title, active, onClick }) => {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-3 md:px-6 md:py-4 transition-colors text-sm md:text-base ${
        active ? 'text-[#4E4456] font-semibold border-b-2 border-[#8ED2D6]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default TabButton;
