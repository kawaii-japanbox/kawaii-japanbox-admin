import React, { useState } from "react";

// Enums for Payment and Delivery Status
import { PaymentStatus, DeliveryStatus } from "./data";
import { ModalOpenProps } from "./interface";

// Define type for the modal form state
type ModalState = {
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
};

const StatusModal: React.FC<ModalOpenProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [formState, setFormState] = useState<ModalState>({
    paymentStatus: PaymentStatus.PENDING,
    deliveryStatus: DeliveryStatus.PENDING,
  });

  // Handle modal open/close
  const closeModal = () => setIsModalOpen(false);

  // Handle form field changes
  const handleSelectChange = (field: keyof ModalState, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value as any,
    }));
  };

  // Submit the form (for demonstration)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState); // Handle the form submission logic
    closeModal();
  };

  return (
    <>
      {/* Modal */}
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
