import { useEffect, useState } from "react";
import { getPayment } from "../../../services/payment/unfinishedPayment/api";

export const useGetPayment = () => {
  const [payment, setPayment] = useState();

  const fetchPayment = async () => {
    try {
      const response = await getPayment();
      setPayment(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  return { payment };
};
