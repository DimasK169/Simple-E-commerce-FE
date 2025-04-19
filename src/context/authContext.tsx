import { getMe } from "@/services/users/api";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type User = {
  User_Email: string;
  User_Name: string;
  User_Role: string;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await getMe();
        setAuth(me.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

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
