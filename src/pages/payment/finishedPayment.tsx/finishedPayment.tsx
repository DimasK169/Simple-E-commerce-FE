import React from "react";
import { useGetPayment } from "../../../hooks/payment/useGetPayment";
import Card from "../../../components/card/payment/cardPayment";

const FinishedPayment: React.FC = () => {
  const { payment } = useGetPayment("finished");

  return <Card data={payment}></Card>;
};

export default FinishedPayment;
