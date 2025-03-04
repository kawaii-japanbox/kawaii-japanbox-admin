import { useEffect, useState } from "react";
import { deleteUser, getCustomers } from "../../api/api";
import Pagination from "../../components/Pagination";
import "@fontsource/inter";
import Layout from "../../components/Layout";
import { IGetCustomersResponse } from "./interface";
import "../../styles/customers.css";
import MobileCustomerTable from "./MobileCustomerTable";
import DesktopCustomerTable from "./DesktopCustomerTable";

const CustomerDashboardPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<IGetCustomersResponse[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);

  const fetchCustomers = async (page = 1) => {
    try {
      const { data, total, pages } = await getCustomers({
        page: page,
        search,
      });
      setTotalCount(total);
      setCustomers(data);
      setPages(pages);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (userId: string) => {
    setSelectedUserId(userId);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      await deleteUser(selectedUserId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setSelectedUserId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchQuery(search);
  };

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage, searchQuery]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <p className="text-lg font-semibold">Loading customers...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <p className="text-lg font-semibold text-red-500">{error}</p>
  //     </div>
  //   );
  // }

  return (
    <Layout>
      <div className="container-wrapper">
        <div className="container">
          <div className="header">
            <h4 className="header-wrapper">All Customers: {totalCount}</h4>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by customer name, phone or email..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <DesktopCustomerTable customers={customers} loading={loading} />
        <MobileCustomerTable customers={customers} loading={false} />

        <div className="pagination-container">
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

export default CustomerDashboardPage;
