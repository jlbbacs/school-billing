import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { mockUsers } from '../data/mockData';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    // Check for existing session on app load
    const checkExistingSession = () => {
      const savedUser = localStorage.getItem('edupay_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false
          });
        } catch (error) {
          localStorage.removeItem('edupay_user');
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false
        });
      }
    };

    checkExistingSession();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      const authenticatedUser: User = userWithoutPassword;
      
      localStorage.setItem('edupay_user', JSON.stringify(authenticatedUser));
      setAuthState({
        isAuthenticated: true,
        user: authenticatedUser,
        loading: false
      });
      return true;
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('edupay_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};