export const roleColors: Record<string, string> = {
  ADMIN: "bg-blue-500",
  SUPER_ADMIN: "bg-blue-500",
  SALES: "bg-green-500",
  PARTNER: "bg-purple-500",
  MERCHANDISER: "bg-orange-500",
  DELIVERY: "bg-red-500",
  CUSTOMER_SERVICE: "bg-teal-500",
  USER: "bg-sky-500",
};

export enum Role {
  SUPER_ADMIN = "Super Admin",
  CUSTOMER_SERVICE = "Customer Service",
  SALES = "Sales",
  ADMIN = "Admin",
  PARTNER = "Partner",
  MERCHANDISER = "Merchandiser",
  DELIVERY = "Delivery",
  USER = "User",
}
