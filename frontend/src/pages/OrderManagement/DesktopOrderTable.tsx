import { ArrowUpTrayIcon, PencilIcon } from "@heroicons/react/24/solid";
import { formatDate } from "../../utils/helpers";
import Spinner from "../../components/Spinner";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { DesktopCustomerTableProps } from "./interface";
import "../../styles/orders.css";

const DesktopOrderTable: React.FC<DesktopCustomerTableProps> = ({
  orders,
  sortBy,
  sortOrder,
  toggleSort,
  handleStatusModalOpen,
  handleOpenUploadModal,
}) => {
  return (
    <div className="desktop-table-container">
      <table className="desktop-table">
        <thead className="desktop-table-header">
          <tr>
            <th className="desktop-table-header-cell">ORDER ID</th>
            <th className="desktop-table-header-cell">
              NAME
              <button onClick={() => toggleSort("name")} className="ml-2">
                {sortBy === "name" ? (
                  sortOrder === "asc" ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )
                ) : (
                  <ArrowUpDown size={16} />
                )}
              </button>
            </th>
            <th className="desktop-table-header-cell">ORDER STATUS</th>
            <th className="desktop-table-header-cell">PAYMENT STATUS</th>
            <th className="desktop-table-header-cell">DELIVERY STATUS</th>
            <th className="desktop-table-header-cell">COMMENT</th>
            <th className="desktop-table-header-cell">
              CREATED
              <button onClick={() => toggleSort("createdAt")} className="ml-2">
                {sortBy === "createdAt" ? (
                  sortOrder === "asc" ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )
                ) : (
                  <ArrowUpDown size={16} />
                )}
              </button>
            </th>
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
                <td className="desktop-table-cell">{order.paymentStatus}</td>
                <td className="desktop-table-cell">{order.deliveryStatus}</td>
                <td className="desktop-table-cell">{order.reviewComment}</td>
                <td className="desktop-table-cell">
                  {formatDate(order.createdAt)}
                </td>
                <td className="py-4 px-6 text-center action-button">
                  {/* Edit Icon */}
                  <button
                    onClick={() => handleStatusModalOpen(order.id)}
                    className="edit-button"
                    title="Edit User"
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
    </div>
  );
};

export default DesktopOrderTable;
