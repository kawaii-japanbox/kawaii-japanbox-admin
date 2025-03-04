import { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* To close sidebar when clicked outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 bg-gray-800 text-white w-64 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 p-4 sm:p-6 bg-gray-50 w-full">
        {/* Hamburger Button - mobile */}
        <button
          className="absolute top-4 left-4 md:hidden p-2 text-gray-600 hover:text-gray-900 bg-white shadow-md rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

        {children}
      </div>
    </div>
  );
};

export default Layout;
