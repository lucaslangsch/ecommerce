import { createContext } from "react";

type AuthContextType = {
  theme: string;
};

const AuthContext = createContext({} as AuthContextType);

export default AuthContext;