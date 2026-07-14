import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return null;
    }

    try {
      const response = await getCurrentUser();
      const currentUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(currentUser));
      setUser(currentUser);
      return currentUser;
    } catch {
      clearSession();
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const setAuthenticatedUser = (currentUser) => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    setUser(currentUser);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, setAuthenticatedUser, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
