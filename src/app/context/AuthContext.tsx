// src\app\context\AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedUser {
     appUserId: string;
     name: string;
     email: string;
     provider: string;
     photo?: string | null;
     isOnboarded?: boolean;
}

// 1️⃣ Define the context type
type AuthContextType = {
  userToken: string | null;
  userInfo: DecodedUser | null;
  saveUserToken: (token: string) => void;
  clearUserSession: () => void;
};

// 2️⃣ Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3️⃣ Provider component
export function AuthProvider({ children }: { children: ReactNode }) {

  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo,setUserInfo] = useState<DecodedUser |null>(null);

      // ✅ Load token + decode AFTER component mounts (client only)
  useEffect(() => {
     const token = localStorage.getItem('my_jwt');
     if (token) {
       setUserToken(token);
       const decoded = jwtDecode<DecodedUser>(token);
       setUserInfo(decoded);
     }
   }, []);
 

  const saveUserToken = (newToken: string) => {
    setUserToken(newToken);
    localStorage.setItem('my_jwt', newToken);

    const decoded = jwtDecode<DecodedUser>(newToken);
    setUserInfo(decoded);
  };

  const clearUserSession = () => {
    setUserToken(null);
    setUserInfo(null);
    localStorage.removeItem('my_jwt');
  };

  return (
    <AuthContext.Provider value={{ userToken, userInfo, saveUserToken, clearUserSession }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4️⃣ Custom hook to use auth
export function useUserAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUserAuth must be used within an AuthProvider');
  }
  return context;
}
