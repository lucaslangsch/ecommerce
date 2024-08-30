import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import UserContext from './AuthContext.tsx';
import { loginUser, registerUser } from '../api/UserApi.ts';
import getCookie from '../hooks/useCookie';
import { UserLoginType, UserRegisterType } from '../types/types.ts';

type UserProviderType = {
  children: React.ReactNode;
};

type jwtDecoded = {
  id: number;
  email: string;
  iat: number;
  exp: number;
  name: string;
};

function UserProvider({ children }: UserProviderType) {
  const [auth, setAuth] = useState({ name: '', email: '', authenticated: false });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      try {
        const decoded: jwtDecoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setAuth({
            name: decoded.name,
            email: decoded.email,
            authenticated: true,
          });
        } else {
          setAuth({
            name: '',
            email: '',
            authenticated: false,
          });
        }
      } catch (e) {
        console.error('Invalid token');
      }
    }
    setLoading(false);
  }, []);
  
  const register = async (userData: UserRegisterType) => {
    const data = await registerUser(userData);
    document.cookie = `token=${data.token};path=/;`;
    const decoded: jwtDecoded = jwtDecode(data.token);
    setAuth({
      name: decoded.name,
      email: decoded.email,
      authenticated: true,
    });
  };
  
  const login = async (userData: UserLoginType) => {
    const data = await loginUser(userData);
    document.cookie = `token=${data.token};path=/;`;
    const decoded: jwtDecoded = jwtDecode(data.token);
    setAuth({
      name: decoded.name,
      email: decoded.email,
      authenticated: true,
    });
  };

  return (
    <UserContext.Provider value={{ ...auth, loading, register, login }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
