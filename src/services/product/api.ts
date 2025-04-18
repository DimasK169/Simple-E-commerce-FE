import axios from "axios";

const productClient = axios.create({
  baseURL: "http://localhost:8080",
});

export default productClient;
