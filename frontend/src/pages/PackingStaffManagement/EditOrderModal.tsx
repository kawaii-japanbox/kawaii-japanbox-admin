import { OrderStatus, OrderStatusDisplayNames } from "./data";
import React, { useState } from "react";
import "../../styles/orders.css";
import { editOrder } from "../../api/api";

interface EditOrderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: string;
  fetchOrders: () => Promise<void>;
}

interface ModalState {
  status: OrderStatus.BASKET;
}

const EditOrderModal: React.FC<EditOrderModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  orderId,
  fetchOrders,
}) => {
  const [formState, setFormState] = useState<ModalState>({
    status: OrderStatus.BASKET,
  });

  const closeModal = () => setIsModalOpen(false);

  const handleSelectChange = (field: keyof ModalState, value: string) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [field]: value as any,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editOrder(orderId, formState.status);
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
            <h2 className="modal-title mb-4">Edit Order Status</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="paymentStatus" className="status-form-label">
                  Status:
                </label>
                <select
                  id="status"
                  value={formState.status}
                  onChange={(e) => handleSelectChange("status", e.target.value)}
                  className="status-form-select"
                >
                  {Object.values(OrderStatus)
                    .filter((status) => typeof status === "string")
                    .map((status) => (
                      <option key={status} value={status}>
                        {OrderStatusDisplayNames[status]}
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

export default EditOrderModal;
