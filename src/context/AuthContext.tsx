import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isSeller: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserStatus: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // This would normally call an API endpoint
    // For demo purposes, we'll simulate a successful login
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: '1',
          name: 'John Doe',
          email,
          isSeller: false,
        });
        resolve();
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // This would normally call an API endpoint
    // For demo purposes, we'll simulate a successful signup
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: '1',
          name,
          email,
          isSeller: false,
        });
        resolve();
      }, 1000);
    });
  };

  const updateUserStatus = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};