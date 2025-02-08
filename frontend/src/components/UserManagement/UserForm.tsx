import React, { useEffect, useState } from "react";
import { Role } from "./data";
import { UserFormProps } from "./interface";
import { createUser, updateUser } from "../../api/api";

interface SubmitFormData {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: Role;
}
const UserForm: React.FC<UserFormProps> = ({
  isEdit,
  isModalOpen,
  setIsModalOpen,
  user,
}) => {
  const handleOpenModal = () => setIsModalOpen(isModalOpen);
  const handleCloseModal = () => setIsModalOpen(false);
  const [formData, setFormData] = useState<SubmitFormData>({
    name: "",
    email: "",
    role: "USER" as Role,
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && user) {
        // Update existing user
        await updateUser({ id: user.id, data: { ...formData } });
        alert("User updated successfully!");
      } else {
        // Create new user
        await createUser({
          name: formData.name,
          password: formData.password!,
          email: formData.email,
          role: formData.role,
        });
        alert("User created successfully!");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred. Please try again.");
    }
    console.log("Form submitted!");
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEdit && user) {
      setFormData({
        name: user.name,
        email: user.email!,
        role: user.role as Role,
        phone: user.phone || "",
        password: "",
      });
    }
  }, [isEdit, user]);

  return (
    <div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">
              {isEdit ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.94 4.87L10 9.94l7.06-5.07A2 2 0 0016.8 4H3.2a2 2 0 00-.26.87zM18 8l-7.65 5.46a.75.75 0 01-.7 0L2 8v7a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>

              {/* Phone Input */}
              {isEdit && (
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884l2.122-2.122a2.002 2.002 0 012.83 0l1.06 1.06a2 2 0 010 2.828l-.709.71a11.041 11.041 0 004.95 4.95l.71-.71a2 2 0 012.828 0l1.06 1.06a2.002 2.002 0 010 2.83l-2.122 2.121A2 2 0 0113.5 19a15.978 15.978 0 01-11.34-4.66A15.978 15.978 0 01.5 2.5 2 2 0 012.003.884l.11.11z" />
                      </svg>
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              )}

              {/* Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zM12 14c-3.74 0-7 2.42-7 5.263 0 .403.257.737.6.737h12.8c.343 0 .6-.334.6-.737 0-2.843-3.26-5.263-7-5.263z" />
                    </svg>
                  </span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter name"
                  />
                </div>
              </div>

              {/* Password Input */}
              {!isEdit && (
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 8V6a5 5 0 0110 0v2a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2zm10-2a3 3 0 00-6 0v2h6V6zm-4 8a1 1 0 112 0 1 1 0 01-2 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      type="password"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>
              )}
              {/* Name Field
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div> */}

              {/* Role Dropdown */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>

                <select
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  name="role"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {Object.entries(Role).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                  {/* <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option> */}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
