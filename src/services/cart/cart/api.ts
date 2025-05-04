import productClient from "@/services/product/api";
import axiosWithConfig from "../api";
import { Product } from "@/services/product/type";

export const getCart = async () => {
  try {
    const response = await axiosWithConfig.get(`/cart`);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const createCart = async (
  quantity: number,
  fsCode: string | null,
  productCode: string | null
) => {
  try {
    const response = await axiosWithConfig.post(`/cart`, {
      Fs_Code: fsCode,
      Product_Code: productCode,
      Cart_Quantity: quantity,
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response.data.errors };
  }
};

export const updateCart = async (
  quantity: number | null,
  fsCode: string | null,
  productCode: string | null
) => {
  try {
    const response = await axiosWithConfig.put(`/cart`, {
      Fs_Code: fsCode,
      Product_Code: productCode,
      Cart_Quantity: quantity,
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response.data.errors };
  }
};

export const deleteCart = async (productCode: string | null) => {
  try {
    const response = await axiosWithConfig.delete(`/cart`, {
      data: {
        Product_Code: productCode,
      },
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response.data.errors };
  }
};
