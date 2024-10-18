'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React, { createContext, useState, useEffect, useContext } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import { LogIn, Register, User } from '../types';

export interface AuthContextType {
  user?: User;
  login: (userData: LogIn) => Promise<void>;
  createAccount: (userData: Register) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setError: (value: boolean) => void;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const login = async (data: LogIn) => {
    setLoading(true);
    setError(false);
    GlobalApi.signIn({ ...data }).then(
      (resp) => {
        sessionStorage.setItem('jwt', JSON.stringify(resp.jwt));
        sessionStorage.setItem('user', JSON.stringify(resp.user));
        const user = {
          email: resp.user.email,
          username: resp.user.username,
          id: resp.user.documentId,
        };
        setUser(user);
        toast('Votre connexion a réussi.');
        router.push('/');
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError(true);
        setErrorMessage('Vos identifiants sont incorrectes.');
      }
    );
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(undefined);
    sessionStorage.clear();
    router.push('/auth/sign-in');
  };

  const createAccount = async (data: Register) => {
    setLoading(true);
    setError(false);
    GlobalApi.registerUser({ ...data }).then(
      (resp) => {
        sessionStorage.setItem('user', JSON.stringify(resp.user));
        sessionStorage.setItem('jwt', JSON.stringify(resp.jwt));
        toast('Votre compte a bien été créer.');
        router.push('/');
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError(true);
        setErrorMessage(
          'Une erreur est survenue lors de la creation de votre compte.'
        );
      }
    );
  };

  const checkUserLoggedIn = async () => {
    const jwt = sessionStorage.getItem('jwt');
    const user = sessionStorage.getItem('user');

    if (jwt && user) {
      const data = JSON.parse(user);
      const userData = {
        email: data.email,
        username: data.username,
        id: data.documentId,
      };
      setUser(userData);
    }
    setLoading(false);
  };
  // Vérifier s'il y a un utilisateur connecté au chargement de la page
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        createAccount,
        logout,
        setError,
        loading,
        error,
        setUser,
        errorMessage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
