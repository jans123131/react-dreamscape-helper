import React from 'react';
import { Bell, User } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="fixed top-0 right-0 left-64 h-16 bg-dashboard-topbar border-b border-border/40 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-white">Welcome back!</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-primary/10 rounded-full">
          <Bell className="h-5 w-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-primary/10 rounded-full">
          <User className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;