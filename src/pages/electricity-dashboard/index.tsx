import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Download, 
  Calendar, 
  Zap, 
  Building, 
  TrendingUp, 
  XCircle,
  Check,
  Search,
  Info
} from 'lucide-react';

import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  ComposedChart 
} from 'recharts';

// Sample electricity data
const electricityData = [
  {
    name: "Pumping Station 01",
    type: "PS",
    meterAccountNo: "R52330",
    consumption: {
      "Apr": 1608,
      "May": 1940,
      "Jun": 1783,
      "Jul": 1874,
      "Aug": 1662,
      "Sep": 3822,
      "Oct": 6876,
      "Nov": 1629,
      "Dec": 1640,
      "Jan": 1903,
      "Feb": 2095,
      "Mar": 3032
    }
  },
  {
    name: "Pumping Station 03",
    type: "PS",
    meterAccountNo: "R52329",
    consumption: {
      "Apr": 31,
      "May": 47,
      "Jun": 25,
      "Jul": 3,
      "Aug": 0,
      "Sep": 0,
      "Oct": 33,
      "Nov": 0,
      "Dec": 179,
      "Jan": 33,
      "Feb": 137,
      "Mar": 131
    }
  },
  {
    name: "Lifting Station 04",
    type: "LS",
    meterAccountNo: "R52324",
    consumption: {
      "Apr": 644,
      "May": 865,
      "Jun": 791,
      "Jul": 768,
      "Aug": 747,
      "Sep": 723,
      "Oct": 628,
      "Nov": 686,
      "Dec": 631,
      "Jan": 701,
      "Feb": 638,
      "Mar": 572
    }
  },
  {
    name: "Beachwell",
    type: "D_Building",
    meterAccountNo: "R51903",
    consumption: {
      "Apr": 16908,
      "May": 46,
      "Jun": 19332,
      "Jul": 23170,
      "Aug": 42241,
      "Sep": 15223,
      "Oct": 25370,
      "Nov": 24383,
      "Dec": 37236,
      "Jan": 38168,
      "Feb": 18422,
      "Mar": 40
    }
  },
  {
    name: "Street Light FP 01",
    type: "Street Light",
    meterAccountNo: "R53197",
    consumption: {
      "Apr": 2773,
      "May": 3276,
      "Jun": 3268,
      "Jul": 3040,
      "Aug": 3203,
      "Sep": 3225,
      "Oct": 3064,
      "Nov": 3593,
      "Dec": 3147,
      "Jan": 787,
      "Feb": 3228,
      "Mar": 2663
    }
  },
  {
    name: "CIF kitchen",
    type: "Retail",
    meterAccountNo: "",
    consumption: {
      "Apr": 0,
      "May": 0,
      "Jun": 0,
      "Jul": 17895,
      "Aug": 16532,
      "Sep": 18955,
      "Oct": 15071,
      "Nov": 16742,
      "Dec": 15554,
      "Jan": 16788,
      "Feb": 16154,
      "Mar": 14971
    }
  }
];

const getMonths = () => {
  return [
    { id: "Apr", label: "Apr 2024" },
    { id: "May", label: "May 2024" },
    { id: "Jun", label: "Jun 2024" },
    { id: "Jul", label: "Jul 2024" },
    { id: "Aug", label: "Aug 2024" },
    { id: "Sep", label: "Sep 2024" },
    { id: "Oct", label: "Oct 2024" },
    { id: "Nov", label: "Nov 2024" },
    { id: "Dec", label: "Dec 2024" },
    { id: "Jan", label: "Jan 2025" },
    { id: "Feb", label: "Feb 2025" },
    { id: "Mar", label: "Mar 2025" }
  ];
};

const getFacilityTypes = () => {
  const types = new Set();
  electricityData.forEach(item => {
    types.add(item.type);
  });
  return Array.from(types).map(type => ({
    id: type,
    label: type
  }));
};

const EnhancedElectricityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [periodFilter, setPeriodFilter] = useState('yearly');
  const [tableData, setTableData] = useState([]);
  const [isMonthFilterOpen, setIsMonthFilterOpen] = useState(false);
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState(getMonths().map(month => month.id));
  const [selectedTypes, setSelectedTypes] = useState(getFacilityTypes().map(type => type.id));
  const [searchQuery, setSearchQuery] = useState('');
  const [summaryData, setSummaryData] = useState({
    totalConsumption: 0,
    totalCost: 0,
    pumpingStationsConsumption: 0,
    liftingStationsConsumption: 0,
    highestConsumer: '',
    highestConsumption: 0,
  });
  
  // Theme color - making sure we use the exact color specified
  const PRIMARY_COLOR = '#4E4456';
  const SECONDARY_COLOR = '#6E5E78';
  const COLORS = [PRIMARY_COLOR, '#6E5E78', '#8F7A9A', '#AF96BC', '#D0B2DE', '#E6CCF0', '#F2E5F9'];
  const pricePerKwh = 0.025; // 1 kWh = 0.025 OMR
  
  // Filter data by selected months, types, and search query
  const filteredData = useMemo(() => {
    return electricityData.filter(item => {
      // Filter by selected facility types
      if (!selectedTypes.includes(item.type)) return false;
      
      // Filter by search query
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    });
  }, [selectedTypes, searchQuery]);
  
  useEffect(() => {
    // Process the data for display
    processData();
  }, [filteredData, selectedMonths, periodFilter]);
  
  const processData = () => {
    // Calculate total consumption and other metrics
    let totalConsumption = 0;
    let pumpingStationsConsumption = 0;
    let liftingStationsConsumption = 0;
    let highestConsumer = '';
    let highestConsumption = 0;
    
    // Process table data
    const processedTableData = filteredData.map(item => {
      // Calculate consumption for selected months only
      const monthlyTotal = Object.entries(item.consumption)
        .filter(([month]) => selectedMonths.includes(month))
        .reduce((sum, [_, val]) => sum + val, 0);
      
      if (monthlyTotal > highestConsumption) {
        highestConsumption = monthlyTotal;
        highestConsumer = item.name;
      }
      
      totalConsumption += monthlyTotal;
      
      if (item.type === 'PS') {
        pumpingStationsConsumption += monthlyTotal;
      } else if (item.type === 'LS') {
        liftingStationsConsumption += monthlyTotal;
      }
      
      return {
        ...item,
        totalConsumption: monthlyTotal,
        totalCost: monthlyTotal * pricePerKwh
      };
    });
    
    setTableData(processedTableData);
    setSummaryData({
      totalConsumption,
      totalCost: totalConsumption * pricePerKwh,
      pumpingStationsConsumption,
      liftingStationsConsumption,
      highestConsumer,
      highestConsumption
    });
  };
  
  // Calculate monthly consumption for filtered facilities
  const getMonthlyTotals = () => {
    const months = getMonths().filter(month => selectedMonths.includes(month.id));
    
    return months.map(month => {
      const total = filteredData.reduce((sum, item) => sum + (item.consumption[month.id] || 0), 0);
      return {
        name: month.label,
        month: month.id,
        consumption: total,
        cost: total * pricePerKwh
      };
    });
  };
  
  // Calculate consumption by facility type for filtered facilities
  const getConsumptionByType = () => {
    const typeMap = {};
    
    filteredData.forEach(item => {
      if (!typeMap[item.type]) {
        typeMap[item.type] = 0;
      }
      
      const totalConsumption = Object.entries(item.consumption)
        .filter(([month]) => selectedMonths.includes(month))
        .reduce((sum, [_, val]) => sum + val, 0);
      
      typeMap[item.type] += totalConsumption;
    });
    
    return Object.entries(typeMap).map(([type, consumption]) => ({
      name: type,
      value: consumption,
      cost: consumption * pricePerKwh
    }));
  };
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };
  
  const toggleMonthFilter = () => {
    setIsMonthFilterOpen(!isMonthFilterOpen);
    if (isTypeFilterOpen) setIsTypeFilterOpen(false);
  };
  
  const toggleTypeFilter = () => {
    setIsTypeFilterOpen(!isTypeFilterOpen);
    if (isMonthFilterOpen) setIsMonthFilterOpen(false);
  };
  
  const toggleMonth = (monthId) => {
    if (selectedMonths.includes(monthId)) {
      if (selectedMonths.length > 1) { // Ensure at least one month is selected
        setSelectedMonths(selectedMonths.filter(id => id !== monthId));
      }
    } else {
      setSelectedMonths([...selectedMonths, monthId]);
    }
  };
  
  const toggleType = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      if (selectedTypes.length > 1) { // Ensure at least one type is selected
        setSelectedTypes(selectedTypes.filter(id => id !== typeId));
      }
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };
  
  const selectAllMonths = () => {
    setSelectedMonths(getMonths().map(month => month.id));
  };
  
  const clearAllMonths = () => {
    // Keep just the first month to ensure at least one is selected
    setSelectedMonths([getMonths()[0].id]);
  };
  
  const selectAllTypes = () => {
    setSelectedTypes(getFacilityTypes().map(type => type.id));
  };
  
  const clearAllTypes = () => {
    // Keep just the first type to ensure at least one is selected
    setSelectedTypes([getFacilityTypes()[0].id]);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Electricity Analysis</h1>
            <p className="text-gray-600">Comprehensive analysis of electricity consumption across all facilities</p>
          </div>
        </div>
        
        {/* Top Navigation Tabs with animation */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-6 transition-all duration-300 ease-in-out ${
              activeTab === 'overview' 
                ? 'border-b-2 border-[#4E4456] text-[#4E4456] font-medium' 
                : 'text-gray-500 hover:text-[#4E4456]/80'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('by-facility')}
            className={`py-3 px-6 transition-all duration-300 ease-in-out ${
              activeTab === 'by-facility' 
                ? 'border-b-2 border-[#4E4456] text-[#4E4456] font-medium' 
                : 'text-gray-500 hover:text-[#4E4456]/80'
            }`}
          >
            By Facility Type
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`py-3 px-6 transition-all duration-300 ease-in-out ${
              activeTab === 'trends' 
                ? 'border-b-2 border-[#4E4456] text-[#4E4456] font-medium' 
                : 'text-gray-500 hover:text-[#4E4456]/80'
            }`}
          >
            Monthly Trends
          </button>
          <button
            onClick={() => setActiveTab('data-table')}
            className={`py-3 px-6 transition-all duration-300 ease-in-out ${
              activeTab === 'data-table' 
                ? 'border-b-2 border-[#4E4456] text-[#4E4456] font-medium' 
                : 'text-gray-500 hover:text-[#4E4456]/80'
            }`}
          >
            Data Table
          </button>
        </div>
        
        {/* Filter Controls Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {/* Period Filter */}
              <div className="flex space-x-1">
                <button
                  onClick={() => setPeriodFilter('monthly')}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    periodFilter === 'monthly' 
                      ? 'bg-[#4E4456] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setPeriodFilter('quarterly')}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    periodFilter === 'quarterly' 
                      ? 'bg-[#4E4456] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Quarterly
                </button>
                <button
                  onClick={() => setPeriodFilter('yearly')}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    periodFilter === 'yearly' 
                      ? 'bg-[#4E4456] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yearly
                </button>
              </div>
              
              {/* Month Filter Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleMonthFilter}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Calendar size={16} className="mr-2" />
                  {selectedMonths.length === getMonths().length ? 'All Months' : `${selectedMonths.length} Month${selectedMonths.length !== 1 ? 's' : ''}`}
                  <ChevronDown size={16} className="ml-2" />
                </button>
                
                {isMonthFilterOpen && (
                  <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg">
                    <div className="p-2 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-700">Filter by Month</h3>
                        <div className="flex space-x-2">
                          <button 
                            onClick={selectAllMonths}
                            className="text-xs text-[#4E4456] hover:text-[#4E4456]/80 font-medium"
                          >
                            Select All
                          </button>
                          <button 
                            onClick={clearAllMonths}
                            className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      {getMonths().map(month => (
                        <div 
                          key={month.id} 
                          onClick={() => toggleMonth(month.id)}
                          className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center mr-2 ${
                            selectedMonths.includes(month.id) 
                              ? 'bg-[#4E4456] text-white' 
                              : 'border border-gray-300'
                          }`}>
                            {selectedMonths.includes(month.id) && <Check size={14} />}
                          </div>
                          <span>{month.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Type Filter Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleTypeFilter}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter size={16} className="mr-2" />
                  {selectedTypes.length === getFacilityTypes().length ? 'All Types' : `${selectedTypes.length} Type${selectedTypes.length !== 1 ? 's' : ''}`}
                  <ChevronDown size={16} className="ml-2" />
                </button>
                
                {isTypeFilterOpen && (
                  <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg">
                    <div className="p-2 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-700">Filter by Type</h3>
                        <div className="flex space-x-2">
                          <button 
                            onClick={selectAllTypes}
                            className="text-xs text-[#4E4456] hover:text-[#4E4456]/80 font-medium"
                          >
                            Select All
                          </button>
                          <button 
                            onClick={clearAllTypes}
                            className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto p-2">
                      {getFacilityTypes().map(type => (
                        <div 
                          key={type.id} 
                          onClick={() => toggleType(type.id)}
                          className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center mr-2 ${
                            selectedTypes.includes(type.id) 
                              ? 'bg-[#4E4456] text-white' 
                              : 'border border-gray-300'
                          }`}>
                            {selectedTypes.includes(type.id) && <Check size={14} />}
                          </div>
                          <span>{type.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search facilities..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4E4456]/30 focus:border-[#4E4456]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={16} />
                  </button>
                )}
              </div>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={16} className="mr-2" />
                Export
              </button>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(selectedMonths.length < getMonths().length || selectedTypes.length < getFacilityTypes().length || searchQuery) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              
              {selectedMonths.length < getMonths().length && (
                <div className="flex items-center bg-[#4E4456]/10 text-[#4E4456] px-2 py-1 rounded-full text-xs">
                  <span>{selectedMonths.length} of {getMonths().length} months</span>
                  <button 
                    onClick={selectAllMonths}
                    className="ml-1 hover:text-[#4E4456]/80"
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              )}
              
              {selectedTypes.length < getFacilityTypes().length && (
                <div className="flex items-center bg-[#4E4456]/10 text-[#4E4456] px-2 py-1 rounded-full text-xs">
                  <span>{selectedTypes.length} of {getFacilityTypes().length} types</span>
                  <button 
                    onClick={selectAllTypes}
                    className="ml-1 hover:text-[#4E4456]/80"
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              )}
              
              {searchQuery && (
                <div className="flex items-center bg-[#4E4456]/10 text-[#4E4456] px-2 py-1 rounded-full text-xs">
                  <span>Search: {searchQuery}</span>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:text-[#4E4456]/80"
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              )}
              
              <button 
                onClick={() => {
                  selectAllMonths();
                  selectAllTypes();
                  setSearchQuery('');
                }}
                className="text-xs text-gray-500 hover:text-gray-700 ml-2"
              >
                Reset all
              </button>
            </div>
          )}
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Consumption</h3>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(summaryData.totalConsumption)} kWh</p>
              </div>
              <div className="p-2 bg-[#4E4456] bg-opacity-10 rounded-lg">
                <Zap size={20} className="text-[#4E4456]" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <span className="text-green-600 flex items-center">
                <ChevronUp size={14} />
                3.2%
              </span>
              <span className="ml-1 text-gray-500">vs last period</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(summaryData.totalCost.toFixed(3))} OMR</p>
              </div>
              <div className="p-2 bg-[#4E4456] bg-opacity-10 rounded-lg">
                <TrendingUp size={20} className="text-[#4E4456]" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <span className="text-green-600 flex items-center">
                <ChevronUp size={14} />
                2.8%
              </span>
              <span className="ml-1 text-gray-500">vs last period</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pumping Stations</h3>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(summaryData.pumpingStationsConsumption)} kWh</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <span className="text-red-600 flex items-center">
                <ChevronDown size={14} />
                1.5%
              </span>
              <span className="ml-1 text-gray-500">vs last period</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Lifting Stations</h3>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(summaryData.liftingStationsConsumption)} kWh</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Building size={20} className="text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <span className="text-green-600 flex items-center">
                <ChevronUp size={14} />
                4.2%
              </span>
              <span className="ml-1 text-gray-500">vs last period</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Highest Consumer</h3>
                <p className="text-xl font-bold text-gray-800 truncate" title={summaryData.highestConsumer}>
                  {summaryData.highestConsumer}
                </p>
                <p className="text-sm text-gray-500">{formatNumber(summaryData.highestConsumption)} kWh</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Zap size={20} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Consumption Chart */}
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Monthly Consumption</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={getMonthlyTotals()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`${formatNumber(value)} kWh`, 'Consumption']}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="consumption" 
                      fill={`${PRIMARY_COLOR}30`} 
                      stroke={PRIMARY_COLOR} 
                      strokeWidth={2}
                    />
                    <Bar 
                      dataKey="consumption" 
                      barSize={20} 
                      fill={PRIMARY_COLOR}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              {/* Consumption by Facility Type */}
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Consumption by Facility Type</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getConsumptionByType()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {getConsumptionByType().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${formatNumber(value)} kWh`, 'Consumption']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Top Consumers Table */}
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow lg:col-span-2">
                <h3 className="text-lg font-medium mb-4 text-gray-800">Top Consumers</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="py-3 px-4 border-b border-gray-200">Facility</th>
                        <th className="py-3 px-4 border-b border-gray-200">Type</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-right">Total Consumption</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-right">Total Cost</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-right">% of Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData
                        .sort((a, b) => b.totalConsumption - a.totalConsumption)
                        .slice(0, 5)
                        .map((item, index) => (
                          <tr 
                            key={index} 
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-gray-500">{item.type}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-gray-900 text-right font-medium">{formatNumber(item.totalConsumption)} kWh</td>
                            <td className="py-3 px-4 whitespace-nowrap text-gray-900 text-right">{formatNumber(item.totalCost.toFixed(3))} OMR</td>
                            <td className="py-3 px-4 whitespace-nowrap text-right">
                              <div className="relative w-full bg-gray-200 rounded-full h-2.5 mt-1.5">
                                <div 
                                  className="bg-[#4E4456] h-2.5 rounded-full"
                                  style={{ width: `${Math.min(100, (item.totalConsumption / summaryData.totalConsumption) * 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 mt-1 inline-block">
                                {((item.totalConsumption / summaryData.totalConsumption) * 100).toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'by-facility' && (
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-4 text-gray-800">Consumption by Facility Type</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={getConsumptionByType().sort((a, b) => b.value - a.value)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${formatNumber(value)} kWh`, 'Consumption']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill={PRIMARY_COLOR}
                    name="Consumption"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {activeTab === 'trends' && (
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-4 text-gray-800">Monthly Consumption Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart 
                  data={getMonthlyTotals()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'consumption') return [`${formatNumber(value)} kWh`, 'Consumption'];
                      if (name === 'cost') return [`${formatNumber(value.toFixed(3))} OMR`, 'Cost'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke={PRIMARY_COLOR} 
                    strokeWidth={2}
                    yAxisId="left"
                    dot={{ r: 4, fill: PRIMARY_COLOR, stroke: 'white', strokeWidth: 1 }}
                    activeDot={{ r: 6, fill: PRIMARY_COLOR, stroke: 'white', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke={SECONDARY_COLOR} 
                    strokeWidth={2}
                    yAxisId="right"
                    dot={{ r: 4, fill: SECONDARY_COLOR, stroke: 'white', strokeWidth: 1 }}
                    activeDot={{ r: 6, fill: SECONDARY_COLOR, stroke: 'white', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {activeTab === 'data-table' && (
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Complete Electricity Consumption Data</h3>
                <div className="text-sm text-gray-500 flex items-center">
                  <Info size={14} className="mr-1" />
                  Showing {tableData.length} of {electricityData.length} facilities
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4 border-b border-gray-200">Facility Name</th>
                      <th className="py-3 px-4 border-b border-gray-200">Type</th>
                      <th className="py-3 px-4 border-b border-gray-200">Meter Account No.</th>
                      <th className="py-3 px-4 border-b border-gray-200 text-right">Total Consumption</th>
                      <th className="py-3 px-4 border-b border-gray-200 text-right">Total Cost (OMR)</th>
                      <th className="py-3 px-4 border-b border-gray-200 text-right">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tableData
                      .sort((a, b) => b.totalConsumption - a.totalConsumption)
                      .map((item, index) => (
                        <tr 
                          key={index} 
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                          <td className="py-3 px-4 whitespace-nowrap text-gray-500">{item.type}</td>
                          <td className="py-3 px-4 whitespace-nowrap text-gray-500">{item.meterAccountNo || '-'}</td>
                          <td className="py-3 px-4 whitespace-nowrap text-gray-900 text-right font-medium">{formatNumber(item.totalConsumption)} kWh</td>
                          <td className="py-3 px-4 whitespace-nowrap text-gray-900 text-right">{formatNumber(item.totalCost.toFixed(3))} OMR</td>
                          <td className="py-3 px-4 whitespace-nowrap text-right">
                            <div className="relative w-full bg-gray-200 rounded-full h-2.5 mt-1.5">
                              <div 
                                className="bg-[#4E4456] h-2.5 rounded-full"
                                style={{ width: `${Math.min(100, (item.totalConsumption / summaryData.totalConsumption) * 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 inline-block">
                              {((item.totalConsumption / summaryData.totalConsumption) * 100).toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedElectricityDashboard;