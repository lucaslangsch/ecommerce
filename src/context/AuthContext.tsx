import { createContext } from 'react';

type UserContextType = {
  name: string;
  email: string;
  authenticated: boolean;
  loading: boolean;
  login: (userData: { email: string; password: string }) => Promise<void>;
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
