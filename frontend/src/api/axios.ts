import axios from "axios";
import { queryClient } from "../lib/queryClient";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      queryClient.cancelQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], null);
    }

    return Promise.reject(error);
  },
);
