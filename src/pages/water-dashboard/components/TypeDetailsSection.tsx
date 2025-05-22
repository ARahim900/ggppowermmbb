
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface TypeDetailsSectionProps {
  activeMonthFilter: string;
  activeYearFilter: string;
  THEME: any;
}

const TypeDetailsSection: React.FC<TypeDetailsSectionProps> = ({ activeMonthFilter, activeYearFilter, THEME }) => {
  // Sample data for usage types
  const typeData = [
    { name: 'Irrigation', value: 2400 },
    { name: 'Residential', value: 1600 },
    { name: 'Commercial', value: 800 },
    { name: 'Hotel', value: 1200 },
    { name: 'Recreational', value: 500 },
  ];

  // Sample data for monthly breakdown by type
  const monthlyTypeData = [
    { month: 'Jan', Irrigation: 2400, Residential: 1400, Commercial: 700, Hotel: 1100, Recreational: 400 },
    { month: 'Feb', Irrigation: 2200, Residential: 1500, Commercial: 780, Hotel: 1050, Recreational: 450 },
    { month: 'Mar', Irrigation: 2500, Residential: 1600, Commercial: 750, Hotel: 1200, Recreational: 500 },
    { month: 'Apr', Irrigation: 2300, Residential: 1550, Commercial: 820, Hotel: 1150, Recreational: 480 },
  ];

  // Colors for different types
  const COLORS = [
    THEME.primary,
    THEME.secondary,
    THEME.accent,
    THEME.primaryLight,
    THEME.secondaryLight
  ];

  return (
    <div className="space-y-6">
      {/* Type Distribution Pie Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Water Usage by Type</h3>
        <div className="h-96 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toLocaleString()} m³`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <h4 className="text-lg font-medium text-gray-700 mb-3">Distribution Insights</h4>
            <ul className="space-y-2">
              {typeData.map((type, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-gray-700">{type.name}: </span>
                  <span className="ml-2 font-medium">{type.value.toLocaleString()} m³</span>
                  <span className="ml-2 text-gray-500">
                    ({((type.value / typeData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-600 mb-1">Total Consumption:</h4>
              <p className="text-xl font-bold text-gray-800">
                {typeData.reduce((sum, item) => sum + item.value, 0).toLocaleString()} m³
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trend By Type */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Trends by Usage Type</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyTypeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {typeData.map((type, index) => (
                <Bar 
                  key={index} 
                  dataKey={type.name} 
                  stackId="a" 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TypeDetailsSection;
