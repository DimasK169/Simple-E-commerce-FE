import axios from "axios";

const axiosWithConfig = axios.create({
  baseURL: "http://localhost:8083",
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

export default axiosWithConfig;
