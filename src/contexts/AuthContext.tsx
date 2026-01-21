import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { type UserInfo } from '../services/authService';

interface AuthContextType {
  user: UserInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!user && !!localStorage.getItem('accessToken');

  const refreshUserInfo = useCallback(async () => {
    try {
      const data = await authService.getUserInfo();
      setUser(data.user);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      localStorage.removeItem('accessToken');
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      refreshUserInfo();
    } else {
      setIsLoading(false);
    }
  }, [refreshUserInfo]);

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login({ username, password });
      localStorage.setItem('accessToken', response.accessToken);
      await refreshUserInfo();
      // Navigation after successful login is handled by the auth hook (useSignIn)
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        refreshUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
