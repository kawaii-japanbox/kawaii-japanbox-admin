import { PencilIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils/helpers";
import Pagination from "../../Pagination";
import StatusModal from "./StatusModal";
import Layout from "../../Layout";
import Spinner from "../../Spinner";
import { Order } from "./interface";
import { orderStatuses } from "./data";
import { getOrders } from "../../api/api";
import PhotoUploadModal from "./PhotoUploadModal";
import OrderAnalytics from "./OrderAnalytics";

const OrderDashboardPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);

  const [orders, setOrders] = useState<Order[] | null>(null);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const handleOpenUploadModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsUploadModalOpen(true);
  };
  const handleStatusModalOpen = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsStatusModalOpen(true);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchOrders = async (currentPage: number) => {
    try {
      const response = await getOrders({
        filter,
        search,
        sortBy,
        sortOrder,
        page: currentPage,
      });
      setOrders(response.orders || []);
      setCurrentPage(response.page);
      setPages(response.pages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [filter, search, sortBy, sortOrder, currentPage]);

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 w-full">
        <OrderAnalytics />
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-inter font-medium"> Order List</h1>
        </div>
        {/* Filters and Search */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300"
          >
            <option value="All">All</option>
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search by customer name..."
            className="w-full px-4 py-2 rounded border border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
                  <button onClick={() => toggleSort("name")} className="ml-2">
                    {sortBy === "name" ? (
                      sortOrder === "asc" ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      )
                    ) : (
                      <ArrowUpDown size={16} />
                    )}
                  </button>
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
                  <button
                    onClick={() => toggleSort("createdAt")}
                    className="ml-2"
                  >
                    {sortBy === "createdAt" ? (
                      sortOrder === "asc" ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      )
                    ) : (
                      <ArrowUpDown size={16} />
                    )}
                  </button>
                </th>
                <th className="py-3 px-6 text-center text-sm font-medium text-gray-700" />
              </tr>
            </thead>
            <tbody>
              {orders ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 border-t">
                    <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                      {order.id}
                    </td>
                    <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                      {order.user?.name}
                    </td>
                    <td className="py-4 px-6 font-inter font-light text-sm">
                      {order.status}
                    </td>
                    <td className="py-4 px-6 font-inter font-light text-sm">
                      {order.paymentStatus}
                    </td>
                    <td className="py-4 px-6 font-inter font-light text-sm">
                      {order.deliveryStatus}
                    </td>
                    <td className="py-4 px-6 font-inter font-light text-sm">
                      {order.reviewComment}
                    </td>
                    <td className="py-4 px-6 font-inter font-light text-sm">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-4 px-6 text-center flex justify-center gap-2">
                      {/* Edit Icon */}
                      <button
                        onClick={() => handleStatusModalOpen(order.id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit User"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleOpenUploadModal(order.id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Upload Photo"
                      >
                        <ArrowUpTrayIcon className="h-6 w-6 text-green-500" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center">
                    <Spinner />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PhotoUploadModal
            isOpen={isUploadModalOpen}
            setIsModalOpen={setIsUploadModalOpen}
            orderId={selectedOrderId}
          />
          <StatusModal
            isModalOpen={isStatusModalOpen}
            setIsModalOpen={setIsStatusModalOpen}
            orderId={selectedOrderId}
          />
        </div>
        <div className="flex justify-center mt-6">
          <Pagination
            page={currentPage}
            pages={pages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default OrderDashboardPage;
