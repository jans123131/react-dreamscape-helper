import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, History, Users, Upload } from 'lucide-react';

interface SidebarProps {
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/app/', icon: Home, label: 'Dashboard' },
    { path: '/app/settings', icon: Settings, label: 'Settings' },
    { path: '/app/history', icon: History, label: 'History' },
    { path: '/app/clients', icon: Users, label: 'Clients' },
    { path: '/app/upload', icon: Upload, label: 'Videos' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-dashboard-sidebar text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              location.pathname === item.path
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-primary/10'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;