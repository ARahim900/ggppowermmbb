
import React from 'react';
import { Home, Droplet, Zap, Building2, Users, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            "flex items-center px-4 py-2 hover:bg-gray-700 transition-colors duration-200",
            isActive ? "bg-gray-700 font-semibold" : "text-gray-400"
          )
        }
      >
        {icon}
        {label && <span className="ml-3">{label}</span>}
      </NavLink>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, activeNav, setActiveNav }) => {
  return (
    <div className={cn(
      "bg-[#4E4456] text-white transition-all duration-300 flex flex-col h-screen",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between">
        <h1 className={cn("text-lg font-bold", collapsed ? "hidden" : "")}>
          Analytics
        </h1>
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-gray-700 rounded">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6 flex-1">
        <NavItem 
          icon={<Home size={20} />} 
          label={collapsed ? "" : "Dashboard"} 
          to="/"
          onClick={() => setActiveNav('Dashboard')}
        />
        <NavItem 
          icon={<Droplet size={20} />} 
          label={collapsed ? "" : "Water Analysis"} 
          to="/water-dashboard"
          onClick={() => setActiveNav('Water Analysis')}
        />
        <NavItem 
          icon={<Zap size={20} />} 
          label={collapsed ? "" : "Electricity Analysis"} 
          to="/electricity-dashboard"
          onClick={() => setActiveNav('Electricity Analysis')}
        />
        <NavItem 
          icon={<Building2 size={20} />} 
          label={collapsed ? "" : "STP Plant"} 
          to="/stp-plant-dashboard"
          onClick={() => setActiveNav('STP Plant')}
        />
        <NavItem 
          icon={<Users size={20} />} 
          label={collapsed ? "" : "Contractor Tracker"} 
          to="/contractor-tracker"
          onClick={() => setActiveNav('Contractor Tracker')}
        />
      </nav>

      <div className="p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User size={16} className="text-gray-300" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
