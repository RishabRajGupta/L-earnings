import { createContext, useContext, useState, useEffect } from "react";
import { 
  getCurrentUser, 
  fetchUserAttributes,
  signOut
} from "@aws-amplify/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: { email: string; name: string } | null;
  login: (email: string) => void;   // ⬅️ no password, no Cognito sign-in here
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ email: string; name: string } | null>(null);

  // Load authenticated user on app start
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

  // login only updates UI state, NOT Cognito sign-in
  const login = (email: string) => {
    setIsLoggedIn(true);
    setUserInfo({
      email,
      name: email,
    });
  };

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
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
