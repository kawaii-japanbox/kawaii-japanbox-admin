import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import UserDashboard from "./components/UserManagement/UserDashboardPage";
import Layout from "./Layout";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  console.log("user received in dashboard:", user);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
              }
            />
            <Route path="/users" element={<UserDashboard />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
};

export default Dashboard;
