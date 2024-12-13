// Install Tailwind CSS before starting
import React from "react";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-100">
        <div className="p-4 text-lg font-semibold text-center border-b border-gray-700">
          Dashboard
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <a
                href="#"
                className="block py-2.5 px-4 rounded hover:bg-gray-700"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2.5 px-4 rounded hover:bg-gray-700"
              >
                Users
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2.5 px-4 rounded hover:bg-gray-700"
              >
                Customers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2.5 px-4 rounded hover:bg-gray-700"
              >
                Orders
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2.5 px-4 rounded hover:bg-gray-700"
              >
                Notifications
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2.5 px-4 rounded hover:bg-gray-700"
              >
                Analytics
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2.5 px-4 rounded hover:bg-gray-700"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2.5 px-4 rounded hover:bg-gray-700"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold text-lg">Card 1</h2>
            <p className="text-gray-600">This is a sample dashboard card.</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold text-lg">Card 2</h2>
            <p className="text-gray-600">This is another dashboard card.</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold text-lg">Card 3</h2>
            <p className="text-gray-600">More content goes here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
