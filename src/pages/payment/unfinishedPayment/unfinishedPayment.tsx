import React from "react";
import { useGetPayment } from "../../../hooks/payment/unfinishedPayment/useGetPayment";
import Card from "../../../components/card/card";

const UnfinishedPayment: React.FC = () => {
  const { payment } = useGetPayment();

  return <Card data={payment}></Card>;
};

export default UnfinishedPayment;
