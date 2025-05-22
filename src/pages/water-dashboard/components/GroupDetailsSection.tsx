
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const GroupDetailsSection = ({ activeMonthFilter, activeYearFilter, activeZoneFilter, THEME }) => {
  // Sample data for zone groups
  const zoneConsumptionData = [
    { month: 'Jan', bulkMeter: 2800, individualMeters: 2520 },
    { month: 'Feb', bulkMeter: 2900, individualMeters: 2610 },
    { month: 'Mar', bulkMeter: 3100, individualMeters: 2790 },
    { month: 'Apr', bulkMeter: 3250, individualMeters: 2925 }
  ];

  // Sample data for meter performance
  const meterPerformanceData = [
    { name: 'Meter 01', reading: 650, efficiency: 98 },
    { name: 'Meter 02', reading: 720, efficiency: 97 },
    { name: 'Meter 03', reading: 580, efficiency: 99 },
    { name: 'Meter 04', reading: 495, efficiency: 95 },
    { name: 'Meter 05', reading: 480, efficiency: 96 }
  ];

  return (
    <div className="space-y-6">
      {/* Zone Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Zone Group Analysis: {activeZoneFilter}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500">Bulk Meter Reading</div>
            <div className="text-2xl font-bold text-gray-900">3,250 m³</div>
            <div className="text-xs text-green-600 mt-1">▲ 4.8% from last month</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500">Individual Meters Total</div>
            <div className="text-2xl font-bold text-gray-900">2,925 m³</div>
            <div className="text-xs text-green-600 mt-1">▲ 4.8% from last month</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500">Loss Rate</div>
            <div className="text-2xl font-bold text-gray-900">10.0%</div>
            <div className="text-xs text-gray-600 mt-1">No change from last month</div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={zoneConsumptionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9A95A6" />
              <YAxis stroke="#9A95A6" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bulkMeter" name="Bulk Meter" stroke="#8ED2D6" strokeWidth={2} />
              <Line type="monotone" dataKey="individualMeters" name="Individual Meters" stroke="#9A95A6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Individual Meters Performance */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Individual Meters Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={meterPerformanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9A95A6" />
              <YAxis yAxisId="left" orientation="left" stroke="#9A95A6" />
              <YAxis yAxisId="right" orientation="right" stroke="#9A95A6" domain={[90, 100]} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="reading" name="Meter Reading (m³)" fill="#8ED2D6" />
              <Bar yAxisId="right" dataKey="efficiency" name="Efficiency (%)" fill="#9A95A6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Meter Readings */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Meter Readings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meter ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Reading</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Reading</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Inspection</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">WM-FM-01</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Zone FM Entry</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45,870 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42,620 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,250 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Normal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">WM-FM-02</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Villa Cluster A</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18,450 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">17,730 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">720 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Normal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">WM-FM-03</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Retail Area</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12,680 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12,100 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">580 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Normal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-14</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">WM-FM-04</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Landscape Irrigation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">32,450 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">31,955 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">495 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Suspect</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-10</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">WM-FM-05</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Villa Cluster B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14,120 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13,640 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">480 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Normal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">WM-FM-06</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hotel & Amenities</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25,780 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25,130 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">650 m³</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Normal</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-04-12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsSection;
