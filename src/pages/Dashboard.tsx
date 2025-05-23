
import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplet, Zap, Building2, Users, Settings, Bell, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import MainNavigation from '@/components/MainNavigation';
import DashboardCard from '@/components/DashboardCard';
import StatusBox from '@/components/StatusBox';

// Mock data
const waterSupplyData = [
  { month: 'Oct', supply: 38000, distribution: 35000, consumption: 32000 },
  { month: 'Nov', supply: 35000, distribution: 31000, consumption: 25000 },
  { month: 'Dec', supply: 37000, distribution: 33000, consumption: 26000 },
  { month: 'Jan', supply: 33000, distribution: 32000, consumption: 28000 },
  { month: 'Feb', supply: 43000, distribution: 38000, consumption: 29000 },
  { month: 'Mar', supply: 37000, distribution: 34000, consumption: 29000 },
];

const electricityData = [
  { month: 'Oct-24', consumption: 135000 },
  { month: 'Nov-24', consumption: 130000 },
  { month: 'Dec-24', consumption: 132000 },
  { month: 'Jan-25', consumption: 125000 },
  { month: 'Feb-25', consumption: 105000 },
  { month: 'Mar-25', consumption: 78000 },
];

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('Monthly');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Navigation */}
      <MainNavigation />

      {/* Header */}
      <header className="bg-[#4E4456] text-white p-4 md:p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Muscat Bay Dashboard</h1>
              <p className="text-gray-300 text-sm md:text-base">Utility Management System Overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2 mr-3">
                <button className="p-2 hover:bg-white/10 rounded-full">
                  <Bell size={20} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full">
                  <Settings size={20} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full">
                  <HelpCircle size={20} />
                </button>
              </div>
              <div className="flex space-x-1 bg-white/10 rounded-lg overflow-hidden">
                <button 
                  className={`px-4 md:px-6 py-2 text-sm ${activeView === 'Weekly' ? 'bg-white text-[#4E4456]' : ''}`}
                  onClick={() => setActiveView('Weekly')}
                >
                  Weekly
                </button>
                <button 
                  className={`px-4 md:px-6 py-2 text-sm ${activeView === 'Monthly' ? 'bg-white text-[#4E4456]' : ''}`}
                  onClick={() => setActiveView('Monthly')}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">System Performance Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Water Analytics Card */}
          <Link to="/water-dashboard" className="transform hover:scale-105 transition-transform">
            <DashboardCard
              icon={<Droplet className="text-blue-500" size={24} />}
              title="Water Analytics"
              subtitle="Water supply and consumption metrics"
              tag="L1"
              tagColor="bg-blue-100 text-blue-800"
            >
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Total Loss</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">7.6</span>
                  <span className="ml-1 text-lg font-medium">%</span>
                </div>
                <p className="text-sm text-green-500 font-medium mt-1">Within target</p>
                <div className="w-full h-2 bg-blue-100 rounded-full mt-2">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '30%' }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <div>
                    <p>Supply:</p>
                    <p>34,915 m³</p>
                  </div>
                  <div>
                    <p>Consumption:</p>
                    <p>32,264 m³</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </Link>

          {/* Electricity Management Card */}
          <Link to="/electricity-dashboard" className="transform hover:scale-105 transition-transform">
            <DashboardCard
              icon={<Zap className="text-yellow-500" size={24} />}
              title="Electricity Management"
              subtitle="Power consumption and distribution"
              tag="92%"
              tagColor="bg-yellow-100 text-yellow-800"
            >
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Current Usage</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">78,479</span>
                  <span className="ml-1 text-sm font-medium">kWh</span>
                </div>
                <p className="text-sm text-red-500 font-medium mt-1 flex items-center">
                  <span className="mr-1">↓</span> 26.7% vs last period
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Efficiency: 92% | Peak: 14,971 kWh</p>
                </div>
              </div>
            </DashboardCard>
          </Link>

          {/* STP Plant Card */}
          <Link to="/stp-plant-dashboard" className="transform hover:scale-105 transition-transform">
            <DashboardCard
              icon={<Building2 className="text-green-500" size={24} />}
              title="STP Plant"
              subtitle="Sewage treatment performance"
              tag="High"
              tagColor="bg-green-100 text-green-800"
            >
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Efficiency</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">105.3</span>
                  <span className="ml-1 text-lg font-medium">%</span>
                </div>
                <p className="text-sm text-green-500 font-medium mt-1 flex items-center">
                  <span className="mr-1">↑</span> 6.9% decrease
                </p>
                <div className="w-full h-2 bg-green-100 rounded-full mt-2">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mt-4">
                  <div>
                    <p>Daily Flow: 16.9</p>
                    <p>m³/day</p>
                  </div>
                  <div>
                    <p>Monthly: 506</p>
                    <p>m³</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </Link>

          {/* Contractor Tracker Card */}
          <Link to="/contractor-tracker" className="transform hover:scale-105 transition-transform">
            <DashboardCard
              icon={<Users className="text-cyan-500" size={24} />}
              title="Contractor Tracker"
              subtitle="Contractor agreements and status"
              hasNotification
            >
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Active Contracts</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">5</span>
                </div>
                <p className="text-sm text-yellow-500 font-medium mt-1">2 contracts expiring soon</p>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <StatusBox label="Active" value="5" color="bg-green-100 text-green-800" />
                  <StatusBox label="Expiring" value="2" color="bg-yellow-100 text-yellow-800" />
                  <StatusBox label="Expired" value="0" color="bg-red-100 text-red-800" />
                </div>
              </div>
            </DashboardCard>
          </Link>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Water Supply vs Consumption Chart */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-1">Water Supply vs Consumption</h3>
            <p className="text-sm text-gray-500 mb-4">Trend analysis with loss percentage</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waterSupplyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} domain={[0, 'dataMax + 15000']} />
                  <Tooltip />
                  <Area type="monotone" dataKey="supply" stroke="#4E4456" fill="#4E4456" fillOpacity={0.1} name="Supply (L1)" />
                  <Area type="monotone" dataKey="distribution" stroke="#9C8AA5" fill="#9C8AA5" fillOpacity={0.1} name="Distribution (L2)" />
                  <Area type="monotone" dataKey="consumption" stroke="#36B3C2" fill="#36B3C2" fillOpacity={0.1} name="Consumption (L3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Electricity Consumption Chart */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-1">Electricity Consumption</h3>
            <p className="text-sm text-gray-500 mb-4">Monthly consumption patterns</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={electricityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 'dataMax + 40000']} />
                  <Tooltip />
                  <Bar dataKey="consumption" name="Consumption (kWh)" fill="#FFB547" barSize={40} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
