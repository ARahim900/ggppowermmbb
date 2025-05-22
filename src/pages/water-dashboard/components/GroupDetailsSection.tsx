
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Database } from 'lucide-react';

interface GroupDetailsSectionProps {
  activeMonthFilter: string;
  activeYearFilter: string;
  activeZoneFilter: string;
  THEME: any;
}

const GroupDetailsSection: React.FC<GroupDetailsSectionProps> = ({ 
  activeMonthFilter, 
  activeYearFilter, 
  activeZoneFilter, 
  THEME 
}) => {
  // Sample zone data
  const zoneData = [
    { name: 'Zone FM', l1: 2000, l2: 1800, l3: 1600 },
    { name: 'Zone 03A', l1: 1500, l2: 1300, l3: 1200 },
    { name: 'Zone 03B', l1: 1200, l2: 1100, l3: 950 },
    { name: 'Zone 05', l1: 1800, l2: 1600, l3: 1400 },
    { name: 'Zone 08', l1: 2200, l2: 1900, l3: 1700 },
    { name: 'Village Square', l1: 900, l2: 850, l3: 800 }
  ];
  
  // Filter data based on selected zone if not "All Zones"
  const filteredData = activeZoneFilter === 'All Zones' 
    ? zoneData 
    : zoneData.filter(item => item.name === activeZoneFilter);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Water Consumption by Zone Level</h3>
        <p className="text-gray-500 mb-4">
          Comparing L1 (Main Supply), L2 (Zone Meters), and L3 (Individual Meters) readings by zone.
        </p>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="l1" name="L1 (Main Supply)" fill={THEME.primary} />
              <Bar dataKey="l2" name="L2 (Zone Meters)" fill={THEME.secondary} />
              <Bar dataKey="l3" name="L3 (Individual Meters)" fill={THEME.accent} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Zone Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L1 Volume (m³)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L2 Volume (m³)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L3 Volume (m³)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage 1 Loss</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage 2 Loss</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency (%)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((zone) => {
                const stage1Loss = zone.l1 - zone.l2;
                const stage2Loss = zone.l2 - zone.l3;
                const efficiency = ((zone.l3 / zone.l1) * 100).toFixed(1);
                
                return (
                  <tr key={zone.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{zone.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zone.l1.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zone.l2.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zone.l3.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage1Loss.toLocaleString()} ({((stage1Loss/zone.l1)*100).toFixed(1)}%)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage2Loss.toLocaleString()} ({((stage2Loss/zone.l2)*100).toFixed(1)}%)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{efficiency}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsSection;
