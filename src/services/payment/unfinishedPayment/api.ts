import axiosWithConfig from "../api";

export const getPayment = async () => {
  const paymentRequest = {
    status: "pending",
  };

  try {
    const response = await axiosWithConfig.get("/payment", {
      params: paymentRequest,
    });
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
