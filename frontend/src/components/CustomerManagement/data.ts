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
