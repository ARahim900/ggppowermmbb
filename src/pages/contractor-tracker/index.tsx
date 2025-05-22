import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Icons
const DollarSign = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const CheckCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertTriangle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const FileText = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const Search = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Filter = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const ChevronDown = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ArrowUpDown = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="3" x2="12" y2="21"></line>
    <polyline points="18 9 12 3 6 9"></polyline>
    <polyline points="6 15 12 21 18 15"></polyline>
  </svg>
);

const Calendar = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const TrendingUp = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

// Mock data for contractors
const contractorData = [
  {
    contractor: "KONE Assarain LLC",
    service: "Lift Maintenance Services",
    status: "Active",
    contractType: "Contract",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    monthlyAmount: "525 OMR",
    yearlyAmount: "11550 OMR (Excl VAT)",
    note: ""
  },
  {
    contractor: "Oman Water Treatment Company (OWATCO)",
    service: "Comprehensive STP Operation and Maintenance",
    status: "Active",
    contractType: "Contract",
    startDate: "2024-01-26",
    endDate: "2029-01-25",
    monthlyAmount: "3,103.8 OMR",
    yearlyAmount: "37,245.4 OMR (Inc VAT)",
    note: "New contract due to early termination of previous Contract with Celar Company"
  },
  {
    contractor: "Kalhat Facility Management (FM)",
    service: "Facility Management",
    status: "Active",
    contractType: "Contract",
    startDate: "2024-05-07",
    endDate: "2030-05-06",
    monthlyAmount: "32,200.8 OMR",
    yearlyAmount: "386,409.718 OMR (Inc VAT)",
    note: "New contract overlapping with COMO"
  },
  {
    contractor: "Future Cities S.A.O.C (Tadoom)",
    service: "SUPPLY AND INSTALLATION OF SMART WATER METERS",
    status: "Active",
    contractType: "Contract",
    startDate: "2024-09-24",
    endDate: "2032-09-23",
    monthlyAmount: "2.7 Per Meter Collection",
    yearlyAmount: "184.3 OMR",
    note: "New contract replacing OIFC"
  },
  {
    contractor: "Muna Noor International LLC",
    service: "Pest Control Services",
    status: "Active",
    contractType: "Contract",
    startDate: "2024-07-01",
    endDate: "2026-06-30",
    monthlyAmount: "1,400 OMR",
    yearlyAmount: "16,000 OMR (Inc VAT)",
    note: ""
  },
  {
    contractor: "Celar Water",
    service: "Comprehensive STP Operation and Maintenance",
    status: "Expired",
    contractType: "Contract",
    startDate: "2021-01-16",
    endDate: "2025-01-15",
    monthlyAmount: "4,439 OMR",
    yearlyAmount: "",
    note: "Transitioned to OWATCO before contract end"
  }
];

