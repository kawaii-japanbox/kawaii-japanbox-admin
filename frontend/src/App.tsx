import React, { useEffect, useState } from "react";
import "./index.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Unauthorized";
import { AuthProvider } from "./hooks/useAuth";
import UserDashboard from "./components/UserManagement/UserDashboard";
import OrderDashboard from "./components/OrderManagement/OrderDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserDashboard />} />
          <Route path="/orders" element={<OrderDashboard />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute page="home">
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
