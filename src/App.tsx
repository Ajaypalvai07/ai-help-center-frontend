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
  const { isAuthenticated } = useAppStore();

  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <SessionCheck>
            <Routes>
              {/* Public Routes */}
              <Route path="/auth/login" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />
              } />
              <Route path="/auth/signup" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <SignupForm />
              } />
              <Route path="/admin/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin />
              } />
              
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
              
              {/* Root Route */}
              <Route path="/" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth/login" />
              } />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </SessionCheck>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}