import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export const rolePermissions: Record<Role, string[]> = {
  ADMIN: [
    "dashboard",
    "users",
    "customers",
    "orders",
    "notifications",
    "analytics",
    "products",
  ],
  SALES: ["dashboard", "customers", "orders", "products"],
  DELIVERY: ["dashboard", "orders"],
};

export type Role = "ADMIN" | "SALES" | "DELIVERY";

export type SidebarKey =
  | "users"
  | "customers"
  | "orders"
  | "analytics"
  | "notifications"
  | "products";

export const sidebarItems: Record<SidebarKey, string> = {
  users: "Users",
  customers: "Customers",
  orders: "Orders",
  notifications: "Notifications",
  analytics: "Analytics",
  products: "Products",
};

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  if (!user) {
    return;
  }
  let allowedItems =
    rolePermissions[user.role as keyof typeof rolePermissions] || [];
  allowedItems = allowedItems.filter(
    (allowedItem) => allowedItem !== "dashboard"
  );

  return (
    <aside className="w-64 bg-gray-800 text-gray-100 h-screen">
      <div className="p-4 text-lg font-semibold text-center border-b border-gray-700">
        Dashboard
      </div>
      <nav className="mt-4">
        <ul>
          <li key="home">
            <Link
              to="/"
              className="block py-2.5 px-4 rounded hover:bg-gray-700"
            >
              Home
            </Link>
          </li>
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
  );
};

export default Sidebar;
