import axios from "axios";
import {
  ICreateUserForm,
  IUpdateUserForm,
} from "../components/UserManagement/interface";
import { Role } from "../components/UserManagement/data";

const API = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("token:", token);
  return config;
});

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  const response = await API.post("/auth/login", {
    email,
    password,
    rememberMe,
  });
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
export default API;
