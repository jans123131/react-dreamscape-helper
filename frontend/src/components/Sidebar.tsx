
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings,
  Menu,
  LogOut,
  Mail
} from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '@/lib/utils';

const SidebarLink: React.FC<{ 
  to: string; 
  icon: React.ReactNode; 
  label: string;
  isActive: boolean;
}> = ({ to, icon, label, isActive }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "sidebar-item group",
        isActive ? "sidebar-item-active" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      <span className={cn(
        "transition-all duration-300",
        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
      )}>
        {icon}
      </span>
      <span className="transition-colors duration-300">{label}</span>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, toggle, isMobile } = useSidebar();
  const { user, logout, hasAccess } = useAuth();
  
  // Define all possible routes
  const allRoutes = [
    { path: '/dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={20} /> },
    { path: '/properties', label: 'Propriétés', icon: <Building2 size={20} /> },
    { path: '/bookings', label: 'Réservations', icon: <Calendar size={20} /> },
    { path: '/users', label: 'Utilisateurs', icon: <Users size={20} /> },
    { path: '/reviews', label: 'Avis', icon: <MessageSquare size={20} /> },
    { path: '/messages', label: 'Messages', icon: <Mail size={20} /> },
    { path: '/settings', label: 'Paramètres', icon: <Settings size={20} /> },
  ];

  // Filter routes based on user role
  const routes = allRoutes.filter(route => hasAccess(route.path));

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggle}
        />
      )}
      
      {/* Sidebar toggle button for mobile */}
      <button 
        onClick={toggle}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-slate-900 glass-card p-2 rounded-md"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-border z-40",
          "transition-all duration-300 ease-in-out",
          "glass-card backdrop-blur-xl",
          isOpen ? "w-64" : "w-0 lg:w-20",
          isMobile && !isOpen && "w-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <h1 className={cn(
              "font-semibold text-xl whitespace-nowrap transition-all duration-300",
              !isOpen && "lg:opacity-0"
            )}>
              DARIAPP
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {routes.map((route) => (
                <li key={route.path}>
                  <SidebarLink 
                    to={route.path} 
                    icon={route.icon} 
                    label={route.label}
                    isActive={location.pathname === route.path}
                  />
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className={cn(
              "flex items-center space-x-3", 
              !isOpen && "lg:justify-center lg:space-x-0"
            )}>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {/* Add null check and fallback for user name */}
                {user && user.name ? user.name.charAt(0) : user && user.prenom ? user.prenom.charAt(0) : 'U'}
              </div>
              <div className={cn(
                "transition-all duration-300 flex-1",
                !isOpen && "lg:w-0 lg:opacity-0 lg:hidden"
              )}>
                {/* Add null check and fallback for user display name */}
                <div className="text-sm font-medium">
                  {user ? (user.name || `${user.prenom || ''} ${user.nom || ''}`.trim()) : 'User'}
                </div>
                <div className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</div>
              </div>
              <button 
                onClick={handleLogout}
                className={cn(
                  "p-2 rounded-md text-red-500 hover:bg-red-50",
                  !isOpen && "lg:hidden"
                )}
                aria-label="Déconnexion"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
