
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface LossDetailsSectionProps {
  activeMonthFilter: string;
  activeYearFilter: string;
  activeZoneFilter: string;
  THEME: any;
}

const LossDetailsSection: React.FC<LossDetailsSectionProps> = ({ 
  activeMonthFilter, 
  activeYearFilter, 
  activeZoneFilter, 
  THEME 
}) => {
  // Sample data for different zones
  const zoneData = [
    { name: 'Zone FM', stage1Loss: 200, stage2Loss: 200 },
    { name: 'Zone 03A', stage1Loss: 200, stage2Loss: 100 },
    { name: 'Zone 03B', stage1Loss: 100, stage2Loss: 150 },
    { name: 'Zone 05', stage1Loss: 200, stage2Loss: 200 },
    { name: 'Zone 08', stage1Loss: 300, stage2Loss: 200 },
    { name: 'Village Square', stage1Loss: 50, stage2Loss: 50 }
  ];

  // Sample trend data for past 6 months
  const trendData = [
    { month: 'Nov', stage1Loss: 800, stage2Loss: 700 },
    { month: 'Dec', stage1Loss: 900, stage2Loss: 800 },
    { month: 'Jan', stage1Loss: 950, stage2Loss: 850 },
    { month: 'Feb', stage1Loss: 1000, stage2Loss: 900 },
    { month: 'Mar', stage1Loss: 1050, stage2Loss: 950 },
    { month: 'Apr', stage1Loss: 1100, stage2Loss: 900 },
  ];

  // Filter data based on selected zone if not "All Zones"
  const filteredZoneData = activeZoneFilter === 'All Zones' 
    ? zoneData 
    : zoneData.filter(item => item.name === activeZoneFilter);

  // Calculate totals for the selected zone
  const totalStage1Loss = filteredZoneData.reduce((sum, item) => sum + item.stage1Loss, 0);
  const totalStage2Loss = filteredZoneData.reduce((sum, item) => sum + item.stage2Loss, 0);
  const totalLoss = totalStage1Loss + totalStage2Loss;

  // Calculate problem areas (zones with highest loss percentages)
  const problemZones = [...zoneData].sort((a, b) => {
    return (b.stage1Loss + b.stage2Loss) - (a.stage1Loss + a.stage2Loss);
  }).slice(0, 3);  // Top 3 problem areas

  return (
    <div className="space-y-6">
      {/* Problem Zone Summary */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="text-gray-500 text-sm font-medium">Stage 1 Loss (L1-L2)</h4>
            <p className="text-2xl font-bold text-gray-800 mt-2">{totalStage1Loss.toLocaleString()} m³</p>
            <p className="text-gray-500 text-sm mt-1">{((totalStage1Loss / (totalStage1Loss + totalStage2Loss)) * 100).toFixed(1)}% of total losses</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="text-gray-500 text-sm font-medium">Stage 2 Loss (L2-L3)</h4>
            <p className="text-2xl font-bold text-gray-800 mt-2">{totalStage2Loss.toLocaleString()} m³</p>
            <p className="text-gray-500 text-sm mt-1">{((totalStage2Loss / (totalStage1Loss + totalStage2Loss)) * 100).toFixed(1)}% of total losses</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="text-gray-500 text-sm font-medium">Total Loss</h4>
            <p className="text-2xl font-bold text-gray-800 mt-2">{totalLoss.toLocaleString()} m³</p>
            <p className="text-gray-500 text-sm mt-1">Combined system losses</p>
          </div>
        </div>
        
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <AlertTriangle size={18} className="text-yellow-500 mr-2" />
          Problem Areas
        </h4>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Loss (m³)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage 1 Loss</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage 2 Loss</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Required</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {problemZones.map((zone, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{zone.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(zone.stage1Loss + zone.stage2Loss).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zone.stage1Loss} m³</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zone.stage2Loss} m³</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      index === 0 ? 'bg-red-100 text-red-800' : 
                      index === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {index === 0 ? 'Urgent' : index === 1 ? 'High' : 'Medium'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loss Breakdown Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Breakdown by Zone</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredZoneData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stage1Loss" name="Stage 1 Loss" stackId="a" fill={THEME.primary} />
              <Bar dataKey="stage2Loss" name="Stage 2 Loss" stackId="a" fill={THEME.secondary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Loss Trend Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Loss Trend (6 Months)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stage1Loss" name="Stage 1 Loss" stroke={THEME.primary} strokeWidth={2} />
              <Line type="monotone" dataKey="stage2Loss" name="Stage 2 Loss" stroke={THEME.secondary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LossDetailsSection;
