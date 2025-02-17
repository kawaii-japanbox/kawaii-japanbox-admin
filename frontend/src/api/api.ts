import axios from "axios";
import {
  ICreateUserForm,
  IUpdateUserForm,
} from "../components/UserManagement/interface";
import { Role } from "../components/UserManagement/data";
import { IGetOrderForm } from "../components/OrderManagement/interface";
import {
  DeliveryStatus,
  PaymentStatus,
} from "../components/OrderManagement/data";
import { IGetCustomersRequest } from "../components/CustomerManagement/data";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  const response = await API.post(
    `/auth/login`,
    {
      email,
      password,
      rememberMe,
    },
    { withCredentials: true }
  );
  return response.data;
};

export const getUsers = async (currentPage: number) => {
  const response = await API.get("/admin/users", {
    params: { page: currentPage },
    withCredentials: true,
  });
  return response.data;
};

export const getCustomers = async (data: IGetCustomersRequest) => {
  const { page, search } = data;
  const response = await API.get("/admin/customers", {
    params: { page, search: search || undefined },
    withCredentials: true,
  });
  return response.data;
};

export const createUser = async (data: ICreateUserForm) => {
  const { email, password, name, role } = data;
  const response = await API.post("/admin/users", {
    email,
    password,
    name,
    role: role as Role,
  });
};

export const updateUser = async (data: IUpdateUserForm) => {
  await API.put(`/admin/users/${data.id}`, data.data);
};

export const deleteUser = async (userId: string) => {
  await API.delete(`/admin/users/${userId}`, {
    withCredentials: true,
  });
};

export const getOrders = async (data: IGetOrderForm) => {
  const { filter, search, sortBy, sortOrder } = data;
  const response = await API.get("/admin/orders", {
    params: {
      status: filter !== "All" ? filter : undefined,
      search: search || undefined,
      sortBy,
      sortOrder,
    },
  });
  return response.data;
};

export const uploadFiles = async (orderId: string, formData: FormData) => {
  const response = await API.post(`/admin/order/upload/${orderId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const editOrderStatus = async (
  orderId: string,
  paymentStatus: PaymentStatus,
  deliveryStatus: DeliveryStatus
) => {
  const response = await API.put(`/admin/order/status/${orderId}`, {
    paymentStatus,
    deliveryStatus,
  });
};

export const getCustomerDetails = async (customerId: string) => {
  const response = await API.get(`/admin/customers/${customerId}`);
  return response.data;
};

export const getCustomerOrders = async (customerId: string, page: number) => {
  const response = await API.get(`/admin/customers/${customerId}/orders`, {
    params: { page },
  });
  return response.data;
};

export const getCustomerOrderAnalytics = async (customerId: string) => {
  const response = await API.get(`/admin/customers/${customerId}/analytics`);
  return response.data;
};
export default API;
