import React from "react";
import { useGetPayment } from "../../../hooks/payment/useGetPayment";
import Card from "../../../components/card/card";

const Payment: React.FC = () => {
  const { payment } = useGetPayment("finished");

  return <Card data={payment}></Card>;
};

export default Payment;