const App = () => {
  const [view, setView] = useState('tracker'); // tracker, detail, finance
  const [listView, setListView] = useState('table');
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate statistics
  const totalContracts = contractorData.length;
  const activeContracts = contractorData.filter(contract => contract.status === 'Active').length;
  const expiredContracts = contractorData.filter(contract => contract.status === 'Expired').length;
  
  // Calculate near expiry (contracts with less than 60 days remaining)
  const today = new Date();
  const nearExpiryContracts = contractorData.filter(contract => {
    if (contract.status === 'Expired') return false;
    const endDate = new Date(contract.endDate);
    const daysRemaining = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 && daysRemaining < 60;
  });
  
  // Calculate total monthly and yearly costs
  const totalMonthlyCost = contractorData
    .filter(contract => contract.status === 'Active' && contract.monthlyAmount)
    .reduce((total, contract) => {
      // Extract numerical value from string like "525 OMR" or "1,400 /Month Inc VAT"
      const match = contract.monthlyAmount.match(/(\d+,?\d*\.?\d*)/);
      if (match) {
        return total + parseFloat(match[0].replace(',', ''));
      }
      return total;
    }, 0);
    
  // Filter contractors based on search term and status filter
  const filteredContractors = contractorData.filter(contract => {
    const matchesSearch = 
      contract.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.service.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && contract.status.toLowerCase() === statusFilter.toLowerCase();
  });

  // Process data for financial visualizations
  const monthlyContractCosts = contractorData
    .filter(contract => contract.status === 'Active')
    .map(contract => {
      const amountStr = contract.monthlyAmount || '';
      const match = amountStr.match(/(\d+,?\d*\.?\d*)/);
      const amount = match ? parseFloat(match[0].replace(',', '')) : 0;
      
      return {
        contractor: contract.contractor,
        service: contract.service.length > 30 ? contract.service.substring(0, 30) + '...' : contract.service,
        amount: amount
      };
    })
    .filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  // Group costs by service type for pie chart
  const serviceTypes = {};
  contractorData
    .filter(contract => contract.status === 'Active')
    .forEach(contract => {
      // Extract base service type
      const serviceWords = contract.service.split(' ');
      const serviceType = serviceWords.length > 2 ? 
        serviceWords.slice(0, 2).join(' ') : contract.service;
        
      // Extract amount from monthly amount
      const amountStr = contract.monthlyAmount || '';
      const match = amountStr.match(/(\d+,?\d*\.?\d*)/);
      const amount = match ? parseFloat(match[0].replace(',', '')) : 0;
      
      if (!serviceTypes[serviceType]) {
        serviceTypes[serviceType] = 0;
      }
      
      serviceTypes[serviceType] += amount;
    });

  // Convert to array for pie chart
  const serviceTypeData = Object.keys(serviceTypes).map(key => ({
    name: key,
    value: serviceTypes[key]
  })).sort((a, b) => b.value - a.value);

  // COLORS for pie chart
  const COLORS = ['#4E4456', '#636AFF', '#36B3C2', '#FFB547', '#FF6B6B', '#05CE91', '#8676FF'];

  // Handle view selection
  const handleContractorSelect = (contractor) => {
    setSelectedContractor(contractor);
    setView('detail');
  };

  return (
    <div className="bg-gray-100 font-sans">
      <header className="bg-[#4E4456] text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Muscat Bay Dashboard</h1>
            <p className="text-gray-300">Utility Management System Overview</p>
          </div>
          <div className="flex space-x-1 bg-white/10 rounded-lg overflow-hidden">
            <button className="px-6 py-2 text-sm bg-white text-[#4E4456]">Monthly</button>
            <button className="px-6 py-2 text-sm">Weekly</button>
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="mb-4 flex gap-2">
          <button 
            className={`px-4 py-2 rounded-md ${view === 'tracker' ? 'bg-[#4E4456] text-white' : 'bg-white'}`}
            onClick={() => setView('tracker')}
          >
            Contractor List
          </button>
          {selectedContractor && (
            <button 
              className={`px-4 py-2 rounded-md ${view === 'detail' ? 'bg-[#4E4456] text-white' : 'bg-white'}`}
              onClick={() => setView('detail')}
            >
              Contractor Details
            </button>
          )}
          <button 
            className={`px-4 py-2 rounded-md ${view === 'finance' ? 'bg-[#4E4456] text-white' : 'bg-white'}`}
            onClick={() => setView('finance')}
          >
            Financial Dashboard
          </button>
        </div>

        {/* Main Contractor Tracker View */}
        {view === 'tracker' && (
          <div>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Total Contracts" 
                value={totalContracts} 
                icon={<FileText className="text-[#4E4456]" size={24} />} 
              />
              <StatCard 
                title="Active Contracts" 
                value={activeContracts} 
                icon={<CheckCircle className="text-green-500" size={24} />} 
              />
              <StatCard 
                title="Expiring Soon" 
                value={nearExpiryContracts.length} 
                icon={<AlertTriangle className="text-[#FFB547]" size={24} />} 
              />
              <StatCard 
                title="Monthly Cost" 
                value={`${totalMonthlyCost.toLocaleString()} OMR`} 
                icon={<DollarSign className="text-blue-500" size={24} />} 
              />
            </div>
            
            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div className="flex items-center space-x-4">
                <button 
                  className={`px-4 py-2 rounded-md ${listView === 'table' ? 'bg-[#4E4456] text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setListView('table')}
                >
                  Table View
                </button>
                <button 
                  className={`px-4 py-2 rounded-md ${listView === 'cards' ? 'bg-[#4E4456] text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setListView('cards')}
                >
                  Card View
                </button>
              </div>
              
              <div className="flex gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search contractors..."
                    className="py-2 pl-10 pr-4 rounded-md border border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                <div className="relative">
                  <select
                    className="py-2 pl-10 pr-8 rounded-md border border-gray-300 appearance-none bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                  <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Table View */}
            {listView === 'table' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          <div className="flex items-center">
                            <span>Contractor</span>
                            <ArrowUpDown size={14} className="ml-1 text-[#4E4456]" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          <div className="flex items-center">
                            <span>Service</span>
                            <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          <div className="flex items-center">
                            <span>Status</span>
                            <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          <div className="flex items-center">
                            <span>End Date</span>
                            <ArrowUpDown size={14} className="ml-1 text-gray-400" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Monthly Cost
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredContractors.map((contract, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{contract.contractor}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">{contract.service}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              contract.status === 'Active' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {contract.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contract.monthlyAmount || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              className="text-[#4E4456] hover:text-[#4E4456]/80"
                              onClick={() => handleContractorSelect(contract)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Card View */}
            {listView === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContractors.map((contract, index) => (
                  <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{contract.contractor}</h3>
                          <p className="text-sm text-gray-500 mt-1">{contract.service}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          contract.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {contract.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">Contract Type:</span>
                          <p className="font-medium">{contract.contractType}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Monthly:</span>
                          <p className="font-medium">{contract.monthlyAmount || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Start Date:</span>
                          <p className="font-medium">{contract.startDate ? new Date(contract.startDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">End Date:</span>
                          <p className="font-medium">{contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                      
                      {contract.note && (
                        <div className="mt-4 text-sm">
                          <span className="text-gray-500">Note:</span>
                          <p className="text-gray-600 mt-1">{contract.note}</p>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <button
                          onClick={() => handleContractorSelect(contract)}
                          className="w-full block text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#4E4456] hover:bg-[#4E4456]/80"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contractor Detail View */}
        {view === 'detail' && selectedContractor && (
          <div>
            <div className="mb-4">
              <button 
                className="inline-flex items-center text-[#4E4456]"
                onClick={() => setView('tracker')}
              >
                ← Back to Contractors
              </button>
            </div>

            {/* Contractor Overview Card */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <div className="px-6 py-4 bg-[#4E4456] text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">{selectedContractor.contractor}</h2>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedContractor.status === 'Active' ? 'bg-green-400 text-green-800' : 
                    'bg-red-400 text-red-800'
                  }`}>
                    {selectedContractor.status}
                  </span>
                </div>
                <p className="text-gray-200 mt-1">{selectedContractor.service}</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Contract Period */}
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2"><Calendar className="text-blue-500" /></div>
                      <h3 className="text-md font-medium text-gray-700">Contract Period</h3>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Start Date:</span>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedContractor.startDate ? new Date(selectedContractor.startDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">End Date:</span>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedContractor.endDate ? new Date(selectedContractor.endDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Financial */}
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2"><DollarSign className="text-green-500" /></div>
                      <h3 className="text-md font-medium text-gray-700">Financial</h3>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Monthly Amount:</span>
                        <p className="text-sm font-medium text-gray-900">{selectedContractor.monthlyAmount || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Yearly Amount:</span>
                        <p className="text-sm font-medium text-gray-900">{selectedContractor.yearlyAmount || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Contract Type:</span>
                        <p className="text-sm font-medium text-gray-900">{selectedContractor.contractType}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        {selectedContractor.status === 'Active' ? 
                          <CheckCircle className="text-green-500" /> : 
                          <AlertTriangle className="text-red-500" />
                        }
                      </div>
                      <h3 className="text-md font-medium text-gray-700">Status</h3>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Status:</span>
                        <p className={`text-sm font-medium ${
                          selectedContractor.status === 'Active' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {selectedContractor.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contract Progress */}
                {selectedContractor.status === 'Active' && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Contract Progress</h3>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full rounded-full bg-green-500" 
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Start</span>
                      <span>45% Complete</span>
                      <span>End</span>
                    </div>
                  </div>
                )}
                
                {/* Additional Notes */}
                {selectedContractor.note && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                    <p className="text-gray-600">{selectedContractor.note}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Documents Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Documents</h3>
              <div className="border rounded-md divide-y">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded bg-red-100 text-red-700">
                      PDF
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Contract Agreement</p>
                      <p className="text-xs text-gray-500">2.4 MB • Updated 15 Jan 2025</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded bg-blue-100 text-blue-700">
                      DOCX
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Service Level Agreement</p>
                      <p className="text-xs text-gray-500">1.8 MB • Updated 15 Jan 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Dashboard */}
        {view === 'finance' && (
          <div>
            <div className="mb-6">
              <button 
                className="inline-flex items-center text-[#4E4456]"
                onClick={() => setView('tracker')}
              >
                ← Back to Contractors
              </button>
            </div>

            {/* Financial summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Active Contracts Cost */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-[#4E4456]/20 mr-4">
                    <DollarSign className="h-6 w-6 text-[#4E4456]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Monthly Cost</p>
                    <div className="flex items-end">
                      <p className="text-2xl font-bold">{totalMonthlyCost.toLocaleString()} OMR</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">2.5% from last month</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Annual Budget */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-blue-100 mr-4">
                    <DollarSign className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Budget</p>
                    <div className="flex items-end">
                      <p className="text-2xl font-bold">{(totalMonthlyCost * 12).toLocaleString()} OMR</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      <span className="text-gray-500">Budget Remaining: 45%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Active Contracts */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-green-100 mr-4">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Contracts</p>
                    <div className="flex items-end">
                      <p className="text-2xl font-bold">{activeContracts}</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      <span className="text-gray-500">Total Yearly: {(totalMonthlyCost * 12).toLocaleString()} OMR</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Budget Alerts */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-red-100 mr-4">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Budget Alerts</p>
                    <div className="flex items-end">
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      <span className="text-red-500">Requires attention</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {/* Monthly Cost by Contractor */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Cost by Contractor</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyContractCosts}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="contractor" 
                        type="category" 
                        tick={{ fontSize: 12 }} 
                        width={100} 
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()} OMR`, 'Monthly Cost']}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Bar dataKey="amount" fill="#4E4456" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Cost by Service Type */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Cost Distribution by Service Type</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={1}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {serviceTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value.toLocaleString()} OMR`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Top 5 Contracts by Monthly Cost */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Contracts by Monthly Cost</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contractor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Cost
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Yearly Cost
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        % of Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {monthlyContractCosts.slice(0, 5).map((contract, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{contract.contractor}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{contract.service}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{contract.amount.toLocaleString()} OMR</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{(contract.amount * 12).toLocaleString()} OMR</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {((contract.amount / totalMonthlyCost) * 100).toFixed(1)}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default App;