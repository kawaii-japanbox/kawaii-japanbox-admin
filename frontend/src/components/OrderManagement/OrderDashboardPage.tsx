import { PencilIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
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

  const fetchOrders = async () => {
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
    fetchOrders();
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
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-1 sm:p-2 text-sm sm:text-base border border-gray-300 w-full sm:w-auto"
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
            className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded border border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 font-inter font-light">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  ORDER ID
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  NAME
                  <button
                    onClick={() => toggleSort("name")}
                    className="ml-1 sm:ml-2"
                  >
                    {sortBy === "name" ? (
                      sortOrder === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )
                    ) : (
                      <ArrowUpDown size={14} />
                    )}
                  </button>
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  ORDER STATUS
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  PAYMENT STATUS
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  DELIVERY STATUS
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  COMMENT
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  CREATED
                  <button
                    onClick={() => toggleSort("createdAt")}
                    className="ml-1 sm:ml-2"
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
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-center text-xs sm:text-sm font-medium text-gray-700" />
              </tr>
            </thead>
            <tbody>
              {orders ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 border-t">
                    <td className="py-2 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm text-gray-800">
                      {order.id}
                    </td>
                    <td className="py-2 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm text-gray-800">
                      {order.user?.name}
                    </td>
                    <td className="py-2 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm">
                      {order.status}
                    </td>
                    <td className="py-2 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm">
                      {order.paymentStatus}
                    </td>
                    <td className="py-2 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm">
                      {order.deliveryStatus}
                    </td>
                    <td className="py-2 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm">
                      {order.reviewComment}
                    </td>
                    <td className="py-2 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-2 px-3 sm:py-4 sm:px-6 text-center flex justify-center gap-2">
                      {/* Edit Icon */}
                      <button
                        onClick={() => handleStatusModalOpen(order.id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit User"
                      >
                        <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={() => handleOpenUploadModal(order.id)}
                        className="text-green-500 hover:text-green-700"
                        title="Upload Photo"
                      >
                        <ArrowUpTrayIcon className="h-4 w-4 sm:h-6 sm:w-6" />
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
        </div>
        <PhotoUploadModal
          isOpen={isUploadModalOpen}
          setIsModalOpen={setIsUploadModalOpen}
          orderId={selectedOrderId}
        />
        <StatusModal
          isModalOpen={isStatusModalOpen}
          setIsModalOpen={setIsStatusModalOpen}
          orderId={selectedOrderId}
          fetchOrders={fetchOrders}
        />
      </div>
      <div className="flex justify-center mt-6 sm:mt-6">
        <Pagination
          page={currentPage}
          pages={pages}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default OrderDashboardPage;
