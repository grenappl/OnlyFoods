import { createContext, useState, useEffect, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

export interface AuthState {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  accessToken?: string;
}

export interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
  isLoading: true,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({});
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate auth from secure storage on app start
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken');
        const userRaw = await SecureStore.getItemAsync('user');
        if (token && userRaw) {
          setAuth({ accessToken: token, user: JSON.parse(userRaw) });
        }
      } catch (e) {
        console.error('Failed to load auth:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuth();
  }, []);

  // Persist auth whenever it changes
  useEffect(() => {
    const saveAuth = async () => {
      try {
        if (auth.accessToken && auth.user) {
          await SecureStore.setItemAsync('accessToken', auth.accessToken);
          await SecureStore.setItemAsync('user', JSON.stringify(auth.user));
        } else {
          await SecureStore.deleteItemAsync('accessToken');
          await SecureStore.deleteItemAsync('user');
        }
      } catch (e) {
        console.error('Failed to save auth:', e);
      }
    };
    saveAuth();
  }, [auth]);

  const logout = async () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;