import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('forgex_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const register = (userData) => {
    // Mock registration: save to localStorage and set as current user
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString(),
      stats: {
        workoutsCompleted: 0,
        streak: 0,
        totalHours: 0
      }
    };
    localStorage.setItem('forgex_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = (email, password) => {
    // Mock login: check localStorage
    const savedUser = localStorage.getItem('forgex_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.email === email && parsed.password === password) {
        setUser(parsed);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('forgex_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
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
