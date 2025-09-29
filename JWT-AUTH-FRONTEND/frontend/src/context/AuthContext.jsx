import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );
  const [isLoading, setIsLoading] = useState(true);

  // Refresh access token using backend refresh endpoint
  const refreshToken = async () => {
    try {
      const res = await api.post("/refresh");
      const token = res.data.accessToken;
      setAccessToken(token);
      localStorage.setItem("accessToken", token);
      return true;
    } catch (err) {
      console.error("Refresh failed ❌", err);
      // Don't clear the token immediately, let the app handle it
      return false;
    }
  };

  // Sync localStorage when accessToken changes
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  // Initialize auth state on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    
    if (storedToken) {
      // Set the token immediately to prevent redirect
      setAccessToken(storedToken);
    }
    
    // Always set loading to false after a short delay
    // This prevents the redirect issue
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, refreshToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
