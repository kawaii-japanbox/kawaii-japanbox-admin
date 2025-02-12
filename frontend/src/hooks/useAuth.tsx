import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../api/api";
import { rolePermissions, Role } from "../Sidebar";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.accessToken);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
