import { PencilIcon, TrashIcon } from "lucide-react";
import { formatDate } from "../../utils/helpers";
import { UserTableProps } from "./interface";

const MobileUserTable: React.FC<UserTableProps> = ({
  users,
  roleColors,
  handleDelete,
  handleEditUser,
}) => {
  return (
    <div className="mobile-card">
      {users?.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No users found.</div>
      ) : (
        users?.map((user) => (
          <div key={user.id} className="mobile-card-item">
            <table className="mobile-table">
              <tbody>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">NAME</td>
                  <td className="mobile-table-data">{user.name}</td>
                </tr>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">EMAIL</td>
                  <td className="mobile-table-data">{user.email}</td>
                </tr>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">PHONE</td>
                  <td className="mobile-table-data">{user.phone}</td>
                </tr>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">ROLE</td>
                  <td className="mobile-table-data">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        roleColors[user.role] || "bg-gray-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">CREATED</td>
                  <td className="mobile-table-data">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
                <tr className="mobile-table-row">
                  <td className="mobile-table-header">ACTIONS</td>
                  <td className="mobile-table-data">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit User"
                      >
                        <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete User"
                      >
                        <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default MobileUserTable;
