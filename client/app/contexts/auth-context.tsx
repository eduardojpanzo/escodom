import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getAuthToken } from "~/lib/session";
import type { Profile } from "~/models/users.model";
import { apiClient } from "~/service/axios";
import type { HttpGetResponseModel } from "~/types/query";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole?: "teacher" | "student";
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<"teacher" | "student">();
  const location = useLocation();
  const token = getAuthToken();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res =
          await apiClient.get<HttpGetResponseModel<Profile>>("/users/profile");
        const data = res.data;
        setIsAuthenticated(data.success);
        setUserRole(data.data.users?.role);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    if (!!token) {
      checkAuth();
    }
    setIsLoading(false);
  }, [location.pathname]);

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, userRole, logout }}
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
