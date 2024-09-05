import { createContext } from 'react';
import { UserLoginType, UserRegisterType } from '../types/types';

type UserContextType = {
  name: string;
  email: string;
  authenticated: boolean;
  loading: boolean;
  login: (userData: UserLoginType) => Promise<void>;
  register: (userData: UserRegisterType) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext({} as UserContextType);

export default UserContext;
