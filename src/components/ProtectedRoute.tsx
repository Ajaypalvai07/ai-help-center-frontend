import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { auth: { user } } = useStore();
  
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/aihelpcentre" />;
  }
  
  return <>{children}</>;
}