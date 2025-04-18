import axiosWithConfig from "../api";

export const getPayment = async () => {
  try {
    const response = await axiosWithConfig.get(`/payment/finished`);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};
