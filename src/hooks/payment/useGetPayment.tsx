import { useEffect, useState } from "react";
import { PaymentData } from "../../services/payment/payment/type";
import {
  getFinishedPayment,
  getUnfinishedPayment,
} from "../../services/payment/payment/index";

export const useGetPayment = (status: "pending" | "finished") => {
  const [payment, setPayment] = useState<PaymentData[] | null>(null);

  const fetchPayment = async () => {
    try {
      const response =
        status === "pending"
          ? await getUnfinishedPayment()
          : await getFinishedPayment();

      setPayment(response?.data ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, [status]);

  return { payment };
};
