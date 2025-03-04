import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { IUserResponse } from "./interface";
import { deleteUser, getUsers } from "../../api/api";
import ConfirmationModal from "./ConfirmationModal";
import UserForm from "./UserForm";
import { roleColors } from "./data";
import Pagination from "../../components/Pagination";
import "@fontsource/inter";
import { formatDate } from "../../utils/helpers";
import Layout from "../../components/Layout";

const UserDashboardPage = () => {
  const [users, setUsers] = useState<IUserResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<IUserResponse | null>(null);

  const fetchUsers = async (page: number) => {
    try {
      const { data, total, pages } = await getUsers(page);
      setUsers(data);
      setTotalCount(total);
      setPages(pages);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (userId: string) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const handleAddUser = () => {
    setIsEdit(false);
    setSelectedUser(null);
    setIsCreateModalOpen(true);
  };

  const handleEditUser = (user: IUserResponse) => {
    setIsEdit(true);
    setSelectedUser(user);
    setIsCreateModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      await deleteUser(selectedUserId);
      setIsDeleteModalOpen(false);
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold">Loading users...</p>
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
              All Users: {totalCount}
            </h4>
            <button
              onClick={handleAddUser}
              className="flex items-center bg-blue-500 text-white px-3 py-1 text-xs sm:text-base sm:px-4 sm:py-2 font-inter font-light rounded-lg hover:bg-blue-600"
            >
              <PlusIcon className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-base">Add User</span>
            </button>
          </div>
        </div>
        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border  bg-white border-white-100">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  NAME
                </th>
                <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  EMAIL
                </th>
                <th className="hidden sm:table-cell py-3 px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  PHONE
                </th>
                <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  ROLE
                </th>
                <th className="hidden sm:table-cell py-3 px-6 text-left text-xs sm:text-sm font-light text-gray-700">
                  CREATED
                </th>
                <th className="py-3 px-4 sm:px-6 text-center text-xs sm:text-sm font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 border-t">
                  <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="hidden sm:table-cell py-4 px-6 text-xs sm:text-sm text-gray-800">
                    {user.phone}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        roleColors[user.role] || "bg-gray-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell py-4 px-6 text-xs sm:text-sm text-gray-800">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-center flex justify-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-500 hover:text-blue-700 w-6 h-6 sm:w-8 sm:h-8"
                      title="Edit User"
                    >
                      <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700 w-6 h-6 sm:w-8 sm:h-8"
                      title="Delete User"
                    >
                      <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6 sm:mt-6">
          <Pagination
            page={currentPage}
            pages={pages}
            onPageChange={handlePageChange}
          />
        </div>
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message="Are you sure you want to delete this user?"
        />
        <UserForm
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          isEdit={isEdit}
          user={selectedUser}
        />
      </div>
    </Layout>
  );
};

export default UserDashboardPage;
