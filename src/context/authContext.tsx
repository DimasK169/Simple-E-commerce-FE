import { createContext, useState, ReactNode, useContext } from "react";

type User = {
  User_Email: string;
  User_Password: null;
  User_Name: string;
  User_Role: "Customer" | "Admin";
  User_Token: string;
};

type AuthState = {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthState>({
  auth: null,
  setAuth: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy context access
export function useAuth() {
  return useContext(AuthContext);
}
