import React, { useState } from 'react';
import UserContext from './AuthContext.tsx';

type UserProviderType = {
  children: React.ReactNode;
};

function UserProvider({children}: UserProviderType){
  const [auth, setAuth] = useState({ name: '', email: '' });

  return (
    <UserContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
