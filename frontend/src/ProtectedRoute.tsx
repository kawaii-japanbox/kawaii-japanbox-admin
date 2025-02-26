import { Navigate } from "react-router-dom";
import { Page, useAuth } from "./hooks/useAuth";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  page: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, page }) => {
  const { user, hasPermission } = useAuth();
  const token = localStorage.getItem("token");

  if (token && !user) {
    console.log("Token exists, waiting for user state to update...");
    return null;
  }

  if (user === null && !token) {
    return <Navigate to="/login" />;
  }

  if (!hasPermission(page as Page)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
