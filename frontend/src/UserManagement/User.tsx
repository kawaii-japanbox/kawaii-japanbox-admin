import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";
import { getUsers } from "../api/api";
import ConfirmationModal from "./ConfirmationModal"; // import the modal component

const UserManagement = () => {
  const [users, setUsers] = useState<IUserResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers(); // Replace with your endpoint
      setUsers(data.data); // Ensure the backend response structure matches
      setTotalCount(data.total);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle the deletion trigger (open modal)
  const handleDelete = (userId: string) => {
    setSelectedUserId(userId); // Save userId to state for confirmation
    setIsDeleteModalOpen(true); // Open the confirmation modal
  };

  // Confirm the deletion
  const confirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      // await axios.delete(`http://localhost:8001/api/user/${selectedUserId}`, {
      //   withCredentials: true,
      // });
      setIsDeleteModalOpen(false); // Close the modal after deletion
      fetchUsers(); // Fetch the updated list of users
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false); // Close the modal without deleting
    setSelectedUserId(null); // Clear selected user ID
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Calculate the paginated data
  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // // Total pages
  // const totalPages = Math.ceil(users.length / usersPerPage);

  // Handlers for pagination
  // const handleNext = () => {
  //   if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  // };

  // const handleClick = (page) => {
  //   if (page >= 1 && page <= totalPages) {
  //     onPageChange(page);
  //   }

  // const handlePrevious = () => {
  //   if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  // };

  // const handlePageClick = (page: number) => {
  //   setCurrentPage(page);
  // };

  // const handleInputChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setNewUser((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleAddUser = () => {
  //   if (!newUser.name || !newUser.email) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }

  //   const newUserWithId = {
  //     ...newUser,
  //     id: users.length + 1, // Generate a simple ID
  //   };

  //   setUsers((prev) => [...prev, newUserWithId]);
  //   setNewUser({ name: "", email: "", role: "Viewer" }); // Reset form
  // };

  // const handleDelete = (userId: number) => {
  //   setUsers((prev) => prev.filter((user) => user.id !== userId));
  // };
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
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-2xl font-semibold">All Users: {totalCount}</h4>
          <button
            // onClick={handleAddUser}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New User
          </button>
        </div>
        {/* Other content, e.g., user table */}
      </div>
      {/* User Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Phone
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Created At
              </th>
              <th className="py-3 px-6 text-center text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 border-t">
                <td className="py-4 px-6 text-sm text-gray-800">{user.name}</td>
                <td className="py-4 px-6 text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="py-4 px-6 text-sm text-gray-800">
                  {user.phone}
                </td>
                <td className="py-4 px-6 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                      user.role === "Admin"
                        ? "bg-blue-500"
                        : user.role === "Editor"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-800">
                  {user.created_at?.toString()}
                </td>
                <td className="py-4 px-6 text-center flex justify-center gap-2">
                  {/* Edit Icon */}
                  <button
                    // onClick={() => handleEdit(user.id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit User"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>

                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete User"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default UserManagement;
