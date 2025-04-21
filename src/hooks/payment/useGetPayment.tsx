import { useEffect, useState } from "react";
import { PaymentData } from "../../services/payment/payment/type";
import { getFinishedPayment } from "../../services/payment/payment/index";

export const useGetPayment = () => {
  const [payment, setPayment] = useState<PaymentData[] | null>(null);

  const fetchPayment = async () => {
    try {
      const response = await getFinishedPayment();

      setPayment(response?.data ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  return { payment };
};
