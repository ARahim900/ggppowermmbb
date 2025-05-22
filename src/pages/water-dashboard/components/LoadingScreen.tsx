
import React from 'react';
import { Droplet } from 'lucide-react';

const LoadingScreen = ({ THEME }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-[#4E4456] to-[#9A95A6] flex flex-col items-center justify-center text-white z-50">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Droplet size={60} className="text-[#8ED2D6] animate-pulse" />
          <div className="absolute inset-0 animate-ping rounded-full bg-[#8ED2D6] opacity-25"></div>
        </div>
        <h2 className="mt-4 text-3xl font-bold">Muscat Bay Water Management</h2>
        <div className="mt-6 w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-[#8ED2D6] animate-loadingBar rounded-full"></div>
        </div>
        <p className="mt-4 text-white/80">Loading data...</p>
      </div>
      <style jsx>{`
        @keyframes loadingBar {
          0% { width: 0; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loadingBar {
          animation: loadingBar 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
