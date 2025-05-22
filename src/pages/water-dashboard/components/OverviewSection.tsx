
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Droplet, TrendingUp, TrendingDown, CircleOff } from 'lucide-react';

// KPI Card Component
export const KPICard = ({ title, value, change, changeType, icon, trend, description, THEME }) => {
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
              <TrendingUp size={18} className={`${trend === 'good' ? 'text-green-500' : 'text-red-500'}`} />
            ) : (
              <TrendingDown size={18} className={`${trend === 'good' ? 'text-green-500' : 'text-red-500'}`} />
            )}
            <span className={`ml-1 ${
              trend === 'good' ? 'text-green-500' : 
              trend === 'warning' ? 'text-yellow-500' : 
              trend === 'critical' ? 'text-red-500' : 
              'text-gray-500'
            }`}>
              {change}
            </span>
            <span className="ml-1 text-gray-500 text-sm">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Section Component
const OverviewSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter, THEME }) => {
  // Sample data for overview section
  const kpiData = [
    {
      title: 'Total Consumption',
      value: '9,543',
      change: '+2.4%',
      changeType: 'increase',
      icon: <Droplet size={20} />,
      trend: 'warning',
      description: 'vs. last month'
    },
    {
      title: 'Total Loss',
      value: '1,267',
      change: '-3.1%',
      changeType: 'decrease',
      icon: <CircleOff size={20} />,
      trend: 'good',
      description: 'vs. last month'
    },
    {
      title: 'Efficiency Rate',
      value: '86.7%',
      change: '+1.3%',
      changeType: 'increase',
      icon: <TrendingUp size={20} />,
      trend: 'good', 
      description: 'vs. last month'
    },
    {
      title: 'Cost Impact',
      value: '$5,280',
      change: '-2.5%',
      changeType: 'decrease',
      icon: <TrendingDown size={20} />,
      trend: 'good',
      description: 'vs. last month'
    }
  ];

  // Sample data for consumption chart
  const consumptionData = [
    { month: 'Jan', consumption: 7800 },
    { month: 'Feb', consumption: 8200 },
    { month: 'Mar', consumption: 8700 },
    { month: 'Apr', consumption: 9300 },
    { month: 'May', consumption: 9800 },
    { month: 'Jun', consumption: 10500 },
    { month: 'Jul', consumption: 11200 },
    { month: 'Aug', consumption: 10800 },
    { month: 'Sep', consumption: 10100 },
    { month: 'Oct', consumption: 9400 },
    { month: 'Nov', consumption: 8900 },
    { month: 'Dec', consumption: 9500 }
  ];

  // Sample data for loss by category
  const lossCategoryData = [
    { name: 'Leakage', value: 45 },
    { name: 'Metering Errors', value: 25 },
    { name: 'Unbilled Use', value: 15 },
    { name: 'Theft', value: 10 },
    { name: 'Other', value: 5 }
  ];

  const COLORS = [THEME.primary, THEME.secondary, THEME.primaryLight, THEME.secondaryLight, THEME.accent];

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon}
            trend={kpi.trend}
            description={kpi.description}
            THEME={THEME}
          />
        ))}
      </div>

      {/* Consumption Trends */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Consumption Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={consumptionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9A95A6" />
              <YAxis stroke="#9A95A6" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderColor: '#e2e8f0', 
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="consumption" stroke="#8ED2D6" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Loss Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loss by Category */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss by Category</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lossCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {lossCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Zone Comparison */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Zone Consumption Comparison</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Zone FM', consumption: 3245 },
                  { name: 'Zone 03A', consumption: 2198 },
                  { name: 'Zone 03B', consumption: 1876 },
                  { name: 'Zone 05', consumption: 1452 },
                  { name: 'Zone 08', consumption: 768 }
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9A95A6" />
                <YAxis stroke="#9A95A6" />
                <Tooltip />
                <Legend />
                <Bar dataKey="consumption" name="Consumption" fill="#9A95A6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
