import React, { createContext, useState, useContext, useEffect } from "react";
import { Auth } from "aws-amplify";

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface UserInfo {
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Load Cognito session on app start
  useEffect(() => {
    const checkUser = async () => {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const email = cognitoUser.attributes.email;

        setUserInfo({
          email,
          name: email.split("@")[0],
        });
        setIsLoggedIn(true);
      } catch (err) {
        // No valid session
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    checkUser();
  }, []);

  // REAL LOGIN with Cognito
  const login = async (email: string, password: string) => {
    const user = await Auth.signIn(email, password);

    setIsLoggedIn(true);
    setUserInfo({
      email: user.attributes.email,
      name: user.attributes.email.split("@")[0],
    });
  };

  // REAL LOGOUT
  const logout = async () => {
    await Auth.signOut();
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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
