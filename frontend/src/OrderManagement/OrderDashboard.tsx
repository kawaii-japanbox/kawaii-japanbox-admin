import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import { formatDate } from "../utils/helpers";
import Pagination from "../Pagination";
import StatusModal from "./StatusModal";

const OrderDashboard = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const currentOrder = [
    {
      id: 1,
      name: "John Doe",
      createdAt: "2025-01-01T08:30:00Z",
      paymentStatus: "Paid",
      deliveryStatus: "Delivered",
      comment: "Customer requested gift wrapping.",
      orderStatus: "Completed",
    },
    {
      id: 2,
      name: "Jane Smith",
      createdAt: "2025-01-02T09:45:00Z",
      paymentStatus: "Pending",
      deliveryStatus: "Shipped",
      comment: "Address updated during checkout.",
      orderStatus: "In Progress",
    },
    {
      id: 3,
      name: "Samuel Johnson",
      createdAt: "2025-01-03T10:00:00Z",
      paymentStatus: "Failed",
      deliveryStatus: "Not Shipped",
      comment: "Payment was declined, need to retry.",
      orderStatus: "Failed",
    },
    {
      id: 4,
      name: "Emily Davis",
      createdAt: "2025-01-04T11:15:00Z",
      paymentStatus: "Paid",
      deliveryStatus: "In Transit",
      comment: "No special instructions.",
      orderStatus: "Processing",
    },
    {
      id: 5,
      name: "Michael Brown",
      createdAt: "2025-01-05T12:30:00Z",
      paymentStatus: "Paid",
      deliveryStatus: "Delivered",
      comment: "Delivery address confirmed.",
      orderStatus: "Completed",
    },
  ];
  const [orders, setOrders] = useState(currentOrder);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof (typeof orders)[0]>("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const [timeframe, setTimeframe] = useState<string>("This month");
  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };
  const handleStatusModalOpen = () => {
    setIsStatusModalOpen(true);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Navigated to page: ${page}`);
  };
  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeframe(event.target.value);
  };
  // const filteredOrders = orders
  //   .filter(
  //     (order) =>
  //       (filter === "All" || order.status === filter) &&
  //       (search === "" ||
  //         order.customer.toLowerCase().includes(search.toLowerCase()))
  //   )
  //   .sort((a, b) => {
  //     if (sortField === "amount") {
  //       const amountA = parseFloat(a.amount.replace("$", ""));
  //       const amountB = parseFloat(b.amount.replace("$", ""));
  //       return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
  //     } else if (sortField === "date") {
  //       const dateA = new Date(a.date);
  //       const dateB = new Date(b.date);
  //       return sortOrder === "asc"
  //         ? dateA.getTime() - dateB.getTime()
  //         : dateB.getTime() - dateA.getTime();
  //     } else {
  //       return sortOrder === "asc"
  //         ? a[sortField].localeCompare(b[sortField])
  //         : b[sortField].localeCompare(a[sortField]);
  //     }
  //   });

  const handleSort = (field: any) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-medium font-inter">Recent Activity</h1>
        <select
          value={timeframe}
          onChange={handleDropdownChange}
          className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="This month">This month</option>
          <option value="Last 3 months">Last 3 months</option>
          <option value="Last 6 months">Last 6 months</option>
          <option value="This year">This year</option>
        </select>
      </div>
      {/* Boxes Section */}
      <div className="flex flex-wrap gap-6 p-6">
        <div className="bg-[#ff7344] text-white rounded-lg p-6 flex-1 text-center shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-start">
              <h2 className="text-sm font-medium">Total Orders</h2>
              <p className="text-2xl font-bold mt-2">1,234</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
          </div>
        </div>
        <div className="bg-[#6146d6] text-white rounded-lg p-6 flex-1 text-center shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-start">
              <h2 className="text-sm font-medium">Visitors</h2>
              <p className="text-2xl font-bold mt-2">1,890</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="bg-[#0bdc9e] text-white rounded-lg p-6 flex-1 text-center shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-start">
              <h2 className="text-sm font-medium">Total Delivery</h2>
              <p className="text-2xl font-bold mt-2">543</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="bg-[#147bff] text-white rounded-lg p-6 flex-1 text-center shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-start">
              <h2 className="text-sm font-medium">Total Customer</h2>
              <p className="text-2xl font-bold mt-2">2,789</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-inter font-medium"> Order List</h1>
      </div>
      {/* Filters and Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${
              filter === "Pending"
                ? "bg-yellow-500 text-white font-inter"
                : "bg-gray-200 font-inter font-light"
            }`}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "Completed"
                ? "bg-green-500 text-white font-inter "
                : "bg-gray-200 font-inter font-light"
            }`}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "Canceled"
                ? "bg-red-500 text-white font-inter"
                : "bg-gray-200 font-inter font-light"
            }`}
            onClick={() => setFilter("Canceled")}
          >
            Canceled
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "All"
                ? "bg-blue-500 text-white font-inter"
                : "bg-gray-200 font-inter font-light"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by customer name..."
            className="w-full px-4 py-2 rounded border border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* User Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse border border-white-100">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left font-inter text-sm font-light text-gray-700">
                ORDER ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                NAME
              </th>
              <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                ORDER STATUS
              </th>
              <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                PAYMENT STATUS
              </th>
              <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                DELIVERY STATUS
              </th>
              <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                COMMENT
              </th>
              <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                CREATED
              </th>
              <th className="py-3 px-6 text-center text-sm font-medium text-gray-700" />
            </tr>
          </thead>
          <tbody>
            {orders?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 border-t">
                <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                  {user.id}
                </td>
                <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                  {user.name}
                </td>
                <td className="py-4 px-6 font-inter font-light text-sm">
                  {user.orderStatus}
                </td>
                <td className="py-4 px-6 font-inter font-light text-sm">
                  {user.paymentStatus}
                </td>
                <td className="py-4 px-6 font-inter font-light text-sm">
                  {user.deliveryStatus}
                </td>
                <td className="py-4 px-6 font-inter font-light text-sm">
                  {user.comment}
                </td>
                <td className="py-4 px-6 font-inter font-light text-sm">
                  {formatDate(user.createdAt)}
                </td>
                <td className="py-4 px-6 text-center flex justify-center gap-2">
                  {/* Edit Icon */}
                  <button
                    onClick={handleStatusModalOpen}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit User"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleOpenUploadModal}
                    className="text-blue-500 hover:text-blue-700"
                    title="Upload Photo"
                  >
                    <ArrowUpTrayIcon className="h-6 w-6 text-green-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <FileUpload
          isModalOpen={isUploadModalOpen}
          setIsModalOpen={setIsUploadModalOpen}
        />
        <StatusModal
          isModalOpen={isStatusModalOpen}
          setIsModalOpen={setIsStatusModalOpen}
        />
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          page={currentPage}
          pages={1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderDashboard;
