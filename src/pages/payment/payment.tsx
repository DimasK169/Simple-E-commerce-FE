import React from "react";
import { useGetPayment } from "../../hooks/payment/useGetPayment";
import Card from "../../components/card/payment/cardPayment";

const Payment: React.FC = () => {
  const { payment } = useGetPayment();

  return <Card data={payment}></Card>;
};

export default Payment;
