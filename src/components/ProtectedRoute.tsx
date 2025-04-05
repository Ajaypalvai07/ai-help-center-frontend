import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../store/useStore';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAppStore();
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
}