
import React from 'react';
import { Sidebar } from './Sidebar';
import { useSidebar } from '../context/SidebarContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-background flex flex-col sm:flex-row">
      <Sidebar />
      <main 
        className={cn(
          "min-h-screen flex-1 transition-all duration-300 ease-in-out pt-16 pb-6 lg:pt-2",
          isOpen ? "lg:pl-64" : "lg:pl-20"
        )}
      >
        <div className="container max-w-7xl mx-auto p-2 sm:p-4 lg:p-6 animate-page-transition">
          {children}
        </div>
      </main>
    </div>
  );
};
