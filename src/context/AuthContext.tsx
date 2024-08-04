import { createContext } from 'react';

type UserContextType = {
  name: string;
  email: string;
  authenticated: boolean;
  loading: boolean;
  setAuth: (auth: { name: string, email: string, authenticated: boolean; }) => void;
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
