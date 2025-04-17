import axiosWithConfig from "../api";
import { Data } from "../type";

export const getProductList = async (page: number, size: number = 20) => {
  try {
    const response = await axiosWithConfig.get(
      `/product?page=${page}&size=${size}`
    );
    return response.data as Data;
  } catch (error) {
    console.error("awok", error);
  }
};
