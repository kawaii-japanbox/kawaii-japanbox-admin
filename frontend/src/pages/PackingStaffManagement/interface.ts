export interface IGetPackingOrder {
  page: number;
  limit: number;
  pages: number;
  orders: PackingOrder[];
}

export interface PackingOrder {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
  };
  warehouse: {
    id: string;
    name: string;
    location: string;
  };
}
