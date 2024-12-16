import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";
interface DashboardProps {
  user: { userId: string; role: string } | null;
}

export type Role = "ADMIN" | "SALES" | "DELIVERY";

export type SidebarKey =
  | "home"
  | "users"
  | "customers"
  | "orders"
  | "analytics"
  | "notifications"
  | "products";

export const rolePermissions: Record<Role, string[]> = {
  ADMIN: [
    "home",
    "users",
    "customers",
    "orders",
    "notifications",
    "analytics",
    "products",
  ],
  SALES: ["home", "customers", "orders", "products"],
  DELIVERY: ["orders"],
};

export const sidebarItems: Record<SidebarKey, string> = {
  home: "Home",
  users: "Users",
  customers: "Customers",
  orders: "Orders",
  notifications: "Notifications",
  analytics: "Analytics",
  products: "Products",
};

const Dashboard: React.FC<DashboardProps> = () => {
  const { user } = useUser();

  if (!user) {
    return null; // Or render a loading spinner
  }

  const allowedItems =
    rolePermissions[user.role as keyof typeof rolePermissions] || [];
  return (
    <>
      <aside className="w-64 bg-gray-800 text-gray-100 h-screen">
        <div className="p-4 text-lg font-semibold text-center border-b border-gray-700">
          Dashboard
        </div>
        <nav className="mt-4">
          <ul>
            {allowedItems.map((itemKey) => (
              <li key={itemKey}>
                <Link
                  to={`/${itemKey}`}
                  className="block py-2.5 px-4 rounded hover:bg-gray-700"
                >
                  {sidebarItems.hasOwnProperty(itemKey)
                    ? sidebarItems[itemKey as keyof typeof sidebarItems]
                    : itemKey}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
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
    </>
  );
};

export default Dashboard;
