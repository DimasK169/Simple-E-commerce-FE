import axiosWithConfig from "../api";

export const createPayment = async () => {
  try {
    const response = await axiosWithConfig.post(`/payment/create`, {
      Payment_Type: "gopay",
    });

    return { success: true, message: response.data.message };
  } catch (error: any) {
    console.error("Payment error:", error);
    return {
      success: false,
      message: error.response?.data?.errors || "Payment Gagal",
    };
  }
};

export const getFinishedPayment = async () => {
  try {
    const response = await axiosWithConfig.get(`/payment/finished`);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const getUnfinishedPayment = async () => {
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
