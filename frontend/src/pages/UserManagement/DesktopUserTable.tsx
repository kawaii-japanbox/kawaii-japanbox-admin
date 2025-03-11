import { PencilIcon, TrashIcon } from "lucide-react";
import { formatDate } from "../../utils/helpers";
import { UserTableProps } from "./interface";
import "../../styles/users.css";

const DesktopUserTable: React.FC<UserTableProps> = ({
  users,
  roleColors,
  handleEditUser,
  handleDelete,
}) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="bg-gray-100">
          <tr>
            <th className="table-header-cell">NAME</th>
            <th className="table-header-cell">EMAIL</th>
            <th className="table-header-cell">PHONE</th>
            <th className="table-header-cell">ROLE</th>
            <th className="table-header-cell">CREATED</th>
            <th className="table-header-cell"></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="table-row">
              <td className="table-cell">{user.name}</td>
              <td className="table-cell">{user.email}</td>
              <td className="table-cell">{user.phone}</td>
              <td className="table-cell">
                <span
                  className={`role-badge ${
                    roleColors[user.role] || "bg-gray-500"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="table-cell">{formatDate(user.createdAt)}</td>
              <td className="table-cell">
                <button
                  onClick={() => handleEditUser(user)}
                  className="edit-button"
                  title="Edit User"
                >
                  <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="users-delete-button"
                  title="Delete User"
                >
                  <TrashIcon className="users-delete-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopUserTable;
