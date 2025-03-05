import React, { useState } from "react";
import { formatDate } from "../../utils/helpers";
import {
  CustomerOrdersTableProps,
  IGetCustomerOrdersResponse,
  OrderItem,
} from "./interface";

const OrderDetailsList: React.FC<{ items: OrderItem[] }> = ({ items }) => (
  <div className="bg-gray-100 p-4 rounded-lg mt-2">
    {items.map((item) => (
      <div key={item.id} className="border-b pb-2 mb-2 last:border-none">
        <p className="text-sm">
          <strong>Product:</strong> {item.product.name}
        </p>
        <p className="text-sm">
          <strong>Quantity:</strong> {item.quantity}
        </p>
        <p className="text-sm">
          <strong>Price:</strong> {item.price} {item.currency}
        </p>
        <p className="text-sm">
          <strong>Delivery Cost:</strong> {item.deliveryCost}
        </p>
        <p className="text-sm">
          <strong>Status:</strong> {item.status}
        </p>
        <p className="text-sm">
          <strong>Created:</strong> {formatDate(item.createdAt)}
        </p>
      </div>
    ))}
  </div>
);

const OrderRow: React.FC<{
  order: IGetCustomerOrdersResponse;
  expanded: boolean;
  onToggle: () => void;
}> = ({ order, expanded, onToggle }) => (
  <>
    {/* Desktop View */}
    <tr
      className="hover:bg-gray-50 border-t cursor-pointer hidden md:table-row"
      onClick={onToggle}
    >
      <td className="py-4 px-6 text-center text-sm font-medium text-gray-700">
        {expanded ? "▼" : "▶"}
      </td>
      <td className="py-4 px-6 text-sm text-gray-800">{order.id}</td>
      <td className="py-4 px-6 text-sm text-gray-800">{order.status}</td>
      <td className="py-4 px-6 text-sm text-gray-800">
        {order.deliveryStatus}
      </td>
      <td className="py-4 px-6 text-sm text-gray-800">
        {formatDate(order.createdAt)}
      </td>
    </tr>

    {/* Mobile View */}
    <tr className="md:hidden border-t">
      <td colSpan={5} className="p-4">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <p className="text-sm">
            <strong>ID:</strong> {order.id}
          </p>
          <p className="text-sm">
            <strong>STATUS:</strong> {order.status}
          </p>
          <p className="text-sm">
            <strong>DELIVERY STATUS:</strong> {order.deliveryStatus}
          </p>
          <p className="text-sm">
            <strong>CREATED:</strong> {formatDate(order.createdAt)}
          </p>
          <button onClick={onToggle} className="text-blue-500 text-sm mt-2">
            {expanded ? "Hide Details ▲" : "Show Details ▼"}
          </button>
        </div>
      </td>
    </tr>

    {expanded && order.items?.length > 0 && (
      <tr>
        <td colSpan={5} className="p-4">
          <OrderDetailsList items={order.items} />
        </td>
      </tr>
    )}
  </>
);

const CustomerOrdersTable: React.FC<CustomerOrdersTableProps> = ({
  customerOrders,
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6">
      {/* Desktop View */}
      <table className="w-full border-collapse border border-gray-200 hidden md:table">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="py-3 px-6 text-center"></th>
            {["ID", "STATUS", "DELIVERY STATUS", "CREATED"].map((header) => (
              <th key={header} className="py-3 px-6 text-left font-light">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customerOrders && customerOrders.length > 0 ? (
            customerOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                expanded={expandedRows[order.id] || false}
                onToggle={() => toggleRow(order.id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {customerOrders && customerOrders.length > 0 ? (
          customerOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-md p-4 rounded-lg">
              <p className="text-sm">
                <strong>ID:</strong> {order.id}
              </p>
              <p className="text-sm">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-sm">
                <strong>Delivery Status:</strong> {order.deliveryStatus}
              </p>
              <p className="text-sm">
                <strong>Created:</strong> {formatDate(order.createdAt)}
              </p>
              <button
                onClick={() => toggleRow(order.id)}
                className="text-blue-500 text-sm mt-2"
              >
                {expandedRows[order.id] ? "Hide Details ▲" : "Show Details ▼"}
              </button>

              {expandedRows[order.id] && order.items?.length > 0 && (
                <OrderDetailsList items={order.items} />
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerOrdersTable;
