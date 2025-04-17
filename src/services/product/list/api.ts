import axiosWithConfig from "../api";
import { Root } from "../type";

export const getProductList = async (
  page: number,
  size: number = 20
): Promise<Root | undefined> => {
  try {
    const response = await axiosWithConfig.get(
      `/product?page=${page}&size=${size}`
    );
    return response.data as Root;
  } catch (error) {
    console.error("Error fetching product list:", error);
    return undefined;
  }
};
