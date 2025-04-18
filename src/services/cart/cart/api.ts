import axiosWithConfig from "../api";

export const getCart = async () => {
  try {
    const response = await axiosWithConfig.get(`/cart`);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const updateCart = async (
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
