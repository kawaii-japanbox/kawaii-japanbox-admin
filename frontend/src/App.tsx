import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useUser } from "./UserContext";

interface User {
  userId: string;
  role: string;
}

const App: React.FC = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const { user } = useUser();

  useEffect(() => {
    console.log("Context user updated:", user); // Debugging
    if (user) {
      setAuthUser({ userId: user.userId, role: user.role });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute authUser={authUser}>
              <Dashboard user={authUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={authUser ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
