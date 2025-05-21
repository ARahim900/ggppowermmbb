
import React from 'react';
import { Home, Droplet, Zap, Building2, Users, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={cn(
        "flex items-center px-6 py-3 text-gray-300 hover:bg-white/10 transition-colors",
        active && "bg-white/10 text-white"
      )}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </a>
  );
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, activeNav, setActiveNav }) => {
  return (
    <div className={cn(
      "bg-[#4E4456] text-white transition-all duration-300 flex flex-col h-screen",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center p-5 border-b border-gray-700">
        <div className="w-8 h-8 bg-white/20 flex items-center justify-center rounded">
          <div className="w-4 h-4 bg-white"></div>
        </div>
        {!collapsed && <h1 className="ml-3 text-xl font-medium">Muscat Bay</h1>}
        <button className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
          <ChevronLeft size={20} className={cn(collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="mt-6 flex-1">
        <NavItem 
          icon={<Home size={20} />} 
          label={collapsed ? "" : "Dashboard"} 
          active={activeNav === 'Dashboard'} 
          onClick={() => setActiveNav('Dashboard')}
        />
        <NavItem 
          icon={<Droplet size={20} />} 
          label={collapsed ? "" : "Water Analysis"} 
          active={activeNav === 'Water Analysis'} 
          onClick={() => setActiveNav('Water Analysis')}
        />
        <NavItem 
          icon={<Zap size={20} />} 
          label={collapsed ? "" : "Electricity Analysis"} 
          active={activeNav === 'Electricity Analysis'} 
          onClick={() => setActiveNav('Electricity Analysis')}
        />
        <NavItem 
          icon={<Building2 size={20} />} 
          label={collapsed ? "" : "STP Plant"} 
          active={activeNav === 'STP Plant'} 
          onClick={() => setActiveNav('STP Plant')}
        />
        <NavItem 
          icon={<Users size={20} />} 
          label={collapsed ? "" : "Contractor Tracker"} 
          active={activeNav === 'Contractor Tracker'} 
          onClick={() => setActiveNav('Contractor Tracker')}
        />
      </nav>

      <div className={cn("border-t border-gray-700", collapsed ? "p-3" : "p-4")}>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@muscatbay.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
