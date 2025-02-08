// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../api/api";
import { rolePermissions, Role } from "../Sidebar";
// // Define the user type
// interface User {
//   userId: string;
//   role: string;
// }

// enum AuthRole {
//   Admin = "admin",
//   Sales = "sales",
//   Packaging = "packaging",
//   Delivery = "delivery",
// }

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

// const roles: Record<AuthRole, Page[]> = {
//   [AuthRole.Admin]: ["dashboard", "settings", "users"],
//   [AuthRole.Sales]: ["dashboard", "reports"],
//   [AuthRole.Packaging]: ["orders"],
//   [AuthRole.Delivery]: ["orders", "tracking"],
// };

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
// interface UserContextType {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

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
      console.log("Decoded Token:", decoded);
      setUser({ userId: decoded.userId, role: decoded.role as Role });
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.accessToken);
      navigate("/home");
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
    console.log("user role:", user?.role);
    console.log("page:", page);
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

// Custom hook to use the UserContext
// export const useUser = (): UserContextType => {
//   const context = useContext(userContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };

// function useProvideAuth() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

// const handleUser = (rawUser) => {
//   if (rawUser) {
//     const user = formatUser(rawUser);
//     setUser(user);
//     setLoading(false);
//     return user;
//   } else {
//     setUser(null);
//     setLoading(false);
//     return null;
//   }
// };

// const login = async (
//   email: string,
//   password: string,
//   rememberMe: boolean
// ) => {
//   try {
//     const response = await login(email, password, rememberMe);
//     localStorage.setItem("user", JSON.stringify(response));
//     navigate("/dashboard");
//   } catch (error) {

//   }

// };

// const signout = async () => {
//   // await firebase.auth().signOut();
//   handleUser(null);
// };

//   return { user, loading, signout };
// }

// const formatUser = (user) => ({
//   uid: user.uid,
//   email: user.email,
//   name: user.displayName,
//   provider: user.providerData[0].providerId,
//   photoUrl: user.photoURL,
// });
