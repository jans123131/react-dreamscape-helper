
/**
 * PrivateRoute.tsx
 * 
 * Description (FR):
 * Ce composant protège les routes qui nécessitent une authentification.
 * Fonctionnalités:
 * - Vérifie si l'utilisateur est authentifié
 * - Redirige vers la page de connexion si non authentifié
 * - Vérifie les permissions d'accès basées sur le rôle
 * - Affiche un indicateur de chargement pendant la vérification
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

type PrivateRouteProps = {
  element: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  const { isAuthenticated, hasAccess } = useAuth();
  
  // Show loading indicator while checking authentication status
  if (localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('userData') && !isAuthenticated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Chargement...</span>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has access to this route
  if (!hasAccess(location.pathname)) {
    // Redirect to dashboard if they don't have access
    return <Navigate to="/dashboard" replace />;
  }
  
  // If authenticated and has access, render the protected component
  return <>{element}</>;
};
