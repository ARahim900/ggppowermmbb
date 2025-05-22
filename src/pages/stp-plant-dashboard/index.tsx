
import React from 'react';
import { Home } from 'lucide-react';

const STPPlantDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">STP Plant Dashboard</h1>
        <p className="text-gray-600 mb-6">This page is currently under construction.</p>
        <p className="text-gray-500 mb-8">STP Plant monitoring and analysis tools will be available soon.</p>
        <div className="flex justify-center">
          <a 
            href="/" 
            className="flex items-center px-4 py-2 bg-[#4E4456] text-white rounded-lg hover:bg-[#5c5266] transition-colors"
          >
            <Home size={18} className="mr-2" />
            <span>Return to Dashboard</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default STPPlantDashboard;
