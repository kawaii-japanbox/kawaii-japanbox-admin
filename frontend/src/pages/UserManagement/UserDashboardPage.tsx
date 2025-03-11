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
import DesktopUserTable from "./DesktopUserTable";
import MobileUserTable from "./MobileUserTable";

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
        <DesktopUserTable
          users={users}
          roleColors={roleColors}
          handleEditUser={handleEditUser}
          handleDelete={handleDelete}
        />
        <MobileUserTable
          users={users}
          roleColors={roleColors}
          handleEditUser={handleEditUser}
          handleDelete={handleDelete}
        />

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
