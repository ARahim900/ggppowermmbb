
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Droplet, Zap, Building2, Users, Menu, X } from 'lucide-react';

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/water-dashboard', label: 'Water Analysis', icon: Droplet },
    { path: '/electricity-dashboard', label: 'Electricity', icon: Zap },
    { path: '/stp-plant-dashboard', label: 'STP Plant', icon: Building2 },
    { path: '/contractor-tracker', label: 'Contractors', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-3 h-8 bg-[#8ED2D6]"></div>
              <div className="absolute bottom-0 left-4 w-3 h-6 bg-[#8ED2D6]"></div>
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#8ED2D6]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
              <div className="absolute bottom-0 right-0 w-8 h-3 bg-[#4E4456]" style={{ transform: 'skew(-45deg)', transformOrigin: 'bottom right' }}></div>
              <div className="absolute bottom-4 right-0 w-8 h-3 bg-[#4E4456]" style={{ transform: 'skew(-45deg)', transformOrigin: 'bottom right' }}></div>
            </div>
            <span className="text-lg font-bold text-[#4E4456] hidden sm:block">Muscat Bay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-[#8ED2D6] text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-[#4E4456]'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#8ED2D6] text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-[#4E4456]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
