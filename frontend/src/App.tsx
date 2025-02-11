import React, { useEffect, useState } from "react";
import "./index.css";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Unauthorized";
import { AuthProvider } from "./hooks/useAuth";
import UserDashboardPage from "./components/UserManagement/UserDashboardPage";
import OrderDashboardPage from "./components/OrderManagement/OrderDashboardPage";
import HomePage from "./HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          ></Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* <Route
            path="/"
            element={
              <ProtectedRoute page="/">
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
