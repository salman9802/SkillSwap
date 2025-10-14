import axios from "axios";
import { attahTokenInterceptors } from "./interceptors";

export const api = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URL,
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

attahTokenInterceptors(privateApi);
