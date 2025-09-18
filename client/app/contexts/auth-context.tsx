import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuthToken, removeAuthToken } from "~/lib/session";
import type { Profile } from "~/models/users.model";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile?: Profile;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const token = getAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res =
          await apiClient.get<HttpGetResponseModel<Profile>>("/users/profile");
        const data = res.data;
        setIsAuthenticated(data.success);
        setProfile(data.data);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    if (!token) {
      setIsLoading(false);
      return;
    }
    checkAuth();
  }, [location.pathname]);

  const logout = () => {
    setIsAuthenticated(false);
    setProfile(undefined);
    removeAuthToken();
    navigate(`/`);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, profile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth tem que estar dentro do contexto");
  return ctx;
};
