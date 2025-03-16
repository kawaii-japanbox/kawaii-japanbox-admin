import { IGetCustomersRequest } from "../pages/CustomerManagement/interface";
import {
  IResetPasswordRequest,
  IVerifyCodeRequest,
} from "../pages/LoginManagement/interface";
import { DeliveryStatus, PaymentStatus } from "../pages/OrderManagement/data";
import {
  IDeleteOrderImageRequest,
  IGetOrderForm,
  IUploadPhotoRequest,
  IUploadPhotoResponse,
} from "../pages/OrderManagement/interface";
import { Role } from "../pages/UserManagement/data";
import {
  ICreateUserForm,
  IUpdateUserForm,
} from "../pages/UserManagement/interface";
import axios from "axios";

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
    `/admin/login`,
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
  const { filter, search, sortBy, sortOrder, page } = data;
  const response = await API.get("/admin/orders", {
    params: {
      status: filter !== "All" ? filter : undefined,
      search: search || undefined,
      sortBy,
      sortOrder,
      page,
    },
  });
  return response.data;
};

export const uploadFiles = async (
  data: IUploadPhotoRequest
): Promise<IUploadPhotoResponse> => {
  const { orderId, formData } = data;
  const response = await API.post(`/admin/order-images/${orderId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteUploadedFile = async (data: IDeleteOrderImageRequest) => {
  const { imageId, url } = data;
  const response = await API.delete(`/admin/order-images/${imageId}`, {
    params: { url },
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

export const forgotPassword = async (email: string) => {
  const response = await API.post("/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const verifyOtp = async (data: IVerifyCodeRequest) => {
  const { email, otp, action } = data;
  const response = await API.post("/auth/verify-otp", {
    email,
    otp,
    action,
  });
  return response.data;
};

export const resetPassword = async (data: IResetPasswordRequest) => {
  const { email, newPassword } = data;
  const response = await API.post("/auth/reset-password", {
    email,
    newPassword,
  });
  return response.data;
};

export const getOrdersAnalytics = async (filter: string) => {
  const response = await API.get("/admin/orders/analytics", {
    params: { filter },
  });
  return response.data;
};

export const createOrderTag = async (orderId: string, tagName: string) => {
  try {
    const response = await API.post(`/admin/orders/${orderId}/tags`, {
      tagName,
    });
    return response.data.tag;
  } catch (error) {
    console.error("Error creating order tag:", error);
    throw error;
  }
};

export const removeOrderTag = async (orderId: string, tagId: string) => {
  try {
    const response = await API.delete(`/admin/orders/${orderId}/tags`, {
      params: { tagId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing order tag:", error);
    throw error;
  }
};

export const updateOrderNote = async (orderId: string, note: string) => {
  try {
    const response = await API.put(`/admin/orders/${orderId}/note`, { note });
    return response.data;
  } catch (error) {
    console.error("Error updating order note:", error);
    throw error;
  }
};

export default API;
