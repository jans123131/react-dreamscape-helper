
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { userApi, User, ApiError } from '@/services/api';

interface AuthUser {
  user_id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'admin' | 'user';
  // Add a virtual property for convenience
  name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasAccess: (route: string) => boolean;
  canEdit: (resource: string) => boolean;
  canDelete: (resource: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Define route access by role
const roleAccess = {
  user: ['/dashboard'],
  admin: ['/dashboard', '/properties', '/users', '/messages', '/bookings', '/reviews', '/settings']
};

// Define action permissions by role and resource
const rolePermissions = {
  user: {
    edit: [],
    delete: []
  },
  admin: {
    edit: ['users', 'settings', 'properties', 'bookings'],
    delete: ['properties', 'users', 'messages', 'bookings']
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load user data from localStorage on initial load
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Try to load user from localStorage first
        const savedUser = localStorage.getItem('userData');
        
        if (savedUser) {
          // Parse and set the user from localStorage
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          // Silently validate with the server in background
          try {
            const userData = await userApi.getCurrentUser();
            if (userData) {
              // Update with fresh data from server
              const userWithName = {
                ...userData,
                name: `${userData.prenom} ${userData.nom}`.trim()
              };
              setUser(userWithName);
              localStorage.setItem('userData', JSON.stringify(userWithName));
            }
          } catch (serverError) {
            console.log('Session expired or invalid, will need to login again');
            // Don't logout here, let the API interceptor handle 401 errors
          }
        } else {
          // No saved user, check with the server
          try {
            const userData = await userApi.getCurrentUser();
            if (userData) {
              const userWithName = {
                ...userData,
                name: `${userData.prenom} ${userData.nom}`.trim()
              };
              setUser(userWithName);
              setIsAuthenticated(true);
              localStorage.setItem('userData', JSON.stringify(userWithName));
              localStorage.setItem('isAuthenticated', 'true');
            }
          } catch (error) {
            // Not authenticated, clear storage
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userData');
            console.log('Not authenticated', error);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Function to check if user has access to a specific route
  const hasAccess = (route: string): boolean => {
    if (!user) return false;
    return roleAccess[user.role]?.includes(route) || false;
  };

  // Function to check if user can edit a specific resource
  const canEdit = (resource: string): boolean => {
    if (!user) return false;
    return rolePermissions[user.role]?.edit.includes(resource) || false;
  };

  // Function to check if user can delete a specific resource
  const canDelete = (resource: string): boolean => {
    if (!user) return false;
    return rolePermissions[user.role]?.delete.includes(resource) || false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await userApi.login({ email, password });
      
      if (response && response.user) {
        const loggedInUser = {
          ...response.user,
          name: `${response.user.prenom} ${response.user.nom}`.trim() 
        };
        
        // Store both the authentication flag and the user data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(loggedInUser));
        
        setUser(loggedInUser);
        setIsAuthenticated(true);
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${loggedInUser.prenom} ${loggedInUser.nom}`,
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await userApi.logout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      // Clear all authentication data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userData');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      hasAccess,
      canEdit,
      canDelete
    }}>
      {children}
    </AuthContext.Provider>
  );
};
