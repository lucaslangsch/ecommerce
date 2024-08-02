import { createContext } from 'react';

type UserContextType = {
  name: string;
  email: string;
  setAuth: (auth: { name: string, email: string }) => void;
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
