import React from "react";
import "./index.css";
import LoginPage from "./components/LoginManagement/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Unauthorized from "./components/LoginManagement/Unauthorized";
import { AuthProvider } from "./hooks/useAuth";
import UserDashboardPage from "./components/UserManagement/UserDashboardPage";
import OrderDashboardPage from "./components/OrderManagement/OrderDashboardPage";
import CustomerDashboardPage from "./components/CustomerManagement/CustomerDashboardPage";
import CustomerProfile from "./components/CustomerManagement/CustomerProfile";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./components/LoginManagement/ForgotPasswordPage";
import VerificationCodePage from "./components/LoginManagement/VerificationCodePage";
import ResetPasswordPage from "./components/LoginManagement/ResetPasswordPage";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute page="dashboard">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification" element={<VerificationCodePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute page="users">
                <UserDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute page="orders">
                <OrderDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute page="customers">
                <CustomerDashboardPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/customers/:id" element={<CustomerProfile />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
