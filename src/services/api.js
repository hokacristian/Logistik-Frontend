import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "https://api-logistik.vercel.app",
});

// Tambahkan interceptor untuk menyisipkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani error 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Hapus token jika tidak valid
      window.location.href = "/"; // Arahkan ke halaman landing
    }
    return Promise.reject(error);
  }
);

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const createItem = (data) => api.post("/items", data);
export const fetchItems = () => api.get("/items");
export const checkShipping = (data) => api.post("/items/check-shipping", data);

export default api;
