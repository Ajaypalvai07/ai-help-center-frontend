import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/Auth/LoginForm';
import { AdminLogin } from './components/Admin/AdminLogin';
import { SignupForm } from './components/Auth/SignupForm';
import { AuthProvider } from './hooks/useAuth';
import { useAppStore } from './store/useStore';
import Layout from './components/Layout';
import SessionCheck from './components/SessionCheck';
import { ErrorBoundary } from './components/ErrorBoundary';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAppStore();
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <SessionCheck>
            <Routes>
              {/* Auth Routes */}
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/auth/signup" element={<SignupForm />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Protected Routes */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard/*"
                element={
                  <ProtectedRoute adminOnly>
                    <Layout />
                  </ProtectedRoute>
                }
              />
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </SessionCheck>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}