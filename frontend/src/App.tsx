import React, { useEffect, useState } from "react";
import "./index.css";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Unauthorized";
import { AuthProvider } from "./hooks/useAuth";
import UserDashboardPage from "./components/UserManagement/UserDashboardPage";
import OrderDashboardPage from "./components/OrderManagement/OrderDashboardPage";
import RoleProtectedRoute from "./RoleProtectedRoute";
import CustomerDashboardPage from "./components/CustomerManagement/CustomerDashboardPage";
import CustomerProfile from "./components/CustomerManagement/CustomerProfile";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/users"
            element={
              <RoleProtectedRoute page="users">
                <UserDashboardPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <RoleProtectedRoute page="orders">
                <OrderDashboardPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <RoleProtectedRoute page="customers">
                <CustomerDashboardPage />
              </RoleProtectedRoute>
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
