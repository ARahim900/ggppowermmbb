
import React, { useState } from 'react';
import { Home, Database, BarChart3, Settings, HelpCircle, Download, Share2, Filter, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import TabButton from '../water-dashboard/components/TabButton';

const STPPlantDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeMonthFilter, setActiveMonthFilter] = useState('Apr-2025');
  const [activeYearFilter, setActiveYearFilter] = useState('2025');

  const THEME = {
    primary: '#9A95A6',
    secondary: '#8ED2D6',
    accent: '#4E4456',
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#4E4456] to-[#9A95A6] text-white shadow-lg">
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              {/* Logo */}
              <div className="w-8 h-8 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-3 h-8 bg-[#8ED2D6]"></div>
                <div className="absolute bottom-0 left-4 w-3 h-6 bg-[#8ED2D6]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 bg-[#8ED2D6]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                <div className="absolute bottom-0 right-0 w-8 h-3 bg-white" style={{ transform: 'skew(-45deg)', transformOrigin: 'bottom right' }}></div>
                <div className="absolute bottom-4 right-0 w-8 h-3 bg-white" style={{ transform: 'skew(-45deg)', transformOrigin: 'bottom right' }}></div>
              </div>
              <h1 className="text-xl md:text-2xl font-bold">Muscat Bay STP Plant Management</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center text-xs md:text-sm bg-white/10 rounded-full px-3 py-1 hover:bg-white/20 transition">
                <RefreshCw size={14} className="mr-1" />
                <span>Last updated: {new Date().toLocaleString()}</span>
              </button>
              <button className="flex items-center text-xs md:text-sm bg-white/10 rounded-full px-3 py-1 hover:bg-white/20 transition">
                <HelpCircle size={14} className="mr-1" />
                <span>Help</span>
              </button>
              <button className="flex items-center text-xs md:text-sm bg-white/10 rounded-full px-3 py-1 hover:bg-white/20 transition">
                <Settings size={14} className="mr-1" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto whitespace-nowrap">
            <TabButton
              icon={<BarChart3 size={18} />}
              title="Overview"
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              THEME={THEME}
            />
            <TabButton
              icon={<Database size={18} />}
              title="Performance"
              active={activeTab === 'performance'}
              onClick={() => setActiveTab('performance')}
              THEME={THEME}
            />
          </div>
        </div>
      </nav>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 gap-2">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Filters:</span>
          </div>

          {/* Month Filter */}
          <div className="flex items-center">
            <label className="text-sm text-gray-600 mr-2">Month:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8ED2D6] focus:border-[#8ED2D6] p-2"
              value={activeMonthFilter}
              onChange={(e) => setActiveMonthFilter(e.target.value)}
            >
              <option value="Jan-2025">Jan 2025</option>
              <option value="Feb-2025">Feb 2025</option>
              <option value="Mar-2025">Mar 2025</option>
              <option value="Apr-2025">Apr 2025</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex items-center">
            <label className="text-sm text-gray-600 mr-2">Year:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8ED2D6] focus:border-[#8ED2D6] p-2"
              value={activeYearFilter}
              onChange={(e) => setActiveYearFilter(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center text-xs text-gray-700 bg-gray-100 rounded px-2 py-1 hover:bg-gray-200 transition">
              <Download size={14} className="mr-1" />
              <span>Export</span>
            </button>
            <button className="flex items-center text-xs text-gray-700 bg-gray-100 rounded px-2 py-1 hover:bg-gray-200 transition">
              <Share2 size={14} className="mr-1" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">STP Plant Dashboard</h1>
            <p className="text-gray-600 mb-6">This dashboard is currently under development.</p>
            <p className="text-gray-500 mb-8">STP Plant monitoring and analysis tools will be available soon.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Current Status</h3>
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xl">Operational</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Plant Efficiency</h3>
                <div className="flex items-center justify-center">
                  <div className="text-6xl font-bold text-[#4E4456]">98%</div>
                </div>
              </div>
            </div>
            
            <Link 
              to="/" 
              className="inline-flex items-center px-4 py-2 bg-[#4E4456] text-white rounded-lg hover:bg-[#5c5266] transition-colors"
            >
              <Home size={18} className="mr-2" />
              <span>Return to Main Dashboard</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#4E4456] to-[#9A95A6] text-white p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© {new Date().getFullYear()} Muscat Bay STP Plant Management System | Version 1.0.0</p>
        </div>
      </footer>
    </div>
  );
};

export default STPPlantDashboard;
