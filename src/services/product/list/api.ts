import productClient from "../api";
import { Product, Root } from "../type";

export const getProducts = async (
  page: number,
  size: number = 20,
  role: string = "Customer"
) => {
  const endpoint =
    role === "Admin" ? "/product/getForAdmin" : "/product/getForCustomer";
  const response = await productClient.get<Root>(endpoint, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

export const getProductsDetail = async (code: string) => {
  const response = await productClient.get<Product>(`/product/${code}`);
  return response.data;
};

export const searchProduct = async (
  keyword: string,
  page: number,
  size: number
) => {
  const response = await productClient.get<Root>(`/product/search`, {
    params: {
      keyword,
      page,
      size,
    },
  });
  return response.data;
};

export const searchProductAdmin = async (
  keyword: string,
  page: number,
  size: number
) => {
  const response = await productClient.get<Root>(`/product/searchAdmin`, {
    params: {
      keyword,
      page,
      size,
    },
  });
  return response.data;
};

export const deleteProduct = async (code: string) => {
  const response = await productClient.delete<Product>(`/product/${code}`);
  return response.data;
};
