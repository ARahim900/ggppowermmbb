
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Droplet, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface OverviewSectionProps {
  activeMonthFilter: string;
  activeYearFilter: string;
  activeZoneFilter: string;
  THEME: any;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ activeMonthFilter, activeYearFilter, activeZoneFilter, THEME }) => {
  // Sample data for charts
  const monthlyConsumptionData = [
    { name: 'Jan', total: 4000 },
    { name: 'Feb', total: 3000 },
    { name: 'Mar', total: 2000 },
    { name: 'Apr', total: 2780 },
    { name: 'May', total: 1890 },
    { name: 'Jun', total: 2390 },
  ];

  const lossData = [
    { name: 'Stage 1 Loss', value: 400 },
    { name: 'Stage 2 Loss', value: 300 },
    { name: 'Consumption', value: 1300 },
  ];

  const COLORS = [THEME.accent, THEME.primary, THEME.secondary];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Water Supply"
          value="4,632"
          change="+5.3%"
          changeType="increase"
          icon={<Droplet size={20} />}
          trend="neutral"
          description="Total water supplied to the system"
          THEME={THEME}
        />
        
        <KPICard
          title="Consumption"
          value="3,219"
          change="+2.1%"
          changeType="increase"
          icon={<TrendingUp size={20} />}
          trend="neutral"
          description="Total water consumed"
          THEME={THEME}
        />
        
        <KPICard
          title="Loss Volume"
          value="1,413"
          change="+12.4%"
          changeType="increase"
          icon={<AlertTriangle size={20} />}
          trend="critical"
          description="Total water lost in the system"
          THEME={THEME}
        />
        
        <KPICard
          title="Efficiency"
          value="69.5%"
          change="-3.2%"
          changeType="decrease"
          icon={<TrendingDown size={20} />}
          trend="warning"
          description="System efficiency (consumption/supply)"
          THEME={THEME}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Consumption Trend */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Consumption Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyConsumptionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke={THEME.secondary} strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Loss Analysis */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Water Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lossData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {lossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
