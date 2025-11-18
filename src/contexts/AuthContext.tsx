import { createContext, useContext, useState, useEffect } from "react";
import { 
  getCurrentUser, 
  signIn, 
  signOut, 
  fetchUserAttributes 
} from "@aws-amplify/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: { email: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ email: string; name: string } | null>(null);

  // Load session on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        const attrs = await fetchUserAttributes();

        setIsLoggedIn(true);
        setUserInfo({
          email: attrs.email || "",
          name: attrs.name || attrs.email || "",
        });
      } catch {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    const signedInUser = await signIn({ username: email, password });
    const attrs = await fetchUserAttributes();

    setIsLoggedIn(true);
    setUserInfo({
      email: attrs.email || email,
      name: attrs.name || email,
    });
  };

  // Logout
  const logout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
