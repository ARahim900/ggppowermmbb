
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const TypeDetailsSection = ({ activeMonthFilter, activeYearFilter, THEME }) => {
  // Sample data for water consumption by type
  const consumptionByTypeData = [
    { name: 'Irrigation', consumption: 4200 },
    { name: 'Residential', consumption: 2800 },
    { name: 'Commercial', consumption: 1500 },
    { name: 'Recreational', consumption: 850 },
    { name: 'Municipal', consumption: 450 }
  ];

  // Sample data for monthly comparison by type
  const monthlyComparisonData = [
    { month: 'Jan', irrigation: 3800, residential: 2500, commercial: 1200, recreational: 700, municipal: 400 },
    { month: 'Feb', irrigation: 3900, residential: 2600, commercial: 1300, recreational: 750, municipal: 420 },
    { month: 'Mar', irrigation: 4000, residential: 2650, commercial: 1350, recreational: 800, municipal: 435 },
    { month: 'Apr', irrigation: 4200, residential: 2800, commercial: 1500, recreational: 850, municipal: 450 }
  ];

  const COLORS = [THEME.primary, THEME.secondary, THEME.primaryLight, THEME.secondaryLight, THEME.accent];

  return (
    <div className="space-y-6">
      {/* Distribution by Type */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Water Consumption by Type</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={consumptionByTypeData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9A95A6" />
                <YAxis dataKey="name" type="category" stroke="#9A95A6" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="consumption" name="Water Usage (m³)" fill="#8ED2D6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={consumptionByTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="consumption"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {consumptionByTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} m³`, 'Consumption']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Monthly Comparison by Type */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Consumption by Type</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyComparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9A95A6" />
              <YAxis stroke="#9A95A6" />
              <Tooltip />
              <Legend />
              <Bar dataKey="irrigation" name="Irrigation" fill={COLORS[0]} stackId="a" />
              <Bar dataKey="residential" name="Residential" fill={COLORS[1]} stackId="a" />
              <Bar dataKey="commercial" name="Commercial" fill={COLORS[2]} stackId="a" />
              <Bar dataKey="recreational" name="Recreational" fill={COLORS[3]} stackId="a" />
              <Bar dataKey="municipal" name="Municipal" fill={COLORS[4]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Detailed Analysis Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Type Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage Type</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Usage (m³)</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Month (m³)</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change (%)</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">YTD Total (m³)</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Irrigation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4,200</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+5.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">16,100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Average</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Residential</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,800</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,650</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+5.7%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10,550</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Good</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Commercial</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,350</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+11.1%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5,350</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Poor</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Recreational</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">850</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">800</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+6.3%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Average</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Municipal</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">450</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">435</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+3.4%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,705</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Good</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TypeDetailsSection;
