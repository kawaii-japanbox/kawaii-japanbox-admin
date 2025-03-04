import React from "react";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";

const Home: React.FC = () => {
  const { user } = useAuth();
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6 bg-gray-50 w-full min-h-screen">
        <main className="flex-1 p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Dashboard Overview
          </h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
            <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h3 className="text-gray-600 text-sm sm:text-base">
                Total Users
              </h3>
              <p className="text-xl sm:text-2xl font-bold">1234</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h3 className="text-gray-600 text-sm sm:text-base">Orders</h3>
              <p className="text-xl sm:text-2xl font-bold">567</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center ">
              <h3 className="text-gray-600 text-sm sm:text-base">Revenue</h3>
              <p className="text-xl sm:text-2xl font-bold">12345₸</p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
