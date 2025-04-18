import axios from "axios";

const flashSaleClient = axios.create({
  baseURL: "http://localhost:8085",
});

export default flashSaleClient;
