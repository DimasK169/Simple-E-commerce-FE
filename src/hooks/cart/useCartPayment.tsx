import { useEffect, useState } from "react";
import { getCart } from "../../services/cart/cart/index";
import { CartResponse } from "../../services/cart/cart/type";

export const useGetCart = () => {
  const [cart, setCart] = useState<CartResponse[] | null>(null);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cart };
};
