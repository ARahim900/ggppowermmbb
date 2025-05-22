
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const LossDetailsSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter, THEME }) => {
  // Sample data for loss trends
  const lossTrendData = [
    { month: 'Jan', stage1Loss: 650, stage2Loss: 850 },
    { month: 'Feb', stage1Loss: 620, stage2Loss: 830 },
    { month: 'Mar', stage1Loss: 580, stage2Loss: 810 },
    { month: 'Apr', stage1Loss: 520, stage2Loss: 760 },
    { month: 'May', stage1Loss: 490, stage2Loss: 720 },
    { month: 'Jun', stage1Loss: 540, stage2Loss: 770 },
    { month: 'Jul', stage1Loss: 510, stage2Loss: 740 },
    { month: 'Aug', stage1Loss: 480, stage2Loss: 730 },
    { month: 'Sep', stage1Loss: 450, stage2Loss: 700 },
    { month: 'Oct', stage1Loss: 430, stage2Loss: 680 },
    { month: 'Nov', stage1Loss: 410, stage2Loss: 640 },
    { month: 'Dec', stage1Loss: 390, stage2Loss: 620 }
  ];

  // Sample data for loss by zone
  const lossByZoneData = [
    { name: 'Zone FM', loss: 420 },
    { name: 'Zone 03A', loss: 350 },
    { name: 'Zone 03B', loss: 280 },
    { name: 'Zone 05', loss: 190 },
    { name: 'Zone 08', loss: 140 }
  ];

  // Loss categories
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
      {/* Problem Zone Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm uppercase text-gray-600 mb-2">Total Loss Rate</div>
            <div className="text-3xl font-bold text-gray-900">13.3%</div>
            <div className="text-green-600 text-sm mt-1">▼ 1.2% vs. previous month</div>
            <p className="mt-4 text-gray-600">
              The overall water loss rate is 13.3%, with a significant reduction observed compared to the previous month. 
              The majority of losses occur in the distribution network (Stage 2).
            </p>
          </div>
          <div>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Stage 1 Loss (L1→L2)</span>
                <span className="text-sm font-medium text-gray-700">4.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#8ED2D6] h-2.5 rounded-full" style={{ width: '4.8%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Stage 2 Loss (L2→L3)</span>
                <span className="text-sm font-medium text-gray-700">8.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#9A95A6] h-2.5 rounded-full" style={{ width: '8.5%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loss Trends */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Trend Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lossTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9A95A6" />
              <YAxis stroke="#9A95A6" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stage1Loss" name="Stage 1 Loss" stroke="#8ED2D6" strokeWidth={2} />
              <Line type="monotone" dataKey="stage2Loss" name="Stage 2 Loss" stroke="#9A95A6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loss by Zone */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss by Zone</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={lossByZoneData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9A95A6" />
                <YAxis stroke="#9A95A6" />
                <Tooltip />
                <Legend />
                <Bar dataKey="loss" name="Water Loss (m³)" fill="#9A95A6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Loss Categories */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Categories</h3>
          <div className="h-72">
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
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Loss Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Loss Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L1 Input (m³)</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L2 Measured (m³)</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L3 Billed (m³)</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage 1 Loss (%)</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage 2 Loss (%)</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Loss (%)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Zone FM</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,650</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,510</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,090</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">3.8%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">12.0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">15.3%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Zone 03A</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,450</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,340</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">4.5%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">10.3%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">14.3%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Zone 03B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,120</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,040</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,840</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">3.8%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">9.8%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">13.2%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Zone 05</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,580</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,510</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,390</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">4.4%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">7.9%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">12.0%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Zone 08</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">850</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">810</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">710</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">4.7%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">12.3%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">16.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LossDetailsSection;
