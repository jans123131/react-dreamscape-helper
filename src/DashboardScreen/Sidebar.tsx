import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Upload,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/app/', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/app/settings', icon: Settings, label: 'Paramètres' },
    { path: '/app/clients', icon: Users, label: 'Clients' },
    { path: '/app/upload', icon: Upload, label: 'Vidéos' },
    { path: '/app/seasons', icon: Calendar, label: 'Saisons' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-72 bg-dashboard-sidebar text-gray-600 overflow-hidden">
      {/* Background overlay with gradient */}
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url(/lovable-uploads/822785e2-1af0-42b6-b6a6-adde97b0442b.png)',
          backgroundBlendMode: 'overlay'
        }} 
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Logo */}
        <div className="mb-10 flex items-center justify-center h-16">
          <img 
            src="/lovable-uploads/822785e2-1af0-42b6-b6a6-adde97b0442b.png" 
            alt="Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon 
                    size={20} 
                    className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight 
                  size={16} 
                  className={`transform transition-transform duration-200 ${
                    isActive ? 'text-white rotate-90' : 'text-gray-400 group-hover:text-primary'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Bottom section with gradient border */}
        <div className="mt-auto pt-6 border-t border-gray-200/10">
          <div className="text-sm text-gray-500 text-center">
            Version 1.0.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;