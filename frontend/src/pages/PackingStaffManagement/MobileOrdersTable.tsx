import Spinner from "../../components/Spinner";
import { formatDate } from "../../utils/helpers";
import { PackingOrder } from "./interface";
import { ArrowUpTrayIcon, PencilIcon } from "@heroicons/react/24/solid";

interface MobilePackingOrdersTableProps {
  orders: PackingOrder[] | null;
  handleEditOrder: (orderId: string) => void;
  handleUploadPhoto: (orderId: string) => void;
}

const MobilePackingOrdersTable: React.FC<MobilePackingOrdersTableProps> = ({
  orders,
  handleEditOrder,
  handleUploadPhoto,
}) => {
  return (
    <div className="mobile-card">
      {orders ? (
        orders.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No orders found.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="mobile-card-item">
              <table className="mobile-table">
                <tbody>
                  <tr className="mobile-table-row">
                    <td className="mobile-table-header">ORDER ID</td>
                    <td className="mobile-table-data">{order.id}</td>
                  </tr>
                  <tr className="mobile-table-row">
                    <td className="mobile-table-header">NAME</td>
                    <td className="mobile-table-data">{order.user?.name}</td>
                  </tr>
                  <tr className="mobile-table-row">
                    <td className="mobile-table-header">STATUS</td>
                    <td className="mobile-table-data">{order.status}</td>
                  </tr>
                  <tr className="mobile-table-row">
                    <td className="mobile-table-header">WAREHOUSE</td>
                    <td className="mobile-table-data">
                      {order.warehouse.name}
                    </td>
                  </tr>
                  <tr className="mobile-table-row">
                    <td className="mobile-table-header">LOCATION</td>
                    <td className="mobile-table-data">
                      {order.warehouse.location}
                    </td>
                  </tr>
                  <tr className="mobile-table-row">
                    <td className="mobile-table-header">CREATED</td>
                    <td className="mobile-table-data">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                  <tr className="mobile-table-row">
                    <td className="mobile-table-header">UPDATED</td>
                    <td className="mobile-table-data">
                      {formatDate(order.updatedAt)}
                    </td>
                  </tr>
                  <tr className="mobile-table-row">
                    <td className="mobile-table-header">ACTIONS</td>
                    <td className="mobile-table-data">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditOrder(order.id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit Order"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleUploadPhoto(order.id)}
                          className="text-green-500 hover:text-green-700"
                          title="Upload Photo"
                        >
                          <ArrowUpTrayIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        )
      ) : (
        <div className="text-center py-6">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default MobilePackingOrdersTable;
