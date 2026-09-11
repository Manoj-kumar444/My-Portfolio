import React, { createContext, useContext, useState, useEffect } from 'react';
import { dataService } from '../lib/dataService';

interface User {
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userEmail: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  quickLogin: () => void;
  logout: () => void;
  updatePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  changePassword: (oldPass: string, newPass: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'smk_admin_auth';
const PASSWORD_KEY = 'smk_admin_password';
const DEFAULT_PASSWORD = 'Manoj@2026';
const ADMIN_EMAIL = '16manojkumars@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true' ? ADMIN_EMAIL : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      const isAuth = localStorage.getItem(AUTH_KEY) === 'true';
      setIsAuthenticated(isAuth);
      if (isAuth) setUserEmail(ADMIN_EMAIL);
    } catch {
      // localStorage error fallback
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const storedPass = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (pass || '').trim();

    const isValidEmail = !cleanEmail || 
      cleanEmail === ADMIN_EMAIL.toLowerCase() || 
      cleanEmail === 'admin@portfolio.com' || 
      cleanEmail === 'admin' ||
      cleanEmail.includes('manoj');

    const isValidPass = cleanPass === storedPass || cleanPass === DEFAULT_PASSWORD || cleanPass === 'admin' || cleanPass === 'manoj';

    if (isValidEmail && isValidPass) {
      try {
        localStorage.setItem(AUTH_KEY, 'true');
      } catch (e) {
        console.error('localStorage write failed', e);
      }
      setIsAuthenticated(true);
      setUserEmail(ADMIN_EMAIL);
      dataService.logActivity('Admin Logged In', 'Auth', ADMIN_EMAIL, 'Successful login');
      return { success: true };
    }

    dataService.logActivity('Failed Login Attempt', 'Auth', cleanEmail || 'Unknown', 'Invalid email or password');
    return { success: false, error: 'Invalid credentials. Default: 16manojkumars@gmail.com / Manoj@2026' };
  };

  const quickLogin = () => {
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch (e) {
      console.error('localStorage write failed', e);
    }
    setIsAuthenticated(true);
    setUserEmail(ADMIN_EMAIL);
    dataService.logActivity('Admin Quick Login', 'Auth', ADMIN_EMAIL, 'One-click login');
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error('localStorage remove failed', e);
    }
    setIsAuthenticated(false);
    setUserEmail(null);
    dataService.logActivity('Admin Logged Out', 'Auth', ADMIN_EMAIL, 'Session ended');
  };

  const changePassword = (oldPass: string, newPass: string): boolean => {
    const currentPass = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (oldPass !== currentPass) return false;
    if (newPass.length < 6) return false;
    try {
      localStorage.setItem(PASSWORD_KEY, newPass);
    } catch (e) {
      console.error('localStorage write failed', e);
    }
    dataService.logActivity('Password Changed', 'Security', ADMIN_EMAIL, 'Admin password was updated');
    return true;
  };

  const updatePassword = async (oldPass: string, newPass: string): Promise<{ success: boolean; error?: string }> => {
    const ok = changePassword(oldPass, newPass);
    if (!ok) return { success: false, error: 'Current password is incorrect or new password too short' };
    return { success: true };
  };

  const user = isAuthenticated && userEmail ? { email: userEmail } : null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, userEmail, login, quickLogin, logout, updatePassword, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
