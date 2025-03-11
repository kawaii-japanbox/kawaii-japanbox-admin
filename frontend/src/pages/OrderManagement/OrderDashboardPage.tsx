import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import StatusModal from "./StatusModal";
import Layout from "../../components/Layout";
import { Order } from "./interface";
import { orderStatuses } from "./data";
import { getOrders } from "../../api/api";
import PhotoUploadModal from "./PhotoUploadModal";
import OrderAnalytics from "./OrderAnalytics";
import MobileOrderTable from "./MobileOrderTable";
import DesktopOrderTable from "./DesktopOrderTable";

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
        <DesktopOrderTable
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleStatusModalOpen={handleStatusModalOpen}
          handleOpenUploadModal={handleOpenUploadModal}
          toggleSort={toggleSort}
          orders={orders}
        />
        <MobileOrderTable
          orders={orders}
          loading={false}
          handleStatusModalOpen={handleStatusModalOpen}
          handleOpenUploadModal={handleOpenUploadModal}
        />
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
