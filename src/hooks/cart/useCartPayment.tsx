import { useEffect, useState } from "react";
import { getCart } from "../../services/cart/cart/index";
import { CartItem } from "../../services/cart/cart/type";

export const useGetCart = () => {
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [order, setOrder] = useState<string[] | null>(null);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      const newData = response?.data;

      // Jika urutan belum diset, simpan urutan awal berdasarkan Product_Code
      if (!order && newData) {
        const productOrder = newData
          .slice(0, -1)
          .map((item: CartItem) => item.Product_Code || "");
        setOrder(productOrder);
      }

      // Jika sudah ada order, susun ulang item sesuai urutan awal
      if (order && newData) {
        const items = newData.slice(0, -1);
        const total = newData[newData.length - 1];

        const orderedItems = order
          .map((code) =>
            items.find((item: CartItem) => item.Product_Code === code)
          )
          .filter(Boolean) as CartItem[];

        setCart([...orderedItems, total]);
      } else {
        setCart(newData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cart, refetch: fetchCart };
};
