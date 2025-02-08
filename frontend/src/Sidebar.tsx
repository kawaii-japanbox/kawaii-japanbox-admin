import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

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
  SALES: ["home", "dashboard", "customers", "orders", "products"],
  DELIVERY: ["orders"],
};

export type Role = "ADMIN" | "SALES" | "DELIVERY";

export type SidebarKey =
  | "home"
  | "users"
  | "customers"
  | "orders"
  | "analytics"
  | "notifications"
  | "products";

export const sidebarItems: Record<SidebarKey, string> = {
  home: "Home",
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
  const allowedItems =
    rolePermissions[user.role as keyof typeof rolePermissions] || [];
  console.log(user.role);
  console.log("allowed items:", allowedItems);
  return (
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
  );
};

export default Sidebar;
