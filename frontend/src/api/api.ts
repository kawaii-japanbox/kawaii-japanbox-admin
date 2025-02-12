import axios from "axios";
import {
  ICreateUserForm,
  IUpdateUserForm,
} from "../components/UserManagement/interface";
import { Role } from "../components/UserManagement/data";
import { IGetOrderForm } from "../components/OrderManagement/interface";

const API = axios.create({
  baseURL: `${process.env.RENDER_EXTERNAL_URL}/api`,
});
console.log("Base URL:", process.env.RENDER_EXTERNAL_URL);

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token:", token);
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
  console.log(email);
  console.log(password);
  console.log(rememberMe);
  const response = await axios.post(
    `${process.env.RENDER_EXTERNAL_URL}api/auth/login`,
    {
      email,
      password,
      rememberMe,
    }
  );
  console.log(response.data);
  return response.data;
};

export const getUsers = async (currentPage: number) => {
  const response = await API.get("/admin/users", {
    params: { page: currentPage },
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
  console.log("Created User:", response.data);
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
export default API;
