import React from "react";
import CardCart from "../../components/card/cardCart";
import { useGetCart } from "../../hooks/cart/useCartPayment";

const Cart: React.FC = () => {
  const { cart } = useGetCart();

  return <CardCart data={cart}></CardCart>;
};

export default Cart;
