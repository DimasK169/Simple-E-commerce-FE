import React from "react";
import CardCart from "../../components/card/cart/cardCart";
import { useGetCart } from "../../hooks/cart/useCartPayment";

const Cart: React.FC = () => {
  const { cart, refetch } = useGetCart();

  return <CardCart data={cart} refetch={refetch}></CardCart>;
};

export default Cart;
