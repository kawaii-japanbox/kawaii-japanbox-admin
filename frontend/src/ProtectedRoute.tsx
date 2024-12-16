import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  authUser: { userId: string; role: string } | null; // Adjust the type to match your `authUser` structure
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  authUser,
  children,
}) => {
  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
