import React, { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import Layout from "./Layout";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-50 w-full">
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-gray-600">Total Users</h3>
              <p className="text-2xl font-bold">1234</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-gray-600">Orders</h3>
              <p className="text-2xl font-bold">567</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-gray-600">Revenue</h3>
              <p className="text-2xl font-bold">12345₸</p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
