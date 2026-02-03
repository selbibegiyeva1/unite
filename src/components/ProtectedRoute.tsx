import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserInfo } from '../hooks/auth/useUserInfo';
import Navbar from './navbar/Navbar';
import Menu from './navbar/Menu';
import Loading from './Loading';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { data: userData, isLoading: isLoadingUser } = useUserInfo();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  if (isLoading || isLoadingUser) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const userRole = userData?.user.role;
  if (!userRole) {
    return <Loading />;
  }

  const isDirectorRoute = location.pathname.startsWith('/director');
  const isOperatorRoute = location.pathname.startsWith('/operator');
  if (location.pathname !== '/help') {
    if (userRole === 'DIRECTOR' && isOperatorRoute) {
      return <Navigate to="/director/home" replace />;
    }
    if (userRole === 'OPERATOR' && isDirectorRoute) {
      return <Navigate to="/operator/home" replace />;
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onMenuOpen={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className="flex-1">
        {children ? <>{children}</> : <Outlet />}
      </main>
    </div>
  );
}

