import axios from "axios";
import { queryClient } from "./queryClient";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8001/api"
      : "api",
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
    }

    return Promise.reject(error);
  },
);
