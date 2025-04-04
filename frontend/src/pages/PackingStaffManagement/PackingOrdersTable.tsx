import { getPackingOrders } from "../../api/api";
import Pagination from "../../components/Pagination";
import PhotoUploadModal from "../../components/PhotoUploadModal";
import SearchField from "../../components/SearchField";
import Spinner from "../../components/Spinner";
import { formatDate } from "../../utils/helpers";
import EditOrderModal from "./EditOrderModal";
import { PackingOrder } from "./interface";
import { ArrowUpTrayIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const PackingOrdersTable = () => {
  const [orders, setOrders] = useState<PackingOrder[] | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  const fetchOrders = async () => {
    try {
      const response = await getPackingOrders(search);
      setOrders(response.orders);
      setPage(response.page);
      setLimit(response.limit);
      setTotalPages(response.pages);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [page, limit, search]);

  const openEditModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsStatusModalOpen(true);
  };

  const handleOpenUploadModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsUploadModalOpen(true);
  };

  const handlePageChange = async (currentPage: number) => {
    if (page !== currentPage && !loading) {
      setLoading(true);
      setPage(page);
      setLoading(false);
    }
    setPage(page);
  };

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(search);
  };

  return (
    <>
      <SearchField
        searchQuery={search}
        setSearchQuery={setSearch}
        setPage={setPage}
        onSearch={handleSearch}
      />
      <div className="desktop-table-container">
        <table className="desktop-table">
          <thead className="desktop-table-header">
            <tr>
              <th className="desktop-table-header-cell">ORDER ID</th>
              <th className="desktop-table-header-cell">NAME</th>
              <th className="desktop-table-header-cell">ORDER STATUS</th>
              <th className="desktop-table-header-cell">WAREHOUSE</th>
              <th className="desktop-table-header-cell">LOCATION</th>
              <th className="desktop-table-header-cell">CREATED</th>
              <th className="desktop-table-header-cell">UPDATED</th>
              <th className="desktop-table-header-cell" />
            </tr>
          </thead>
          <tbody>
            {orders ? (
              orders.map((order) => (
                <tr key={order.id} className="desktop-table-row">
                  <td className="desktop-table-cell">{order.id}</td>
                  <td className="desktop-table-cell">{order.user?.name}</td>
                  <td className="desktop-table-cell">{order.status}</td>
                  <td className="desktop-table-cell">{order.warehouse.name}</td>
                  <td className="desktop-table-cell">
                    {order.warehouse.location}
                  </td>
                  <td className="desktop-table-cell">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="desktop-table-cell">
                    {formatDate(order.updatedAt)}
                  </td>
                  <td className="py-4 px-6 text-center action-button">
                    {/* Edit Icon */}
                    <button
                      className="edit-button"
                      title="Edit User"
                      onClick={() => openEditModal(order.id)}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    {/* Upload Icon */}
                    <button
                      onClick={() => handleOpenUploadModal(order.id)}
                      className="text-green-500 hover:text-green-700"
                      title="Upload Photo"
                    >
                      <ArrowUpTrayIcon className="w-6 h-6" />
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
        <div className="pagination-container">
          <Pagination
            page={page}
            pages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <EditOrderModal
          isModalOpen={isStatusModalOpen}
          setIsModalOpen={setIsStatusModalOpen}
          orderId={selectedOrderId}
          fetchOrders={fetchOrders}
        />
        <PhotoUploadModal
          isOpen={isUploadModalOpen}
          setIsModalOpen={setIsUploadModalOpen}
          orderId={selectedOrderId}
        />
      </div>
    </>
  );
};

export default PackingOrdersTable;
