export interface IGetCustomersResponse {
  id: string;
  email: string;
  phone: string;
  name: string;
  source: string;
  createdAt: string;
}

export interface IGetCustomersRequest {
  search: string;
  page: number;
}

export interface IGetCustomerDetailsResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  createdAt: string;
}

interface Address {
  region: string;
  country: string;
  postcode: string;
  street: string;
}

export interface IGetCustomerOrdersResponse {
  id: string;
  status: string;
  deliveryStatus: string;
  createdAt: string;
  items: OrderItem[];
  orderTags: OrderTag[];
  note: string;
}

export interface IGetOrderAnalytics {
  ordersMadeCount: number;
  ordersMadePercentage: number;
  ordersInProgressCount: number;
  ordersInProgressPercentage: number;
  favoriteProductsCount: number;
  favoriteProductsPercentage: number;
  orderedProductsCount: number;
  orderedProductsPercentage: number;
}

export interface CustomersTableProps {
  customers: IGetCustomersResponse[] | null;
  loading: boolean;
}

export interface CustomerOrderAnalyticsProps {
  analytics: IGetOrderAnalytics | null;
}

export interface CustomerDetailsProps {
  customerDetails: IGetCustomerDetailsResponse | null;
}

export interface CustomerOrdersTableProps {
  customerOrders: IGetCustomerOrdersResponse[] | null;
}

export interface OrderItem {
  id: string;
  product: {
    name: string;
  };
  quantity: number;
  price: number;
  currency: string;
  deliveryCost: number;
  status: string;
  createdAt: string;
  note?: string;
  orderTags: string;
}

export interface OrderTagsProps {
  orderId: string;
  orderTags: OrderTag[];
  onTagsUpdate: (updatedTags: OrderTag[]) => void;
}

export interface OrderTag {
  id: string;
  tag: { name: string; id: string };
}
