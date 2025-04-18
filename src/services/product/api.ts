import axios from "axios";

const axiosWithConfig = axios.create({
  baseURL: "http://localhost:8080",
});

export default axiosWithConfig;
