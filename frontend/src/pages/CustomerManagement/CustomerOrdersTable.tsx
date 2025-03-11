import React, { useState } from "react";
import { formatDate } from "../../utils/helpers";
import {
  CustomerOrdersTableProps,
  IGetCustomerOrdersResponse,
  OrderItem,
} from "./interface";

const OrderDetailsList: React.FC<{ items: OrderItem[] }> = ({ items }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-2">
      {items.map(
        ({
          id,
          product,
          quantity,
          price,
          currency,
          deliveryCost,
          status,
          createdAt,
        }) => (
          <div key={id} className="border-b pb-2 mb-4 last:border-none">
            {[
              { label: "Product", value: product.name },
              { label: "Quantity", value: quantity },
              { label: "Price", value: `${price} ${currency}` },
              { label: "Delivery Cost", value: deliveryCost },
              { label: "Status", value: status },
              { label: "Created", value: formatDate(createdAt) },
            ].map(({ label, value }) => (
              <p key={label} className="text-sm">
                <strong>{label}:</strong> {value}
              </p>
            ))}
          </div>
        )
      )}
    </div>
  );
};

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
    {expanded && (
      <tr className="hidden md:table-row">
        <td colSpan={5} className="bg-gray-100">
          <NestedOrderTable items={order.items} />
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

const NestedOrderTable: React.FC<{ items: OrderItem[] }> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="nested-table-cell text-center">No order items found</div>
    );
  }

  return (
    <table className="nested-table-container">
      <thead>
        <tr className="nested-table-header">
          {[
            "Product",
            "Quantity",
            "Price",
            "Delivery Cost",
            "Status",
            "Created",
          ].map((heading) => (
            <th key={heading} className="nested-table-header-cell">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(
          ({
            id,
            product,
            quantity,
            price,
            currency,
            deliveryCost,
            status,
            createdAt,
          }) => (
            <tr key={id} className="nested-table-row">
              <td className="nested-table-cell">{product.name}</td>
              <td className="nested-table-cell">{quantity}</td>
              <td className="nested-table-cell">
                {price.toFixed(2)} {currency}
              </td>
              <td className="nested-table-cell">{deliveryCost}</td>
              <td className="nested-table-cell">{status}</td>
              <td className="nested-table-cell">{formatDate(createdAt)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default CustomerOrdersTable;
