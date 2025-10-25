import axios from "axios";
import { attahTokenInterceptors } from "./interceptors";

const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_ADMIN_API_URL
  : "http://localhost";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

attahTokenInterceptors(privateApi);
