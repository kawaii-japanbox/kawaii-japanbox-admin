import { login } from "../api/api";
import { rolePermissions, Role } from "../components/Sidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type Page =
  | "dashboard"
  | "settings"
  | "users"
  | "orders"
  | "tracking"
  | "reports";

interface DecodedToken {
  userId: string;
  role: string;
  exp?: number;
}

interface User {
  userId: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loginUser: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  logout: () => void;
  hasPermission: (page: Page) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const expirationTime = decoded.exp;
        if (expirationTime && expirationTime * 1000 < Date.now()) {
          console.log("Token expired, logging out...");
          logout();
        } else {
          setUser({ userId: decoded.userId, role: decoded.role as Role });
        }
      } catch (error) {
        console.error("Invalid token, logging out...");
        logout();
      }
    }
    setLoading(false);
  }, []);

  const loginUser = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      const response = await login(email, password, rememberMe);
      const decoded = jwtDecode<DecodedToken>(response.accessToken);
      setUser({ userId: decoded.userId, role: decoded.role as Role });
      // localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.accessToken);
      navigate("/");
    } catch (error: unknown) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Login failed");
      }
      throw new Error("Something went wrong");
    }
  };

  const logout = () => {
    console.log("Logging out, clearing localStorage.");
    setUser(null);
    localStorage.removeItem("token"); // Check if this is running unexpectedly
    navigate("/login");
  };

  const hasPermission = (page: Page) => {
    if (!user) return false;
    return rolePermissions[user.role]?.includes(page) ?? false;
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
