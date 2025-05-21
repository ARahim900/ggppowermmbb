
import React from 'react';
import Sidebar from '@/components/Sidebar';

const ElectricityDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState('Electricity Analysis');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />
      
      <div className="flex-1 overflow-y-auto">
        <header className="bg-[#4E4456] text-white p-6">
          <h1 className="text-2xl font-bold">Electricity Analysis Dashboard</h1>
          <p className="text-gray-300">Power Consumption and Distribution Monitoring</p>
        </header>
        
        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Electricity Management</h2>
            <p className="text-gray-500">This dashboard is under construction. Coming soon!</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ElectricityDashboard;
