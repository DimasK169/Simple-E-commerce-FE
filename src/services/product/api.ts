import axios from "axios";

const productClient = axios.create({
  baseURL: "http://localhost:8081",
});

export default productClient;
