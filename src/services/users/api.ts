import axios from "axios";
import { ApiResponse } from "./type";

const axiosWithConfig = axios.create({
  baseURL: "http://localhost:8082/",
});

axiosWithConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getMe = async () => {
  const response = await axiosWithConfig.get<ApiResponse>(`/users/me`, {});
  return response.data;
};

export default axiosWithConfig;
