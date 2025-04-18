import productClient from "../api";
import { Root } from "../type";

export const getProducts = async (page: number, size: number = 20) => {
  const response = await productClient.get<Root>(`/product`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
