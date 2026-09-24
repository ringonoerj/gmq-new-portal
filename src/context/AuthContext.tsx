import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '../types';
import { mockUsers } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getDataSourceMode } from '../lib/adapter';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  dataSourceMode: 'supabase' | 'mock';
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role: 'superadmin' | 'editor') => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'gmq_portal_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dataSourceMode = getDataSourceMode();

  useEffect(() => {
    async function initAuth() {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Ambil profile role dari tabel profiles
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            setUser({
              id: session.user.id,
              email: session.user.email || '',
              full_name: profile?.full_name || session.user.email?.split('@')[0] || 'User GMQ',
              role: (profile?.role as UserRole) || 'editor',
              avatar_url: profile?.avatar_url,
              created_at: session.user.created_at
            });
          }
        } else {
          // Mock mode: Ambil dari localStorage jika ada sesi sebelumnya
          const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
          if (savedUser) {
            setUser(JSON.parse(savedUser) as UserProfile);
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, [dataSourceMode]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          const userObj: UserProfile = {
            id: data.user.id,
            email: data.user.email || '',
            full_name: profile?.full_name || 'Admin GMQ',
            role: (profile?.role as UserRole) || 'superadmin',
            avatar_url: profile?.avatar_url,
            created_at: data.user.created_at
          };
          setUser(userObj);
          return { success: true };
        }
      }

      // Mock Login Fallback
      const matched = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (matched || email.includes('admin') || email.includes('gmq')) {
        const loggedUser: UserProfile = matched || {
          id: `usr-${Date.now()}`,
          email,
          full_name: 'Administrator GMQ',
          role: 'superadmin',
          created_at: new Date().toISOString()
        };
        setUser(loggedUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedUser));
        return { success: true };
      }

      return { success: false, error: 'Email atau kata sandi tidak cocok untuk akun demo.' };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = (targetRole: 'superadmin' | 'editor') => {
    const demoUser = mockUsers.find((u) => u.role === targetRole) || mockUsers[0];
    setUser(demoUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: Boolean(user),
        isLoading,
        dataSourceMode,
        login,
        loginAsDemo,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
