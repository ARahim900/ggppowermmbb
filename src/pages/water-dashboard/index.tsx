import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ComposedChart, Scatter
} from 'recharts';
import {
  ArrowUpRight, ArrowDownRight, BarChart3,
  Calendar, Filter, ArrowRightLeft,
  RefreshCw, Database, Settings, AlertTriangle,
  Droplet, CircleOff, TrendingUp, TrendingDown, 
  HelpCircle, Download, Share2, Home
} from 'lucide-react';

// Main App Component
const WaterAnalysisDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeMonthFilter, setActiveMonthFilter] = useState('Apr-2025');
  const [activeYearFilter, setActiveYearFilter] = useState('2025');
  const [activeZoneFilter, setActiveZoneFilter] = useState('All Zones');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Muscat Bay color palette
  const THEME = {
    primary: '#9A95A6', // Slate purple (darker)
    primaryLight: '#ADA6B9', // Lighter slate purple
    secondary: '#8ED2D6', // Teal/aqua from logo
    secondaryLight: '#B5E4E7', // Lighter teal
    accent: '#4E4456', // Darker purple
    white: '#FFFFFF',
    gray: {
      50: '#F9F9FB',
      100: '#F1F1F4',
      200: '#E2E2E7',
      300: '#D2D2D9',
      400: '#B5B5BD',
      500: '#92929A',
      600: '#696971',
      700: '#4B4B50',
      800: '#313134',
      900: '#1C1C1E',
    }
  };

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setDataLoaded(true);
    }, 800);
  }, []);

  // Render the selected tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <OverviewSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                  activeZoneFilter={activeZoneFilter}
                  THEME={THEME}
                />;
      case 'group-details':
        return <GroupDetailsSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                  activeZoneFilter={activeZoneFilter}
                  THEME={THEME}
                />;
      case 'type-details':
        return <TypeDetailsSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                  THEME={THEME}
                />;
      case 'loss-details':
        return <LossDetailsSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                  activeZoneFilter={activeZoneFilter}
                  THEME={THEME}
                />;
      default:
        return <OverviewSection
                  activeMonthFilter={activeMonthFilter}
                  activeYearFilter={activeYearFilter}
                  activeZoneFilter={activeZoneFilter}
                  THEME={THEME}
                />;
    }
  };

  // Help modal component
  const HelpModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Dashboard Help</h3>
            <button onClick={() => setShowHelp(false)} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Overview Tab</h4>
              <p className="text-gray-600">Provides a high-level summary of water consumption data across all zones with main KPIs, monthly consumption trends, and loss analysis charts.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Group Details Tab</h4>
              <p className="text-gray-600">Displays detailed consumption analysis for specific zones, including bulk and individual meter readings with historical data.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Type Details Tab</h4>
              <p className="text-gray-600">Shows consumption breakdown by category (Irrigation, Residential Villa, Retail, etc.) to identify usage patterns.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Loss Details Tab</h4>
              <p className="text-gray-600">Focuses on water loss analysis with breakdowns by loss type and zone, helping identify problem areas.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Filters</h4>
              <p className="text-gray-600">Use the Month, Year, and Zone filters at the top to customize the data displayed across all tabs.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Terms Explained</h4>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li><span className="font-medium">L1 (Main Bulk Supply)</span>: Total water supplied to the entire system</li>
                <li><span className="font-medium">L2 (Zone Bulk Meters)</span>: Water measured at zone entry points</li>
                <li><span className="font-medium">L3 (Individual Meters)</span>: Water measured at individual customer meters</li>
                <li><span className="font-medium">Stage 1 Loss</span>: Difference between L1 and L2 (transmission losses)</li>
                <li><span className="font-medium">Stage 2 Loss</span>: Difference between L2 and L3 (distribution losses)</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200">
          <button 
            onClick={() => setShowHelp(false)} 
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Loading Screen */}
      {!dataLoaded ? (
        <LoadingScreen THEME={THEME} />
      ) : (
        <>
          {/* Help Modal */}
          {showHelp && <HelpModal />}
          
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
                  <h1 className="text-xl md:text-2xl font-bold">Muscat Bay Water Management</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button className="flex items-center text-xs md:text-sm bg-white/10 rounded-full px-3 py-1 hover:bg-white/20 transition">
                    <RefreshCw size={14} className="mr-1" />
                    <span>Last updated: {new Date().toLocaleString()}</span>
                  </button>
                  <button 
                    className="flex items-center text-xs md:text-sm bg-white/10 rounded-full px-3 py-1 hover:bg-white/20 transition"
                    onClick={() => setShowHelp(true)}
                  >
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
                  title="Group Details"
                  active={activeTab === 'group-details'}
                  onClick={() => setActiveTab('group-details')}
                  THEME={THEME}
                />
                <TabButton
                  icon={<RefreshCw size={18} />}
                  title="Type Details"
                  active={activeTab === 'type-details'}
                  onClick={() => setActiveTab('type-details')}
                  THEME={THEME}
                />
                <TabButton
                  icon={<AlertTriangle size={18} />}
                  title="Loss Details"
                  active={activeTab === 'loss-details'}
                  onClick={() => setActiveTab('loss-details')}
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
                  <option value="Jan-2024">Jan 2024</option>
                  <option value="Feb-2024">Feb 2024</option>
                  <option value="Mar-2024">Mar 2024</option>
                  <option value="Apr-2024">Apr 2024</option>
                  <option value="May-2024">May 2024</option>
                  <option value="Jun-2024">Jun 2024</option>
                  <option value="Jul-2024">Jul 2024</option>
                  <option value="Aug-2024">Aug 2024</option>
                  <option value="Sep-2024">Sep 2024</option>
                  <option value="Oct-2024">Oct 2024</option>
                  <option value="Nov-2024">Nov 2024</option>
                  <option value="Dec-2024">Dec 2024</option>
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

              {/* Zone Filter (Conditionally rendered based on activeTab) */}
              {(activeTab === 'overview' || activeTab === 'group-details' || activeTab === 'loss-details') && (
                <div className="flex items-center">
                  <label className="text-sm text-gray-600 mr-2">Zone:</label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8ED2D6] focus:border-[#8ED2D6] p-2"
                    value={activeZoneFilter}
                    onChange={(e) => setActiveZoneFilter(e.target.value)}
                  >
                    <option value="All Zones">All Zones</option>
                    <option value="Zone FM">Zone FM</option>
                    <option value="Zone 03A">Zone 03A</option>
                    <option value="Zone 03B">Zone 03B</option>
                    <option value="Zone 05">Zone 05</option>
                    <option value="Zone 08">Zone 08</option>
                    <option value="Village Square">Village Square</option>
                  </select>
                </div>
              )}
              
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
            {renderTabContent()}
          </main>

          {/* Footer */}
          <footer className="bg-gradient-to-r from-[#4E4456] to-[#9A95A6] text-white p-4">
            <div className="container mx-auto text-center">
              <p className="text-sm">© {new Date().getFullYear()} Muscat Bay Water Management System | Version 2.0.0</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

// Tab Button Component
const TabButton = ({ icon, title, active, onClick, THEME }) => {
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

// Enhanced KPI Card Component
const KPICard = ({ title, value, change, changeType, icon, trend, description, THEME }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md bg-white h-48 transition-all duration-200 hover:shadow-lg group">
      <div className={`absolute top-0 left-0 w-1 h-full ${
        trend === 'good' ? 'bg-green-500' : 
        trend === 'warning' ? 'bg-yellow-500' : 
        trend === 'critical' ? 'bg-red-500' : 
        'bg-[#8ED2D6]'
      }`}></div>
      <div className="p-6 relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-600">{title}</h3>
          <div className={`p-2 rounded-full ${
            trend === 'good' ? 'bg-green-100 text-green-600' : 
            trend === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
            trend === 'critical' ? 'bg-red-100 text-red-600' : 
            'bg-[#B5E4E7] text-[#4E4456]'
          }`}>
            {icon}
          </div>
        </div>
        <div>
          <div className="mt-4 flex items-baseline">
            <p className="text-4xl font-bold text-gray-800">{value}</p>
            <span className="ml-2 text-gray-500 text-sm">units</span>
          </div>
          <div className="mt-4 flex items-center">
            {changeType === 'increase' ? (
              <ArrowUpRight size={18} className={`${trend === 'good' ? 'text-green-500' : 'text-red-500'} mr-1`} />
            ) : (
              <ArrowDownRight size={18} className={`${trend === 'good' ? 'text-green-500' : 'text-red-500'} mr-1`} />
            )}
            <span className={`text-sm font-medium ${trend === 'good' ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
            <span className="text-gray-500 text-xs ml-2">vs. prev. month</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-0 bg-gray-100 group-hover:h-8 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Loading Screen Component with Muscat Bay styling
const LoadingScreen = ({ THEME }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#4E4456] to-[#9A95A6] text-white">
      <div className="relative w-32 h-32 mb-8">
        {/* Muscat Bay inspired logo animation */}
        <div className="absolute w-8 h-32 bg-[#8ED2D6] left-0 bottom-0 animate-pulse"></div>
        <div className="absolute w-8 h-24 bg-[#8ED2D6] left-12 bottom-0 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute w-12 h-12 bg-[#8ED2D6] right-0 top-0 animate-pulse" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)', animationDelay: '0.4s' }}></div>
        <div className="absolute w-32 h-6 bg-white bottom-0 right-0 animate-pulse" style={{ transform: 'skew(-45deg)', transformOrigin: 'bottom right', animationDelay: '0.6s' }}></div>
        <div className="absolute w-32 h-6 bg-white bottom-16 right-0 animate-pulse" style={{ transform: 'skew(-45deg)', transformOrigin: 'bottom right', animationDelay: '0.8s' }}></div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Loading Water Management System</h2>
      <p className="text-[#8ED2D6] animate-pulse">Preparing your dashboard...</p>
    </div>
  );
};

// ===== OVERVIEW SECTION =====
const OverviewSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter, THEME }) => {
  // Updated KPI data with more descriptive information
  const kpiData = {
    bulk: {
      value: '46,039',
      change: '31.8%',
      changeType: 'increase',
      trend: 'warning',
      description: 'Total water supplied to the system'
    },
    consumption: {
      value: '29,810',
      change: '30.6%',
      changeType: 'decrease',
      trend: 'good',
      description: 'Total water measured at zone level'
    },
    individualMeters: {
      value: '23,202',
      change: '35.3%',
      changeType: 'decrease',
      trend: 'good',
      description: 'Total end-user consumption'
    },
    stageOneLoss: {
      value: '16,229',
      change: '301.8%',
      changeType: 'increase',
      trend: 'critical',
      description: 'Loss between main supply and zones'
    },
    stageTwoLoss: {
      value: '6,608',
      change: '6.5%',
      changeType: 'decrease',
      trend: 'good',
      description: 'Loss between zones and end users'
    },
    totalLoss: {
      value: '22,837',
      change: '2266.1%',
      changeType: 'increase',
      trend: 'critical',
      description: 'Combined system water losses'
    }
  };

  // Sample data for charts
  const monthlyConsumptionData = [
    { name: 'Jan', L1: 32803, L2: 28076, L3: 26599 },
    { name: 'Feb', L1: 27996, L2: 25060, L3: 23011 },
    { name: 'Mar', L1: 23860, L2: 23914, L3: 20534 },
    { name: 'Apr', L1: 31869, L2: 29411, L3: 24679 },
    { name: 'May', L1: 30737, L2: 28952, L3: 24774 },
    { name: 'Jun', L1: 41953, L2: 28942, L3: 23400 },
    { name: 'Jul', L1: 35166, L2: 34635, L3: 24957 },
    { name: 'Aug', L1: 35420, L2: 30994, L3: 23111 },
    { name: 'Sep', L1: 41341, L2: 34896, L3: 26667 },
    { name: 'Oct', L1: 31519, L2: 31298, L3: 23414 },
    { name: 'Nov', L1: 35290, L2: 33078, L3: 25166 },
    { name: 'Dec', L1: 36733, L2: 50499, L3: 41304 },
    { name: 'Jan', L1: 32580, L2: 53378, L3: 43529 },
    { name: 'Feb', L1: 44043, L2: 40961, L3: 32679 },
    { name: 'Mar', L1: 34915, L2: 42949, L3: 35882 },
    { name: 'Apr', L1: 46039, L2: 29810, L3: 23202 }
  ];

  const lossData = [
    { name: 'Jan', Loss1: 4727, Loss2: 1477, Total: 6204 },
    { name: 'Feb', Loss1: 2936, Loss2: 2049, Total: 4985 },
    { name: 'Mar', Loss1: -54, Loss2: 3380, Total: 3326 },
    { name: 'Apr', Loss1: 2458, Loss2: 4732, Total: 7190 },
    { name: 'May', Loss1: 1785, Loss2: 4178, Total: 5963 },
    { name: 'Jun', Loss1: 13011, Loss2: 5542, Total: 18553 },
    { name: 'Jul', Loss1: 531, Loss2: 9678, Total: 10209 },
    { name: 'Aug', Loss1: 4426, Loss2: 7883, Total: 12309 },
    { name: 'Sep', Loss1: 6445, Loss2: 8229, Total: 14674 },
    { name: 'Oct', Loss1: 221, Loss2: 7884, Total: 8105 },
    { name: 'Nov', Loss1: 2212, Loss2: 7912, Total: 10124 },
    { name: 'Dec', Loss1: -13766, Loss2: 9195, Total: -4571 },
    { name: 'Jan', Loss1: -20798, Loss2: 9849, Total: -10949 },
    { name: 'Feb', Loss1: 3082, Loss2: 8282, Total: 11364 },
    { name: 'Mar', Loss1: -8034, Loss2: 7067, Total: -967 },
    { name: 'Apr', Loss1: 16229, Loss2: 6608, Total: 22837 }
  ];

  const zoneDistributionData = [
    { name: 'Zone FM', value: 1880 },
    { name: 'Zone 03A', value: 4041 },
    { name: 'Zone 03B', value: 2157 },
    { name: 'Zone 05', value: 3737 },
    { name: 'Zone 08', value: 3203 },
    { name: 'Village Square', value: 11 }
  ];

  // Enhanced color palette based on Muscat Bay logo
  const CHART_COLORS = [
    '#8ED2D6', // Teal from logo
    '#9A95A6', // Slate purple
    '#4E4456', // Darker purple
    '#6A5F7A', // Medium purple
    '#B5E4E7', // Light teal
    '#DCDADF', // Light purple
  ];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Dashboard Summary</h2>
          <div className="flex items-center text-sm">
            <span className="text-gray-500">Selected Period:</span>
            <span className="ml-2 font-medium text-gray-800">{activeMonthFilter}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-medium">Current Status:</span> The system shows a high water loss rate of <span className="font-medium text-red-600">49.6%</span> in April 2025, 
              mainly from transmission losses. Zone 03A continues to show the highest loss percentage at <span className="font-medium text-red-600">78.9%</span>, 
              while Zone FM shows the lowest at <span className="font-medium text-yellow-600">25.3%</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="L1 (Total Bulk Supply)"
          value={kpiData.bulk.value}
          change={kpiData.bulk.change}
          changeType={kpiData.bulk.changeType}
          trend={kpiData.bulk.trend}
          description={kpiData.bulk.description}
          icon={<Database size={18} />}
          THEME={THEME}
        />
        <KPICard
          title="L2 (Total Consumption)"
          value={kpiData.consumption.value}
          change={kpiData.consumption.change}
          changeType={kpiData.consumption.changeType}
          trend={kpiData.consumption.trend}
          description={kpiData.consumption.description}
          icon={<BarChart3 size={18} />}
          THEME={THEME}
        />
        <KPICard
          title="L3 (Individual Meters)"
          value={kpiData.individualMeters.value}
          change={kpiData.individualMeters.change}
          changeType={kpiData.individualMeters.changeType}
          trend={kpiData.individualMeters.trend}
          description={kpiData.individualMeters.description}
          icon={<ArrowRightLeft size={18} />}
          THEME={THEME}
        />
        <KPICard
          title="Stage 1 Loss (L1-L2)"
          value={kpiData.stageOneLoss.value}
          change={kpiData.stageOneLoss.change}
          changeType={kpiData.stageOneLoss.changeType}
          trend={kpiData.stageOneLoss.trend}
          description={kpiData.stageOneLoss.description}
          icon={<TrendingUp size={18} />}
          THEME={THEME}
        />
        <KPICard
          title="Stage 2 Loss (L2-L3)"
          value={kpiData.stageTwoLoss.value}
          change={kpiData.stageTwoLoss.change}
          changeType={kpiData.stageTwoLoss.changeType}
          trend={kpiData.stageTwoLoss.trend}
          description={kpiData.stageTwoLoss.description}
          icon={<TrendingDown size={18} />}
          THEME={THEME}
        />
        <KPICard
          title="Total Loss"
          value={kpiData.totalLoss.value}
          change={kpiData.totalLoss.change}
          changeType={kpiData.totalLoss.changeType}
          trend={kpiData.totalLoss.trend}
          description={kpiData.totalLoss.description}
          icon={<AlertTriangle size={18} />}
          THEME={THEME}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Consumption Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyConsumptionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="L1" stroke={CHART_COLORS[0]} strokeWidth={3} dot={{ r: 3, strokeWidth: 2 }} name="L1 (Main Bulk)" />
                <Line type="monotone" dataKey="L2" stroke={CHART_COLORS[1]} strokeWidth={2} dot={{ r: 3, strokeWidth: 2 }} name="L2 (Zone Bulk)" />
                <Line type="monotone" dataKey="L3" stroke={CHART_COLORS[2]} strokeWidth={2} dot={{ r: 3, strokeWidth: 2 }} name="L3 (Individual)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loss Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={lossData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Bar dataKey="Loss1" fill={CHART_COLORS[4]} name="Stage 1 Loss" />
                <Bar dataKey="Loss2" fill={CHART_COLORS[5]} name="Stage 2 Loss" />
                <Line type="monotone" dataKey="Total" stroke={CHART_COLORS[2]} strokeWidth={3} name="Total Loss" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Zone Distribution ({activeMonthFilter})</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {zoneDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} units`, 'Consumption']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loss Percentage by Zone ({activeMonthFilter})</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Zone FM', loss: 25.3 },
                  { name: 'Zone 03A', loss: 78.9 },
                  { name: 'Zone 03B', loss: 66.6 },
                  { name: 'Zone 05', loss: 59.5 },
                  { name: 'Zone 08', loss: 70.2 },
                  { name: 'VS', loss: 38.5 }
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Loss Percentage']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="loss"
                  fill={CHART_COLORS[0]}
                  radius={[0, 4, 4, 0]}
                  name="Loss %"
                  label={{ position: 'right', formatter: (value) => `${value}%` }}
                >
                  {/* Color bars based on severity */}
                  {[
                    { name: 'Zone FM', loss: 25.3 },
                    { name: 'Zone 03A', loss: 78.9 },
                    { name: 'Zone 03B', loss: 66.6 },
                    { name: 'Zone 05', loss: 59.5 },
                    { name: 'Zone 08', loss: 70.2 },
                    { name: 'VS', loss: 38.5 }
                  ].map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.loss > 70 ? '#EF4444' :
                        entry.loss > 50 ? '#F59E0B' :
                        entry.loss > 30 ? '#FBBF24' :
                        '#10B981'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== GROUP DETAILS SECTION =====
const GroupDetailsSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter, THEME }) => {
  // Convert generic activeZoneFilter to actual zone code for data filtering
  const getZoneCode = (filter) => {
    switch(filter) {
      case 'Zone FM': return 'FM';
      case 'Zone 03A': return '03A';
      case 'Zone 03B': return '03B';
      case 'Zone 05': return '05';
      case 'Zone 08': return '08';
      case 'Village Square': return 'VS';
      default: return null;
    }
  };

  const zoneCode = getZoneCode(activeZoneFilter);

  // Sample meter data for the customer details table
  const meterData = [
    { id: '4300008', customer: 'Habib Ismail Ali Al Suwaid', zone: 'Zone 03B', consumption: 14 },
    { id: '4300009', customer: 'Leopold Julian Zentner & Erica Kalobwe', zone: 'Zone 03B', consumption: 48 },
    { id: '4300020', customer: 'Wahibah R H Al Mulla', zone: 'Zone 03B', consumption: 3 },
    { id: '4300025', customer: 'Britta Stefanie Gerdes & Dr. Barbara Ungeheuer', zone: 'Zone 03B', consumption: 23 },
    { id: '4300029', customer: 'Al Fadhal Mohamed Ahmed Al Harthy', zone: 'Zone 03B', consumption: 0 },
    { id: '4300042', customer: 'Nasser Abdelsalam Abdelrehiem', zone: 'Zone 03B', consumption: 5 },
    { id: '4300054', customer: 'Nekmohamed Manji & Zahara Manji', zone: 'Zone 03B', consumption: 11 },
    { id: '4300056', customer: 'Al Sayyid Abdulla Hamad Saif Al Busaidy', zone: 'Zone 03B', consumption: 7 },
    { id: '4300057', customer: 'Radhibai Thakurdas Gangwani', zone: 'Zone 03B', consumption: 46 },
    { id: '4300060', customer: 'Anwar Salim Ali Al-Mahri', zone: 'Zone 03B', consumption: 42 },
    { id: '4300062', customer: 'Vanguard Oil Tools and Services LLC', zone: 'Zone 03B', consumption: 10 },
    { id: '4300064', customer: 'Eihab Saleh Moahmed Al Yafi', zone: 'Zone 03B', consumption: 0 },
    { id: '4300065', customer: 'Fahad Al-Hamdani', zone: 'Zone FM', consumption: 25 },
    { id: '4300066', customer: 'Sara Al-Balushi', zone: 'Zone FM', consumption: 18 },
    { id: '4300067', customer: 'Ahmed Al-Saidi', zone: 'Zone 03A', consumption: 30 },
    { id: '4300068', customer: 'Fatima Al-Riyami', zone: 'Zone 03A', consumption: 55 },
    { id: '4300069', customer: 'Khalid Al-Hajri', zone: 'Zone 05', consumption: 12 },
    { id: '4300070', customer: 'Aisha Al-Hashmi', zone: 'Zone 05', consumption: 7 },
    { id: '4300071', customer: 'Sultan Al-Amri', zone: 'Zone 08', consumption: 40 },
    { id: '4300072', customer: 'Noora Al-Hinai', zone: 'Zone 08', consumption: 22 },
    { id: '4300073', customer: 'Mohammed Al-Maamari', zone: 'Village Square', consumption: 1 },
    { id: '4300074', customer: 'Zainab Al-Kalbani', zone: 'Village Square', consumption: 2 },
  ];

  // Filter meters based on selected zone if a specific zone is selected
  const filteredMeters = zoneCode
    ? meterData.filter(meter => meter.zone === activeZoneFilter)
    : meterData;

  // Sample data for zone analysis
  const zoneData = {
    'FM': { bulk: 1880, individual: 1404, loss: 476, lossPercentage: 25.3 },
    '03A': { bulk: 4041, individual: 854, loss: 3187, lossPercentage: 78.9 },
    '03B': { bulk: 2157, individual: 721, loss: 1436, lossPercentage: 66.6 },
    '05': { bulk: 3737, individual: 1514, loss: 2223, lossPercentage: 59.5 },
    '08': { bulk: 3203, individual: 953, loss: 2250, lossPercentage: 70.2 },
    'VS': { bulk: 13, individual: 8, loss: 5, lossPercentage: 38.5 }
  };

  // Data for historical chart (example for Zone FM)
  const historicalData = [
    { month: 'Jan-24', bulk: 1595, individual: 1612, loss: -17, lossPercentage: -1.1 },
    { month: 'Feb-24', bulk: 1283, individual: 1130, loss: 153, lossPercentage: 11.9 },
    { month: 'Mar-24', bulk: 1255, individual: 988, loss: 267, lossPercentage: 21.3 },
    { month: 'Apr-24', bulk: 1383, individual: 1075, loss: 308, lossPercentage: 22.3 },
    { month: 'May-24', bulk: 1411, individual: 1124, loss: 287, lossPercentage: 20.3 },
    { month: 'Jun-24', bulk: 2078, individual: 1109, loss: 969, lossPercentage: 46.6 },
    { month: 'Jul-24', bulk: 2601, individual: 1175, loss: 1426, lossPercentage: 54.8 },
    { month: 'Aug-24', bulk: 1638, individual: 1363, loss: 275, lossPercentage: 16.8 },
    { month: 'Sep-24', bulk: 1550, individual: 1255, loss: 295, lossPercentage: 19.0 },
    { month: 'Oct-24', bulk: 2098, individual: 1362, loss: 736, lossPercentage: 35.1 },
    { month: 'Nov-24', bulk: 1808, individual: 1410, loss: 398, lossPercentage: 22.0 },
    { month: 'Dec-24', bulk: 1946, individual: 1500, loss: 446, lossPercentage: 22.9 },
    { month: 'Jan-25', bulk: 2008, individual: 1506, loss: 502, lossPercentage: 25.0 },
    { month: 'Feb-25', bulk: 1740, individual: 1418, loss: 322, lossPercentage: 18.5 },
    { month: 'Mar-25', bulk: 1880, individual: 1432, loss: 448, lossPercentage: 23.8 },
    { month: 'Apr-25', bulk: 1880, individual: 1404, loss: 476, lossPercentage: 25.3 }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedMeters = filteredMeters.filter(meter =>
    meter.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Enhanced Chart Colors for better visibility
  const CHART_COLORS = [
    '#8ED2D6', // Teal from logo
    '#4E4456', // Darker purple
    '#F59E0B', // Amber for highlight
    '#9A95A6', // Slate purple
  ];

  return (
    <div className="space-y-6">
      {/* Zone Analysis Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {activeZoneFilter === 'All Zones' ? 'Zone Analysis Summary' : activeZoneFilter + ' Analysis'}
        </h3>

        {activeZoneFilter !== 'All Zones' && zoneCode && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#8ED2D6] shadow">
              <h4 className="text-lg font-medium text-gray-600 mb-2">Bulk Meter</h4>
              <p className="text-3xl font-bold text-[#4E4456]">{zoneData[zoneCode].bulk}</p>
              <p className="text-sm text-gray-500 mt-1">units</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#4E4456] shadow">
              <h4 className="text-lg font-medium text-gray-600 mb-2">Individual Meters</h4>
              <p className="text-3xl font-bold text-[#4E4456]">{zoneData[zoneCode].individual}</p>
              <p className="text-sm text-gray-500 mt-1">units</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-500 shadow">
              <h4 className="text-lg font-medium text-gray-600 mb-2">Loss</h4>
              <p className="text-3xl font-bold text-[#4E4456]">{zoneData[zoneCode].loss}</p>
              <p className="text-sm text-gray-500 mt-1">units</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-500 shadow">
              <h4 className="text-lg font-medium text-gray-600 mb-2">Loss Percentage</h4>
              <p className="text-3xl font-bold text-[#4E4456]">{zoneData[zoneCode].lossPercentage}%</p>
              <p className="text-sm text-gray-500 mt-1">of total bulk</p>
            </div>
          </div>
        )}

        {activeZoneFilter === 'All Zones' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-[#4E4456] to-[#9A95A6] text-white">
                  <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Zone</th>
                  <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Bulk Meter</th>
                  <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Individual Meters</th>
                  <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Loss</th>
                  <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Loss %</th>
                  <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.keys(zoneData).map(zone => (
                  <tr key={zone} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Zone {zone}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{zoneData[zone].bulk}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{zoneData[zone].individual}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{zoneData[zone].loss}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              zoneData[zone].lossPercentage > 70 ? 'bg-red-500' :
                              zoneData[zone].lossPercentage > 50 ? 'bg-yellow-500' :
                              zoneData[zone].lossPercentage > 30 ? 'bg-yellow-400' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(100, zoneData[zone].lossPercentage)}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${
                          zoneData[zone].lossPercentage > 70 ? 'text-red-500' :
                          zoneData[zone].lossPercentage > 50 ? 'text-yellow-500' :
                          zoneData[zone].lossPercentage > 30 ? 'text-yellow-600' :
                          'text-green-500'
                        }`}>{zoneData[zone].lossPercentage}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        zoneData[zone].lossPercentage > 70 ? 'bg-red-100 text-red-800' :
                        zoneData[zone].lossPercentage > 50 ? 'bg-yellow-100 text-yellow-800' :
                        zoneData[zone].lossPercentage > 25 ? 'bg-yellow-50 text-yellow-600' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {zoneData[zone].lossPercentage > 70 ? 'Critical' :
                         zoneData[zone].lossPercentage > 50 ? 'High Risk' :
                         zoneData[zone].lossPercentage > 25 ? 'Moderate' :
                         'Normal'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="bulk" fill={CHART_COLORS[0]} name="Bulk Meter" />
                <Bar yAxisId="left" dataKey="individual" fill={CHART_COLORS[1]} name="Individual Meters" />
                <Line yAxisId="left" type="monotone" dataKey="loss" stroke={CHART_COLORS[2]} strokeWidth={2} name="Loss" />
                <Line yAxisId="right" type="monotone" dataKey="lossPercentage" stroke={CHART_COLORS[3]} strokeWidth={2} name="Loss %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Customer Details Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {activeZoneFilter === 'All Zones' ? 'Customer Details' : activeZoneFilter + ' Customer Details'}
          </h3>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search customers or account #..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8ED2D6] focus:border-[#8ED2D6] block w-full pl-10 p-2.5"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-[#4E4456] to-[#9A95A6] text-white">
                <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Account #</th>
                <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Customer</th>
                <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Zone</th>
                <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Consumption (units)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {searchedMeters.length > 0 ? (
                searchedMeters.map((meter) => (
                  <tr key={meter.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{meter.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{meter.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{meter.zone}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              meter.consumption > 40 ? 'bg-red-500' :
                              meter.consumption > 20 ? 'bg-yellow-500' :
                              meter.consumption > 0 ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                            style={{ width: `${Math.min(100, (meter.consumption / 50) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">{meter.consumption}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">No customers found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{searchedMeters.length}</span> results
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-md">Previous</button>
            <button className="px-3 py-1 border border-[#4E4456] bg-[#4E4456] text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-md">2</button>
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-md">3</button>
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== TYPE DETAILS SECTION =====
const TypeDetailsSection = ({ activeMonthFilter, activeYearFilter, THEME }) => {
  // Sample data for type details
  const typeData = {
    "IRR_Services": {
      "name": "Irrigation Services",
      "consumption": [
        { month: 'Jan-24', value: 3758, percentage: 11.5 },
        { month: 'Feb-24', value: 2765, percentage: 9.9 },
        { month: 'Mar-24', value: 2157, percentage: 9.0 },
        { month: 'Apr-24', value: 2798, percentage: 8.8 },
        { month: 'May-24', value: 2211, percentage: 7.2 },
        { month: 'Jun-24', value: 3991, percentage: 9.5 },
        { month: 'Jul-24', value: 4376, percentage: 12.4 },
        { month: 'Aug-24', value: 1640, percentage: 4.6 },
        { month: 'Sep-24', value: 1190, percentage: 2.9 },
        { month: 'Oct-24', value: 2763, percentage: 8.8 },
        { month: 'Nov-24', value: 297, percentage: 0.8 },
        { month: 'Dec-24', value: 242, percentage: 0.7 },
        { month: 'Jan-25', value: 208, percentage: 0.6 },
        { month: 'Feb-25', value: 286, percentage: 0.6 },
        { month: 'Mar-25', value: 326, percentage: 0.9 },
        { month: 'Apr-25', value: 1433, percentage: 3.1 }
      ]
    },
    "Residential_Villa": {
      "name": "Residential Villa",
      "consumption": [
        { month: 'Jan-24', value: 3984, percentage: 12.1 },
        { month: 'Feb-24', value: 3031, percentage: 10.8 },
        { month: 'Mar-24', value: 3146, percentage: 13.2 },
        { month: 'Apr-24', value: 3917, percentage: 12.3 },
        { month: 'May-24', value: 3704, percentage: 12.1 },
        { month: 'Jun-24', value: 3916, percentage: 9.3 },
        { month: 'Jul-24', value: 3882, percentage: 11.0 },
        { month: 'Aug-24', value: 4191, percentage: 11.8 },
        { month: 'Sep-24', value: 3673, percentage: 8.9 },
        { month: 'Oct-24', value: 3834, percentage: 12.2 },
        { month: 'Nov-24', value: 3853, percentage: 10.9 },
        { month: 'Dec-24', value: 3510, percentage: 9.6 },
        { month: 'Jan-25', value: 3144, percentage: 9.7 },
        { month: 'Feb-25', value: 2913, percentage: 6.6 },
        { month: 'Mar-25', value: 3549, percentage: 10.2 },
        { month: 'Apr-25', value: 3618, percentage: 7.9 }
      ]
    },
    "Residential_Apartment": {
      "name": "Residential Apartment",
      "consumption": [
        { month: 'Jan-24', value: 1354, percentage: 4.1 },
        { month: 'Feb-24', value: 1194, percentage: 4.3 },
        { month: 'Mar-24', value: 1164, percentage: 4.9 },
        { month: 'Apr-24', value: 1329, percentage: 4.2 },
        { month: 'May-24', value: 1343, percentage: 4.4 },
        { month: 'Jun-24', value: 1165, percentage: 2.8 },
        { month: 'Jul-24', value: 1140, percentage: 3.2 },
        { month: 'Aug-24', value: 1125, percentage: 3.2 },
        { month: 'Sep-24', value: 1005, percentage: 2.4 },
        { month: 'Oct-24', value: 1364, percentage: 4.3 },
        { month: 'Nov-24', value: 1214, percentage: 3.4 },
        { month: 'Dec-24', value: 1148, percentage: 3.1 },
        { month: 'Jan-25', value: 1098, percentage: 3.4 },
        { month: 'Feb-25', value: 1078, percentage: 2.4 },
        { month: 'Mar-25', value: 944, percentage: 2.7 },
        { month: 'Apr-25', value: 1320, percentage: 2.9 }
      ]
    },
    "Building_Common": {
      "name": "Building Common Areas",
      "consumption": [
        { month: 'Jan-24', value: 340, percentage: 1.0 },
        { month: 'Feb-24', value: 345, percentage: 1.2 },
        { month: 'Mar-24', value: 247, percentage: 1.0 },
        { month: 'Apr-24', value: 212, percentage: 0.7 },
        { month: 'May-24', value: 207, percentage: 0.7 },
        { month: 'Jun-24', value: 250, percentage: 0.6 },
        { month: 'Jul-24', value: 233, percentage: 0.7 },
        { month: 'Aug-24', value: 136, percentage: 0.4 },
        { month: 'Sep-24', value: 125, percentage: 0.3 },
        { month: 'Oct-24', value: 142, percentage: 0.5 },
        { month: 'Nov-24', value: 178, percentage: 0.5 },
        { month: 'Dec-24', value: 292, percentage: 0.8 },
        { month: 'Jan-25', value: 349, percentage: 1.1 },
        { month: 'Feb-25', value: 273, percentage: 0.6 },
        { month: 'Mar-25', value: 240, percentage: 0.7 },
        { month: 'Apr-25', value: 267, percentage: 0.6 }
      ]
    },
    "Retail": {
      "name": "Retail",
      "consumption": [
        { month: 'Jan-24', value: 15620, percentage: 47.6 },
        { month: 'Feb-24', value: 13765, percentage: 49.2 },
        { month: 'Mar-24', value: 12307, percentage: 51.6 },
        { month: 'Apr-24', value: 14275, percentage: 44.8 },
        { month: 'May-24', value: 15242, percentage: 49.6 },
        { month: 'Jun-24', value: 16285, percentage: 38.8 },
        { month: 'Jul-24', value: 14127, percentage: 40.2 },
        { month: 'Aug-24', value: 15247, percentage: 43.0 },
        { month: 'Sep-24', value: 14505, percentage: 35.1 },
        { month: 'Oct-24', value: 19996, percentage: 63.4 },
        { month: 'Nov-24', value: 17806, percentage: 50.5 },
        { month: 'Dec-24', value: 17045, percentage: 46.4 },
        { month: 'Jan-25', value: 20584, percentage: 63.2 },
        { month: 'Feb-25', value: 21405, percentage: 48.6 },
        { month: 'Mar-25', value: 25076, percentage: 71.8 },
        { month: 'Apr-25', value: 30251, percentage: 65.7 }
      ]
    }
  };

  // Get data for the selected month
  const selectedMonthData = Object.keys(typeData).map(key => {
    const typeInfo = typeData[key];
    const monthData = typeInfo.consumption.find(m => m.month === activeMonthFilter) || typeInfo.consumption[0];
    return {
      name: typeInfo.name,
      value: monthData.value,
      percentage: monthData.percentage
    };
  });

  // Filter consumption data for the selected year
  const selectedYearData = Object.keys(typeData).map(key => {
    const typeInfo = typeData[key];
    return {
      name: typeInfo.name,
      data: typeInfo.consumption
        .filter(m => m.month.includes(activeYearFilter))
        .map(m => ({ month: m.month, value: m.value }))
    };
  });

  // Create data for all types comparison chart
  const comparisonData = [];
  typeData.Retail.consumption.forEach(month => {
    const monthEntry = { month: month.month };
    Object.keys(typeData).forEach(type => {
      const typeMonthData = typeData[type].consumption.find(m => m.month === month.month);
      if (typeMonthData) {
        monthEntry[typeData[type].name] = typeMonthData.value;
      }
    });
    comparisonData.push(monthEntry);
  });

  // Custom colors based on Muscat Bay theme
  const CHART_COLORS = [
    '#8ED2D6', // Teal from logo
    '#4E4456', // Darker purple
    '#9A95A6', // Slate purple
    '#B5E4E7', // Light teal
    '#6E5E76', // Medium purple
    '#DCDADF'  // Light lavender
  ];

  return (
    <div className="space-y-6">
      {/* Monthly Type Distribution */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Consumption Type Distribution ({activeMonthFilter})</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={selectedMonthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {selectedMonthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} units`, 'Consumption']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="col-span-2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={selectedMonthData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip
                  formatter={(value, name, props) => [`${value} units (${props.payload.percentage}%)`, 'Consumption']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  radius={[0, 4, 4, 0]}
                  name="Consumption"
                  label={{ position: 'right', formatter: (value) => `${value} units` }}
                >
                  {selectedMonthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Type Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumption Types Comparison Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Consumption Types Comparison ({activeYearFilter})</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={comparisonData.filter(item => item.month.includes(activeYearFilter))}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="Retail" stackId="1" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.6} />
                <Area type="monotone" dataKey="Residential Villa" stackId="1" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.6} />
                <Area type="monotone" dataKey="Irrigation Services" stackId="1" stroke={CHART_COLORS[2]} fill={CHART_COLORS[2]} fillOpacity={0.6} />
                <Area type="monotone" dataKey="Residential Apartment" stackId="1" stroke={CHART_COLORS[3]} fill={CHART_COLORS[3]} fillOpacity={0.6} />
                <Area type="monotone" dataKey="Building Common Areas" stackId="1" stroke={CHART_COLORS[4]} fill={CHART_COLORS[4]} fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Type Percentage Analysis */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Type Percentage of Total ({activeYearFilter})</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={typeData.Retail.consumption.filter(item => item.month.includes(activeYearFilter))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  name="Retail"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  data={typeData.Residential_Villa.consumption.filter(item => item.month.includes(activeYearFilter))}
                  dataKey="percentage"
                  name="Residential Villa"
                  stroke={CHART_COLORS[1]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  data={typeData.IRR_Services.consumption.filter(item => item.month.includes(activeYearFilter))}
                  dataKey="percentage"
                  name="Irrigation"
                  stroke={CHART_COLORS[2]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  data={typeData.Residential_Apartment.consumption.filter(item => item.month.includes(activeYearFilter))}
                  dataKey="percentage"
                  name="Residential Apt"
                  stroke={CHART_COLORS[3]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  data={typeData.Building_Common.consumption.filter(item => item.month.includes(activeYearFilter))}
                  dataKey="percentage"
                  name="Common Areas"
                  stroke={CHART_COLORS[4]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Type Details Tables - Improved with better styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(typeData).map((key, index) => (
          <div key={key} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 text-white font-semibold bg-gradient-to-r" 
              style={{
                backgroundImage: `linear-gradient(to right, ${CHART_COLORS[index % CHART_COLORS.length]}, ${CHART_COLORS[(index + 1) % CHART_COLORS.length]})`
              }}>
              {typeData[key].name} Consumption
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {typeData[key].consumption
                    .filter(item => item.month.includes(activeYearFilter))
                    .map(item => (
                    <tr key={item.month} className={item.month === activeMonthFilter ? 'bg-blue-50' : ''}>
                      <td className="py-2 px-3 text-xs text-gray-900">{item.month}</td>
                      <td className="py-2 px-3 text-xs text-gray-900">{item.value.toLocaleString()}</td>
                      <td className="py-2 px-3 text-xs">
                        <div className="flex items-center">
                          <div className="w-12 bg-gray-200 rounded-full h-1.5 mr-2">
                            <div 
                              className="h-1.5 rounded-full"
                              style={{ 
                                width: `${Math.min(100, item.percentage)}%`,
                                backgroundColor: CHART_COLORS[index % CHART_COLORS.length]
                              }}
                            ></div>
                          </div>
                          <span className="text-gray-900">{item.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== LOSS DETAILS SECTION =====
const LossDetailsSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter, THEME }) => {
  // Sample loss details data
  const lossData = {
    overall: [
      { month: 'Jan-24', l1: 32803, l2: 28076, l3: 26599, loss1: 4727, loss2: 1477, totalLoss: 6204, lossPercentage: 18.9 },
      { month: 'Feb-24', l1: 27996, l2: 25060, l3: 23011, loss1: 2936, loss2: 2049, totalLoss: 4985, lossPercentage: 17.8 },
      { month: 'Mar-24', l1: 23860, l2: 23914, l3: 20534, loss1: -54, loss2: 3380, totalLoss: 3326, lossPercentage: 13.9 },
      { month: 'Apr-24', l1: 31869, l2: 29411, l3: 24679, loss1: 2458, loss2: 4732, totalLoss: 7190, lossPercentage: 22.6 },
      { month: 'May-24', l1: 30737, l2: 28952, l3: 24774, loss1: 1785, loss2: 4178, totalLoss: 5963, lossPercentage: 19.4 },
      { month: 'Jun-24', l1: 41953, l2: 28942, l3: 23400, loss1: 13011, loss2: 5542, totalLoss: 18553, lossPercentage: 44.2 },
      { month: 'Jul-24', l1: 35166, l2: 34635, l3: 24957, loss1: 531, loss2: 9678, totalLoss: 10209, lossPercentage: 29.0 },
      { month: 'Aug-24', l1: 35420, l2: 30994, l3: 23111, loss1: 4426, loss2: 7883, totalLoss: 12309, lossPercentage: 34.8 },
      { month: 'Sep-24', l1: 41341, l2: 34896, l3: 26667, loss1: 6445, loss2: 8229, totalLoss: 14674, lossPercentage: 35.5 },
      { month: 'Oct-24', l1: 31519, l2: 31298, l3: 23414, loss1: 221, loss2: 7884, totalLoss: 8105, lossPercentage: 25.7 },
      { month: 'Nov-24', l1: 35290, l2: 33078, l3: 25166, loss1: 2212, loss2: 7912, totalLoss: 10124, lossPercentage: 28.7 },
      { month: 'Dec-24', l1: 36733, l2: 50499, l3: 41304, loss1: -13766, loss2: 9195, totalLoss: -4571, lossPercentage: -12.4 },
      { month: 'Jan-25', l1: 32580, l2: 53378, l3: 43529, loss1: -20798, loss2: 9849, totalLoss: -10949, lossPercentage: -33.6 },
      { month: 'Feb-25', l1: 44043, l2: 40961, l3: 32679, loss1: 3082, loss2: 8282, totalLoss: 11364, lossPercentage: 25.8 },
      { month: 'Mar-25', l1: 34915, l2: 42949, l3: 35882, loss1: -8034, loss2: 7067, totalLoss: -967, lossPercentage: -2.8 },
      { month: 'Apr-25', l1: 46039, l2: 29810, l3: 23202, loss1: 16229, loss2: 6608, totalLoss: 22837, lossPercentage: 49.6 }
    ],
    zoneDetails: {
      'FM': [
        { month: 'Jan-24', bulk: 1595, individual: 1612, loss: -17, lossPercentage: -1.1 },
        { month: 'Feb-24', bulk: 1283, individual: 1130, loss: 153, lossPercentage: 11.9 },
        { month: 'Mar-24', bulk: 1255, individual: 988, loss: 267, lossPercentage: 21.3 },
        { month: 'Apr-24', bulk: 1383, individual: 1075, loss: 308, lossPercentage: 22.3 },
        { month: 'May-24', bulk: 1411, individual: 1124, loss: 287, lossPercentage: 20.3 },
        { month: 'Jun-24', bulk: 2078, individual: 1109, loss: 969, lossPercentage: 46.6 },
        { month: 'Jul-24', bulk: 2601, individual: 1175, loss: 1426, lossPercentage: 54.8 },
        { month: 'Aug-24', bulk: 1638, individual: 1363, loss: 275, lossPercentage: 16.8 },
        { month: 'Sep-24', bulk: 1550, individual: 1255, loss: 295, lossPercentage: 19.0 },
        { month: 'Oct-24', bulk: 2098, individual: 1362, loss: 736, lossPercentage: 35.1 },
        { month: 'Nov-24', bulk: 1808, individual: 1410, loss: 398, lossPercentage: 22.0 },
        { month: 'Dec-24', bulk: 1946, individual: 1500, loss: 446, lossPercentage: 22.9 },
        { month: 'Jan-25', bulk: 2008, individual: 1506, loss: 502, lossPercentage: 25.0 },
        { month: 'Feb-25', bulk: 1740, individual: 1418, loss: 322, lossPercentage: 18.5 },
        { month: 'Mar-25', bulk: 1880, individual: 1432, loss: 448, lossPercentage: 23.8 },
        { month: 'Apr-25', bulk: 1880, individual: 1404, loss: 476, lossPercentage: 25.3 }
      ],
      '03A': [
        { month: 'Jan-24', bulk: 1234, individual: 930, loss: 304, lossPercentage: 24.6 },
        { month: 'Feb-24', bulk: 1099, individual: 782, loss: 317, lossPercentage: 28.8 },
        { month: 'Mar-24', bulk: 1297, individual: 793, loss: 504, lossPercentage: 38.9 },
        { month: 'Apr-24', bulk: 1892, individual: 789, loss: 1103, lossPercentage: 58.3 },
        { month: 'May-24', bulk: 2254, individual: 879, loss: 1375, lossPercentage: 61.0 },
        { month: 'Jun-24', bulk: 2227, individual: 786, loss: 1441, lossPercentage: 64.7 },
        { month: 'Jul-24', bulk: 3313, individual: 766, loss: 2547, lossPercentage: 76.9 },
        { month: 'Aug-24', bulk: 3172, individual: 846, loss: 2326, lossPercentage: 73.3 },
        { month: 'Sep-24', bulk: 2698, individual: 775, loss: 1923, lossPercentage: 71.3 },
        { month: 'Oct-24', bulk: 3715, individual: 1009, loss: 2706, lossPercentage: 72.8 },
        { month: 'Nov-24', bulk: 3501, individual: 986, loss: 2515, lossPercentage: 71.8 },
        { month: 'Dec-24', bulk: 3796, individual: 792, loss: 3004, lossPercentage: 79.1 },
        { month: 'Jan-25', bulk: 4235, individual: 750, loss: 3485, lossPercentage: 82.3 },
        { month: 'Feb-25', bulk: 4273, individual: 732, loss: 3541, lossPercentage: 82.9 },
        { month: 'Mar-25', bulk: 3591, individual: 561, loss: 3030, lossPercentage: 84.4 },
        { month: 'Apr-25', bulk: 4041, individual: 854, loss: 3187, lossPercentage: 78.9 }
      ],
      '03B': [
        { month: 'Jan-24', bulk: 2653, individual: 997, loss: 1656, lossPercentage: 62.4 },
        { month: 'Feb-24', bulk: 2169, individual: 821, loss: 1348, lossPercentage: 62.1 },
        { month: 'Mar-24', bulk: 2315, individual: 873, loss: 1442, lossPercentage: 62.3 },
        { month: 'Apr-24', bulk: 2381, individual: 945, loss: 1436, lossPercentage: 60.3 },
        { month: 'May-24', bulk: 2634, individual: 934, loss: 1700, lossPercentage: 64.5 },
        { month: 'Jun-24', bulk: 2932, individual: 884, loss: 2048, lossPercentage: 69.8 },
        { month: 'Jul-24', bulk: 3369, individual: 828, loss: 2541, lossPercentage: 75.4 },
        { month: 'Aug-24', bulk: 3458, individual: 812, loss: 2646, lossPercentage: 76.5 },
        { month: 'Sep-24', bulk: 3742, individual: 814, loss: 2928, lossPercentage: 78.2 },
        { month: 'Oct-24', bulk: 2906, individual: 914, loss: 1992, lossPercentage: 68.5 },
        { month: 'Nov-24', bulk: 2695, individual: 712, loss: 1983, lossPercentage: 73.6 },
        { month: 'Dec-24', bulk: 3583, individual: 929, loss: 2654, lossPercentage: 74.1 },
        { month: 'Jan-25', bulk: 3256, individual: 683, loss: 2573, lossPercentage: 79.0 },
        { month: 'Feb-25', bulk: 2962, individual: 625, loss: 2337, lossPercentage: 78.9 },
        { month: 'Mar-25', bulk: 3331, individual: 624, loss: 2707, lossPercentage: 81.3 },
        { month: 'Apr-25', bulk: 2157, individual: 721, loss: 1436, lossPercentage: 66.6 }
      ],
      '05': [
        { month: 'Jan-24', bulk: 4286, individual: 2043, loss: 2243, lossPercentage: 52.3 },
        { month: 'Feb-24', bulk: 3897, individual: 1481, loss: 2416, lossPercentage: 62.0 },
        { month: 'Mar-24', bulk: 4127, individual: 1054, loss: 3073, lossPercentage: 74.5 },
        { month: 'Apr-24', bulk: 4911, individual: 1661, loss: 3250, lossPercentage: 66.2 },
        { month: 'May-24', bulk: 2639, individual: 873, loss: 1766, lossPercentage: 66.9 },
        { month: 'Jun-24', bulk: 4992, individual: 1180, loss: 3812, lossPercentage: 76.4 },
        { month: 'Jul-24', bulk: 5305, individual: 1304, loss: 4001, lossPercentage: 75.4 },
        { month: 'Aug-24', bulk: 4039, individual: 1022, loss: 3017, lossPercentage: 74.7 },
        { month: 'Sep-24', bulk: 2736, individual: 727, loss: 2009, lossPercentage: 73.4 },
        { month: 'Oct-24', bulk: 3383, individual: 1079, loss: 2304, lossPercentage: 68.1 },
        { month: 'Nov-24', bulk: 1438, individual: 967, loss: 471, lossPercentage: 32.8 },
        { month: 'Dec-24', bulk: 3788, individual: 1098, loss: 2690, lossPercentage: 71.0 },
        { month: 'Jan-25', bulk: 4267, individual: 1176, loss: 3091, lossPercentage: 72.4 },
        { month: 'Feb-25', bulk: 4231, individual: 1020, loss: 3211, lossPercentage: 75.9 },
        { month: 'Mar-25', bulk: 3862, individual: 1079, loss: 2783, lossPercentage: 72.1 },
        { month: 'Apr-25', bulk: 3737, individual: 1514, loss: 2223, lossPercentage: 59.5 }
      ],
      '08': [
        { month: 'Jan-24', bulk: 2170, individual: 1783, loss: 387, lossPercentage: 17.8 },
        { month: 'Feb-24', bulk: 1825, individual: 1052, loss: 773, lossPercentage: 42.4 },
        { month: 'Mar-24', bulk: 2021, individual: 1297, loss: 724, lossPercentage: 35.8 },
        { month: 'Apr-24', bulk: 2753, individual: 2096, loss: 657, lossPercentage: 23.9 },
        { month: 'May-24', bulk: 2722, individual: 2091, loss: 631, lossPercentage: 23.2 },
        { month: 'Jun-24', bulk: 3193, individual: 2447, loss: 746, lossPercentage: 23.4 },
        { month: 'Jul-24', bulk: 3639, individual: 2178, loss: 1461, lossPercentage: 40.1 },
        { month: 'Aug-24', bulk: 3957, individual: 2453, loss: 1504, lossPercentage: 38.0 },
        { month: 'Sep-24', bulk: 3947, individual: 2501, loss: 1446, lossPercentage: 36.6 },
        { month: 'Oct-24', bulk: 4296, individual: 1669, loss: 2627, lossPercentage: 61.1 },
        { month: 'Nov-24', bulk: 3569, individual: 1620, loss: 1949, lossPercentage: 54.6 },
        { month: 'Dec-24', bulk: 3018, individual: 1587, loss: 1431, lossPercentage: 47.4 },
        { month: 'Jan-25', bulk: 1547, individual: 1088, loss: 459, lossPercentage: 29.7 },
        { month: 'Feb-25', bulk: 1498, individual: 1198, loss: 300, lossPercentage: 20.0 },
        { month: 'Mar-25', bulk: 2605, individual: 1917, loss: 688, lossPercentage: 26.4 },
        { month: 'Apr-25', bulk: 3203, individual: 953, loss: 2250, lossPercentage: 70.2 }
      ],
      'VS': [
        { month: 'Jan-24', bulk: 26, individual: 0, loss: 26, lossPercentage: 100.0 },
        { month: 'Feb-24', bulk: 19, individual: 1, loss: 18, lossPercentage: 94.7 },
        { month: 'Mar-24', bulk: 72, individual: 16, loss: 56, lossPercentage: 77.8 },
        { month: 'Apr-24', bulk: 60, individual: 49, loss: 11, lossPercentage: 18.3 },
        { month: 'May-24', bulk: 125, individual: 33, loss: 92, lossPercentage: 73.6 },
        { month: 'Jun-24', bulk: 277, individual: 34, loss: 243, lossPercentage: 87.7 },
        { month: 'Jul-24', bulk: 143, individual: 32, loss: 111, lossPercentage: 77.6 },
        { month: 'Aug-24', bulk: 137, individual: 48, loss: 89, lossPercentage: 65.0 },
        { month: 'Sep-24', bulk: 145, individual: 34, loss: 111, lossPercentage: 76.6 },
        { month: 'Oct-24', bulk: 63, individual: 51, loss: 12, lossPercentage: 19.0 },
        { month: 'Nov-24', bulk: 34, individual: 55, loss: -21, lossPercentage: -61.8 },
        { month: 'Dec-24', bulk: 17, individual: 34, loss: -17, lossPercentage: -100.0 },
        { month: 'Jan-25', bulk: 14, individual: 35, loss: -21, lossPercentage: -150.0 },
        { month: 'Feb-25', bulk: 12, individual: 30, loss: -18, lossPercentage: -150.0 },
        { month: 'Mar-25', bulk: 21, individual: 33, loss: -12, lossPercentage: -57.1 },
        { month: 'Apr-25', bulk: 13, individual: 8, loss: 5, lossPercentage: 38.5 }
      ]
    }
  };

  // Sample data for different loss types
  const lossTypeData = [
    { type: 'Physical Leakage', value: 12000, percentage: 52.5 },
    { type: 'Unbilled Authorized Consumption', value: 3000, percentage: 13.1 },
    { type: 'Unauthorized Consumption', value: 5000, percentage: 21.9 },
    { type: 'Administrative Losses', value: 2837, percentage: 12.4 },
  ];

  // Sample historical data for total loss
  const historicalTotalLossData = lossData.overall.filter(item => item.month.includes(activeYearFilter));

  // Dashboard analytics for selected data
  const dashboardAnalytics = useMemo(() => {
    // Sample function for analytics (could be replaced with actual CSV data analysis)
    // Find data specific to selected month
    const monthData = lossData.overall.find(item => item.month === activeMonthFilter) || lossData.overall[lossData.overall.length - 1];
    
    // Calculate total consumption and loss
    const totalConsumption = monthData.l3;
    const totalLoss = monthData.totalLoss;
    const lossPercentage = monthData.lossPercentage;
    
    // Find zones with highest loss
    const zoneWithHighestLoss = Object.keys(lossData.zoneDetails).map(zone => {
      const zoneMonth = lossData.zoneDetails[zone].find(item => item.month === activeMonthFilter);
      return {
        name: zone,
        lossPercentage: zoneMonth ? zoneMonth.lossPercentage : 0
      };
    }).sort((a, b) => b.lossPercentage - a.lossPercentage)[0];
    
    // Find anomalies
    const hasAnomalies = lossData.overall.some(month => month.loss1 < 0);
    
    return {
      monthData,
      totalConsumption,
      totalLoss,
      lossPercentage,
      zoneWithHighestLoss,
      hasAnomalies
    };
  }, [activeMonthFilter, lossData]);

  // Sample data for loss by zone for a specific month (e.g., April 2025)
  const lossByZoneData = useMemo(() => Object.keys(lossData.zoneDetails).map(zoneKey => {
    const zoneDetail = lossData.zoneDetails[zoneKey].find(item => item.month === activeMonthFilter);
    return {
      name: `Zone ${zoneKey}`,
      loss: zoneDetail ? zoneDetail.loss : 0,
      lossPercentage: zoneDetail ? zoneDetail.lossPercentage : 0
    };
  }), [lossData, activeMonthFilter]);

  // Get selected zone data if applicable
  const getZoneCode = useCallback((filter) => {
    switch(filter) {
      case 'Zone FM': return 'FM';
      case 'Zone 03A': return '03A';
      case 'Zone 03B': return '03B';
      case 'Zone 05': return '05';
      case 'Zone 08': return '08';
      case 'Village Square': return 'VS';
      default: return null;
    }
  }, []);
  
  const zoneCode = useMemo(() => getZoneCode(activeZoneFilter), [getZoneCode, activeZoneFilter]);
  const selectedZoneData = useMemo(() => zoneCode ? lossData.zoneDetails[zoneCode] : null, [zoneCode, lossData]);

  // Custom colors for loss analysis charts
  const CHART_COLORS = [
    '#8ED2D6', // Teal from logo
    '#4E4456', // Darker purple
    '#9A95A6', // Slate purple  
    '#B5E4E7', // Light teal
  ];

  // Colors for loss types
  const PIE_COLORS_LOSS = [
    '#EF4444', // Red
    '#8ED2D6', // Teal
    '#F59E0B', // Amber
    '#4E4456'  // Dark purple
  ];

  return (
    <div className="space-y-6">
      {/* Problem Zone Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Analysis Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
            <h4 className="font-medium text-red-800 flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              Critical Loss Issues
            </h4>
            <ul className="mt-2 text-sm text-red-700 space-y-1 pl-6 list-disc">
              <li>Zone 03A shows an exceptionally high loss rate of <span className="font-semibold">78.9%</span></li>
              <li>Zone 03B maintains a concerningly high loss of <span className="font-semibold">66.6%</span></li>
              <li>Zone 08 has shown a significant increase from <span className="font-semibold">26.4%</span> to <span className="font-semibold">70.2%</span> in the last month</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-[#8ED2D6]">
            <h4 className="font-medium text-[#4E4456] flex items-center">
              <Droplet size={18} className="mr-2 text-[#8ED2D6]" />
              Recommended Actions
            </h4>
            <ul className="mt-2 text-sm text-gray-700 space-y-1 pl-6 list-disc">
              <li>Conduct pressure testing in Zone 03A and 03B</li>
              <li>Inspect Zone 08 for recent infrastructure changes</li>
              <li>Verify meter calibration for all zones showing abnormal readings</li>
              <li>Schedule a network-wide leak detection survey</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Breakdown by Type ({activeMonthFilter})</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-1">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-[#4E4456] to-[#9A95A6] text-white">
                    <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Loss Type</th>
                    <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">Volume</th>
                    <th className="py-3 px-4 text-left text-sm font-medium uppercase tracking-wider">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lossTypeData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{data.type}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{data.value.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{data.percentage.toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-medium">
                    <td className="py-3 px-4 text-sm text-gray-900">Total Loss</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{lossTypeData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="col-span-1 lg:col-span-2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lossTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="type"
                  label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                >
                  {lossTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS_LOSS[index % PIE_COLORS_LOSS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [`${value.toLocaleString()} units (${props.payload.percentage}%)`, props.payload.type]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend 
                  formatter={(value, entry, index) => (
                    <span style={{ color: PIE_COLORS_LOSS[index % PIE_COLORS_LOSS.length] }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Historical Total Loss Trend ({activeYearFilter})
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalTotalLossData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} units`, 'Total Loss']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="totalLoss" 
                  stroke="#EF4444" 
                  fillOpacity={0.6} 
                  fill="url(#colorTotalLoss)" 
                  name="Total Loss" 
                  activeDot={{ r: 8 }}
                />
                <defs>
                  <linearGradient id="colorTotalLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {activeZoneFilter !== 'All Zones' 
              ? `Loss Trend: ${activeZoneFilter} (${activeYearFilter})` 
              : `Loss Percentage by Zone (${activeMonthFilter})`}
          </h3>
          <div className="h-80">
            {activeZoneFilter !== 'All Zones' && selectedZoneData ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={selectedZoneData.filter(item => item.month.includes(activeYearFilter))} 
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="loss" fill={CHART_COLORS[0]} name="Loss (units)" />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="lossPercentage" 
                    stroke={CHART_COLORS[1]} 
                    strokeWidth={3} 
                    name="Loss %" 
                    dot={{ r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={lossByZoneData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Loss Percentage']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="lossPercentage"
                    name="Loss %"
                    radius={[0, 4, 4, 0]}
                  >
                    {lossByZoneData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.lossPercentage > 70 ? '#EF4444' :
                          entry.lossPercentage > 50 ? '#F59E0B' :
                          entry.lossPercentage > 30 ? '#FBBF24' :
                          '#10B981'
                        } 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Additional analysis section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Analysis Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-base font-medium text-gray-800 mb-2 flex items-center">
              <CircleOff size={18} className="mr-2 text-red-500" />
              Anomalies Detected
            </h4>
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Several data anomalies detected that require investigation:</p>
              <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
                <li>Negative loss readings in Dec-24 to Jan-25</li>
                <li>Bulk meter readings higher than individual meters in Zone VS</li>
                <li>Sudden jump in consumption in Zone 08 in Apr-25</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-base font-medium text-gray-800 mb-2 flex items-center">
              <TrendingUp size={18} className="mr-2 text-amber-500" />
              High Risk Zones
            </h4>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Zone 03A</span>
                <span className="font-medium text-red-600">78.9%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                <div className="h-1.5 rounded-full bg-red-500" style={{ width: '78.9%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Zone 03B</span>
                <span className="font-medium text-red-600">66.6%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                <div className="h-1.5 rounded-full bg-red-500" style={{ width: '66.6%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Zone 08</span>
                <span className="font-medium text-red-600">70.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-red-500" style={{ width: '70.2%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="text-base font-medium text-gray-800 mb-2 flex items-center">
              <TrendingDown size={18} className="mr-2 text-green-500" />
              Low Loss Zones
            </h4>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Zone FM</span>
                <span className="font-medium text-green-600">25.3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                <div className="h-1.5 rounded-full bg-green-500" style={{ width: '25.3%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Village Square</span>
                <span className="font-medium text-amber-600">38.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-amber-500" style={{ width: '38.5%' }}></div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 italic">Zone FM maintains the lowest loss rate across all zones, suggesting effective management practices that could be applied elsewhere.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-base font-medium text-gray-800 mb-3">Recommendations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Short-term Actions</h5>
              <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
                <li>Inspect main supply line to Zone 03A for suspected major leakage</li>
                <li>Calibrate meters in Zone 08 showing unusual readings</li>
                <li>Conduct night flow testing in all zones with loss > 50%</li>
                <li>Install temporary logging devices at key network points</li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Long-term Strategy</h5>
              <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
                <li>Replace aging infrastructure in Zone 03A and 03B</li>
                <li>Implement pressure management system in high-loss zones</li>
                <li>Develop comprehensive asset management plan</li>
                <li>Install permanent monitoring system with automated alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterAnalysisDashboard;