import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import {
  BellDot,
  ChartNoAxesCombined,
  House,
  LogOut,
  ScanBarcode,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  User,
} from "lucide-react";
import { JSX } from "react";

const icons: Record<string, JSX.Element> = {
  home: <House />,
  users: <User />,
  orders: <ShoppingCart />,
  customers: <ScanBarcode />,
  notifications: <BellDot />,
  analytics: <ChartNoAxesCombined />,
  products: <ShoppingBasket />,
};

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
  SUPER_ADMIN: [
    "dashboard",
    "users",
    "customers",
    "orders",
    "notifications",
    "analytics",
    "products",
  ],
  MERCHANDISER: ["dashboard"],
};

export type Role =
  | "ADMIN"
  | "SALES"
  | "DELIVERY"
  | "SUPER_ADMIN"
  | "MERCHANDISER";

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

const Sidebar: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { user, logout } = useAuth();
  if (!user) return null;

  let allowedItems =
    rolePermissions[user.role as keyof typeof rolePermissions] || [];
  allowedItems = allowedItems.filter(
    (allowedItem) => allowedItem !== "dashboard"
  );

  return (
    <aside className="h-screen w-64 bg-gray-800 text-gray-100">
      <div className="p-4 text-lg font-semibold text-center border-b border-gray-700">
        Dashboard
      </div>
      <nav className="mt-4">
        <ul>
          <li
            key="home"
            className="flex items-center space-x-2 py-2.5 px-4 rounded hover:bg-gray-700"
          >
            <House />
            <Link to="/" className="block" onClick={onClose}>
              Home
            </Link>
          </li>
          {allowedItems.map((itemKey) => (
            <li
              key={itemKey}
              className="flex items-center space-x-2 py-2.5 px-4 rounded hover:bg-gray-700"
            >
              {icons[itemKey] || <span className="w-5" />}
              <Link to={`/${itemKey}`} className="block" onClick={onClose}>
                {sidebarItems[itemKey as keyof typeof sidebarItems] || itemKey}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => {
            logout();
            onClose?.(); // Close sidebar on logout
          }}
          className="flex items-center w-full text-left py-2.5 px-4 rounded hover:bg-red-600 transition"
        >
          <LogOut className="mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
