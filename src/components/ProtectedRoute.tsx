import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import Loading from './Loading';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Support both nested routes (Outlet) and direct children usage,
  // but always show the navbar on protected content.
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children ? <>{children}</> : <Outlet />}
      </main>
    </div>
  );
}

