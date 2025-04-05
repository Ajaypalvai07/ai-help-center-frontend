import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

interface SessionCheckProps {
  children: React.ReactNode;
}

export default function SessionCheck({ children }: SessionCheckProps) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
} 