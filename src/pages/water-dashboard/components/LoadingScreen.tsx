import React from 'react';

interface LoadingScreenProps {
  THEME: {
    primary: string;
    secondary: string;
    // Other theme properties
  };
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ THEME }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* Animated loading icon using the theme colors */}
          <div className="absolute inset-0 border-4 border-t-[#8ED2D6] border-r-[#9A95A6] border-b-[#8ED2D6] border-l-[#9A95A6] rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-t-[#4E4456] border-r-transparent border-b-[#4E4456] border-l-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Loading Dashboard</h2>
        <p className="text-gray-500 mt-2">Please wait while we load your data...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
