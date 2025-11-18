import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, signIn, signOut } from "@aws-amplify/auth";

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

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getCurrentUser();

        setIsLoggedIn(true);
        setUserInfo({
          email: user?.signInDetails?.loginId || "",
          name: user?.username || "",
        });
      } catch {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    load();
  }, []);

  const login = async (email: string, password: string) => {
    const signedIn = await signIn({ username: email, password });

    setIsLoggedIn(true);
    setUserInfo({
      email,
      name: signedIn?.username || email,
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
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
