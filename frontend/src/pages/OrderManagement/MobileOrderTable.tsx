import { formatDate } from "../../utils/helpers";
import Spinner from "../../components/Spinner";
import { PencilIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Order } from "./interface";

const MobileOrderTable: React.FC<{
  orders: Order[] | null;
  loading: boolean;
  handleStatusModalOpen: (id: string) => void;
  handleOpenUploadModal: (id: string) => void;
}> = ({ orders, loading, handleStatusModalOpen, handleOpenUploadModal }) => {
  return (
    <div className="mobile-card">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner />
        </div>
      ) : orders?.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No orders found.</div>
      ) : (
        orders?.map((order) => (
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
                  <td className="mobile-table-header">ORDER STATUS</td>
                  <td className="mobile-table-data">{order.status}</td>
                </tr>

                <tr className="mobile-table-row">
                  <td className="mobile-table-header">PAYMENT STATUS</td>
                  <td className="mobile-table-data">{order.paymentStatus}</td>
                </tr>

                <tr className="mobile-table-row">
                  <td className="mobile-table-header">DELIVERY STATUS</td>
                  <td className="mobile-table-data">{order.deliveryStatus}</td>
                </tr>

                <tr className="mobile-table-row">
                  <td className="mobile-table-header">COMMENT</td>
                  <td className="mobile-table-data">{order.reviewComment}</td>
                </tr>

                <tr className="mobile-table-row">
                  <td className="mobile-table-header">CREATED</td>
                  <td className="mobile-table-data">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>

                <tr className="mobile-table-row">
                  <td className="mobile-table-header">ACTIONS</td>
                  <td className="mobile-table-data">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusModalOpen(order.id)}
                        className="edit-button"
                        title="Edit Order"
                      >
                        <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={() => handleOpenUploadModal(order.id)}
                        className="upload-button"
                        title="Upload Photo"
                      >
                        <ArrowUpTrayIcon className="h-4 w-4 sm:h-6 sm:w-6" />
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

export default MobileOrderTable;
