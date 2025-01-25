import axios from "axios";
import { ICreateUserForm, IUpdateUserForm } from "../UserManagement/interface";
import { Role } from "../UserManagement/data";

const API = axios.create({
  baseURL: "http://localhost:8001/api",
});

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

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
  const response = await axios.get("http://localhost:8001/api/admin/users", {
    params: { page: currentPage },
    withCredentials: true, // Important for sending cookies (tokens)
  });
  console.log("status:", response.status);
  console.log("RESPONSE:", response);
  return response.data;
};

export const createUser = async (data: ICreateUserForm) => {
  const { email, password, name, role } = data;
  console.log(email);
  console.log(password);
  console.log(name);
  console.log(role);

  const response = await axios.post("http://localhost:8001/api/admin/users", {
    email,
    password,
    name,
    role: role as Role,
  });
  console.log("Created User:", response.data);
};

export const updateUser = async (data: IUpdateUserForm) => {
  await axios.put(
    `http://localhost:8001/api/admin/users/${data.id}`,
    data.data
  );
};

export const deleteUser = async (userId: string) => {
  await axios.delete(`http://localhost:8001/api/admin/users/${userId}`, {
    withCredentials: true,
  });
};
export default API;
