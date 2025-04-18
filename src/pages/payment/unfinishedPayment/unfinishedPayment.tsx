import React from "react";
import Card from "../../../components/card/card";
import { useGetPayment } from "../../../hooks/payment/useGetPayment";

const UnfinishedPayment: React.FC = () => {
  const { payment } = useGetPayment("pending");

  return <Card data={payment}></Card>;
};

export default UnfinishedPayment;
