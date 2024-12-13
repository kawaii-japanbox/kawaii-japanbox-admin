import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8001/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
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
  const response = await API.post("/auth/login", {
    email,
    password,
    rememberMe,
  });
  return response.data;
};

export default API;
