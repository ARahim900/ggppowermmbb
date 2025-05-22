
import React, { useState, useEffect } from 'react';
import {
  BarChart3, Database, RefreshCw, AlertTriangle,
  HelpCircle, Settings, RefreshCw as Refresh,
  Download, Share2, Filter, Home
} from 'lucide-react';

// Import components
import TabButton from './components/TabButton';
import LoadingScreen from './components/LoadingScreen';
import OverviewSection from './components/OverviewSection';
import GroupDetailsSection from './components/GroupDetailsSection';
import TypeDetailsSection from './components/TypeDetailsSection';
import LossDetailsSection from './components/LossDetailsSection';

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
                    <Refresh size={14} className="mr-1" />
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

export default WaterAnalysisDashboard;
