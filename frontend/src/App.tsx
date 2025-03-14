import React from "react";
import "./styles/index.css";
import LoginPage from "./pages/LoginManagement/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Unauthorized from "./pages/LoginManagement/Unauthorized";
import { AuthProvider } from "./hooks/useAuth";
import UserDashboardPage from "./pages/UserManagement/UserDashboardPage";
import OrderDashboardPage from "./pages/OrderManagement/OrderDashboardPage";
import CustomerDashboardPage from "./pages/CustomerManagement/CustomerDashboardPage";
import CustomerProfile from "./pages/CustomerManagement/CustomerProfile";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/LoginManagement/ForgotPasswordPage";
import VerificationCodePage from "./pages/LoginManagement/VerificationCodePage";
import ResetPasswordPage from "./pages/LoginManagement/ResetPasswordPage";

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
