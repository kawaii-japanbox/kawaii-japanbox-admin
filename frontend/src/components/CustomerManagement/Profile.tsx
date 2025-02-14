import { Heart, Star, Truck, Undo2 } from "lucide-react";
import Layout from "../../Layout";
import Pagination from "../../Pagination";

const Profile = () => {
  return (
    <Layout>
      <div className="p-6 bg-gray-50 w-full">
        {/* Title Section */}
        <div className="flex justify-between items-start mb-2 p-6">
          <h1 className=" text-2xl font-medium font-inter">General Overview</h1>
        </div>
        {/* Boxes Section */}
        <div className="flex flex-wrap gap-6 p-6">
          <div className=" text-gray-400 rounded-lg p-6 flex-1  shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <Truck />
                <p className="text-medium mt-2">Orders made</p>
                <p className="text-black text-2xl font-bold mb-2">123</p>
                <p className="text-sm">7% vs last month</p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 rounded-lg p-6 flex-1 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <Star />
                <h2 className="text-medium mt-2">Reviews added</h2>
                <p className="text-black text-2xl font-bold mb-2">26</p>
                <p className="text-sm">8.8% vs last month</p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 rounded-lg p-6 flex-1 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <Heart />
                <h2 className="text-medium mt-2">Favorite products</h2>
                <p className="text-black text-2xl font-bold mb-2">9</p>
                <p className="text-sm">2.5% vs last month</p>
              </div>
            </div>
          </div>
          <div className="text-gray-400 rounded-lg p-6 flex-1 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-start">
                <Undo2 />
                <h2 className="text-medium mt-2">Product returns</h2>
                <p className="text-black text-2xl font-bold mb-2">4</p>
                <p className="text-sm">5.6% vs last month</p>
              </div>
            </div>
          </div>
        </div>
        {/* Customer Details Section*/}
        <div className="flex flex-wrap gap-6 p-6">
          <div className="text-black rounded-lg p-6 flex-1 shadow-md">
            <h1 className=" text-lg font-medium font-inter mb-3">
              Customer Details
            </h1>
            <div className="flex flex-row justify-between mb-2">
              <p className="font-medium">Name</p>
              <p className="text-gray-400">Joseph McFall</p>
            </div>
            <hr className="border-t border-gray-200 my-4" />
            <div className="flex flex-row justify-between mb-2">
              <p className="font-medium">Email</p>
              <p className="text-gray-400">name@example.com</p>
            </div>
            <hr className="border-t border-gray-200 my-4" />
            <div className="flex flex-row justify-between mb-2">
              <p className="font-medium">Phone</p>
              <p className="text-gray-400">+123 456 7890</p>
            </div>
            <hr className="border-t border-gray-200 my-4" />
            <div className="flex flex-row justify-between mb-2">
              <p className="font-medium">Address</p>
              <p className="text-gray-400">
                62 Miles Drive St, Newark, NJ 07103, California
              </p>
            </div>
          </div>
        </div>
        {/* User Table */}
        <div className="flex flex-wrap gap-6 p-6">
          <table className="min-w-full border-collapse border border-white-100">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left font-inter text-sm font-light text-[#6B7280]]">
                  ID
                </th>
                <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                  STATUS
                </th>
                <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                  DELIVERY STATUS
                </th>
                <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                  ROLE
                </th>
                <th className="py-3 px-6 text-left text-sm font-light text-gray-700">
                  CREATED
                </th>
                <th className="py-3 px-6 text-center text-sm font-medium text-gray-700"></th>
              </tr>
            </thead>
            {/* <tbody>
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 border-t">
                  <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 font-inter font-light text-sm text-gray-800">
                    {user.phone}
                  </td>
                  <td className="py-4 px-6 font-inter font-light text-sm">
                    <span
                      className={`px-2 py-1 rounded-full  font-inter font-light text-xs font-semibold text-white ${
                        roleColors[user.role] || "bg-gray-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-inter font-light text-gray-800">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center gap-2"> */}
            {/* Edit Icon */}
            {/* <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit User"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button> */}

            {/* Delete Icon */}
            {/* <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete User"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <Pagination page={1} pages={5} onPageChange={() => {}} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
