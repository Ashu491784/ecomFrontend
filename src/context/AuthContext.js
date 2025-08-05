import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/auth"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = await authService.getProfile();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (credentials) => {
    try {
      const { token, user } = await authService.login(credentials);
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (userData) => {
    try {
      const { token, user } = await authService.register(userData);
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);