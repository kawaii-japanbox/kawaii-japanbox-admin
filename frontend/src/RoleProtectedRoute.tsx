import { Navigate } from "react-router-dom";
import { Page, useAuth } from "./hooks/useAuth";
import { JSX } from "react";

interface RoleProtectedRouteProps {
  children: JSX.Element;
  page: string;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  page,
}) => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!hasPermission(page as Page)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleProtectedRoute;
