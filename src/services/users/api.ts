import axios from "axios";
import { ApiResponse } from "./type";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

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
  const response = await axiosWithConfig.get<ApiResponse>(`/users/getMe`, {});
  return response.data;
};

axiosWithConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:8082/users/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosWithConfig(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosWithConfig;
