import { useEffect, useState } from "react";
import { deleteUser, getCustomers } from "../../api/api";
import Pagination from "../../Pagination";
import "@fontsource/inter";
import { formatDate } from "../../utils/helpers";
import Layout from "../../Layout";
import { IGetCustomersResponse } from "./data";
import { Link } from "react-router-dom";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold">Loading customers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-50 w-full">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl font-inter text-lg">
              All Customers: {totalCount}
            </h4>
          </div>
        </div>
        {/* User Table */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Search by customer name, phone or email..."
            className="w-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded border border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="flex items-center bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-inter font-light rounded-lg hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border bg-white border-gray-100">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left font-inter text-sm font-light text-gray-700">
                  NAME
                </th>
                <th className="py-3 px-6 text-left text-sm font-light ">
                  EMAIL
                </th>
                <th className="py-3 px-6 text-left text-sm font-light">
                  PHONE
                </th>
                <th className="py-3 px-6 text-left text-sm font-light">
                  SOURCE
                </th>
                <th className="py-3 px-6 text-left text-sm font-light">
                  CREATED
                </th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 border-t">
                  <Link
                    to={`/customers/${customer.id}`}
                    state={{ id: customer.id }}
                  >
                    <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                      {customer.name}
                    </td>
                  </Link>

                  <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                    {customer.email}
                  </td>
                  <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                    {customer.phone}
                  </td>
                  <td className="py-4 px-6 font-inter font-light text-sm"></td>
                  <td className="py-4 px-6 text-sm font-inter font-light text-gray-800">
                    {formatDate(customer.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default CustomerDashboardPage;
