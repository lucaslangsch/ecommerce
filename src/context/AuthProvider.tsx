import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import UserContext from './AuthContext.tsx';

type UserProviderType = {
  children: React.ReactNode;
};

type jwtDecoded = {
  id: number;
  email: string;
  iat: number;
  exp: number;
  name: string;
}

function getCookie(name: string): string | null {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}


function UserProvider({ children }: UserProviderType) {
  const [auth, setAuth] = useState({ name: '', email: '', authenticated: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie('token');
    console.log(token)
    if (token) {
      try {
        const decoded: jwtDecoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setAuth({
            name: decoded.name,
            email: decoded.email,
            authenticated: true,
          });

        }
      } catch (e) {
        console.error('Invalid token');
      }
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ ...auth, setAuth, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
