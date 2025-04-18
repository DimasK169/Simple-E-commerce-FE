import axios from "axios";

const axiosWithConfig = axios.create({
  baseURL: "http://localhost:8084",
});

axiosWithConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosWithConfig;
