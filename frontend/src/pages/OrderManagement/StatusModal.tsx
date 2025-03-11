import React, { useState } from "react";

import { PaymentStatus, DeliveryStatus } from "./data";
import { ModalState, StatusModalProps } from "./interface";
import { editOrderStatus } from "../../api/api";
import "../../styles/orders.css";

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
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title mb-4">
              Edit Payment and Delivery Status
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="paymentStatus" className="status-form-label">
                  Payment Status:
                </label>
                <select
                  id="paymentStatus"
                  value={formState.paymentStatus}
                  onChange={(e) =>
                    handleSelectChange("paymentStatus", e.target.value)
                  }
                  className="status-form-select"
                >
                  {Object.values(PaymentStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="deliveryStatus" className="status-form-label">
                  Delivery Status:
                </label>
                <select
                  id="deliveryStatus"
                  value={formState.deliveryStatus}
                  onChange={(e) =>
                    handleSelectChange("deliveryStatus", e.target.value)
                  }
                  className="status-form-select"
                >
                  {Object.values(DeliveryStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="status-button-group">
                <button type="submit" className="save-button ">
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="cancel-button"
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
