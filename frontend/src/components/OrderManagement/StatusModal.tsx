import React, { useState } from "react";

import { PaymentStatus, DeliveryStatus } from "./data";
import { ModalState, StatusModalProps } from "./interface";
import { editOrderStatus } from "../../api/api";

const StatusModal: React.FC<StatusModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  orderId,
  fetchOrders,
}) => {
  const [formState, setFormState] = useState<ModalState>({
    paymentStatus: PaymentStatus.PENDING,
    deliveryStatus: DeliveryStatus.PENDING,
  });

  const closeModal = () => setIsModalOpen(false);

  const handleSelectChange = (field: keyof ModalState, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value as any,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editOrderStatus(
        orderId,
        formState.paymentStatus,
        formState.deliveryStatus
      );
      await fetchOrders();
    } catch (error) {
      console.log("Error in update order status:", error);
    }
    closeModal();
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Edit Payment and Delivery Status
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="paymentStatus" className="block text-gray-700">
                  Payment Status:
                </label>
                <select
                  id="paymentStatus"
                  value={formState.paymentStatus}
                  onChange={(e) =>
                    handleSelectChange("paymentStatus", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                >
                  {Object.values(PaymentStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="deliveryStatus" className="block text-gray-700">
                  Delivery Status:
                </label>
                <select
                  id="deliveryStatus"
                  value={formState.deliveryStatus}
                  onChange={(e) =>
                    handleSelectChange("deliveryStatus", e.target.value)
                  }
                  className="w-full p-2 border rounded-md"
                >
                  {Object.values(DeliveryStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-black py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusModal;
