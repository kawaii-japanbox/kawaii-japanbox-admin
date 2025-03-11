import { DeliveryStatus, PaymentStatus } from "./data";

export interface StatusModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: string;
  fetchOrders: () => Promise<void>;
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

export interface IGetOrderForm {
  filter: string;
  search: string;
  sortBy: string;
  sortOrder: string;
  page: number;
}

export interface PhotoUploadModalProps {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: string;
}

export type ModalState = {
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
};

export interface IUploadPhotoRequest {
  orderId: string;
  formData: FormData;
}

export interface IUploadPhotoResponse {
  count: number;
  images: Image[];
  message: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface IDeleteOrderImageRequest {
  imageId: string;
  url: string;
}

export interface IGetOrdersAnalytics {
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  totalDelivery: number;
}

export interface DesktopCustomerTableProps {
  sortBy: string;
  sortOrder: string;
  handleStatusModalOpen: (orderId: string) => void;
  handleOpenUploadModal: (orderId: string) => void;
  toggleSort: (item: string) => void;
  orders: Order[] | null;
}
