import axios from "axios";

const productClient = axios.create({
  baseURL: "http://localhost:8080",
});

productClient.interceptors.request.use(
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

export default productClient;
