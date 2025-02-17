export interface IGetCustomersResponse {
  id: string;
  email: string;
  phone: string;
  name: string;
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
  map: any;
  id: string;
  status: string;
  deliveryStatus: string;
  createdAt: string;
  items: {
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
  }[];
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
