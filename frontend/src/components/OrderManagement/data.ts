export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export enum DeliveryStatus {
  PENDING = "PENDING",
  AWAITING_PICKUP = "AWAITING_PICKUP",
  PACKING = "PACKING",
  AWAITING_PAYMENT = "AWAITING_PAYMENT",
  READY_TO_SHIP = "READY_TO_SHIP",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  RETURN_REQUESTED = "RETURN_REQUESTED",
  RETURNED = "RETURNED",
}

export const orderStatuses = [
  "REQUESTED",
  "REVIEW_PENDING",
  "REVIEW_RESOLVED",
  "PAYMENT_REQUESTED",
  "PAID",
  "PAYMENT_FAILED",
  "ORDERED",
  "PACKING",
  "SHIPPED",
  "DELIVERED_TO_WAREHOUSE",
  "SHIPPED_TO_CUSTOMER",
  "DELIVERED_TO_CUSTOMER",
  "CANCELLED",
  "RETURN_REQUESTED",
  "RETURNED",
  "DELETED",
];
