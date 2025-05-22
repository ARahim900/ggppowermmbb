
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Droplet, TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
  trend: 'good' | 'warning' | 'critical' | 'neutral';
  description: string;
  THEME: any;
}

// KPI Card Component
const KPICard: React.FC<KPICardProps> = ({ title, value, change, changeType, icon, trend, description, THEME }) => {
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
            {change && (
              <>
                <span className={`flex items-center ${
                  changeType === 'increase' 
                    ? (trend === 'good' ? 'text-green-500' : 'text-red-500')
                    : (trend === 'good' ? 'text-green-500' : 'text-red-500')
                }`}>
                  {changeType === 'increase' ? (
                    <ArrowUpRight size={18} className="mr-1" />
                  ) : (
                    <ArrowDownRight size={18} className="mr-1" />
                  )}
                  {change}
                </span>
                <span className="ml-2 text-gray-500 text-sm">{description}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
