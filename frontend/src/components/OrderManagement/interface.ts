export interface ModalOpenProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IOrderResponse {
  pages: number;
  total: number;
  orders: Order[];
}

export interface Order {
  name: string;
  status: string;
  id: string;
  paymentStatus: string;
  deliveryStatus: string;
  reviewComment: string | null;
  createdAt: string;
  user: {
    name: string | null;
  };
}
