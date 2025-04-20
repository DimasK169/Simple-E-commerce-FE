import { fetchAndShowFlashSale } from "@/services/flashsale/flashsale/api";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { LuShoppingCart } from "react-icons/lu";
import { useAuth } from "@/context/authContext";
import dayjs from "dayjs";
import { FlashSaleItem } from "@/services/flashsale/type";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function FlashSale() {
  const { auth } = useAuth();
  const [products, setProducts] = useState<FlashSaleItem[]>([]);
  const [timeLeft, setTimeLeft] = useState("");

  const getFlashSaleProducts = async () => {
    try {
      const result = await fetchAndShowFlashSale();
      setProducts(result.data);

      // Calculate countdown only if products are present
      if (result.data.length > 0) {
        const end = dayjs(result.data[0].FlashSale_EndDate);
        updateCountdown(end);
      }
    } catch (error) {
      console.error("Failed to fetch flash sale products:", error);
    }
  };

  const updateCountdown = (endDate: dayjs.Dayjs) => {
    const now = dayjs();
    const diff = endDate.diff(now);
    if (diff <= 0) {
      setTimeLeft("00:00:00");
    } else {
      const dur = dayjs.duration(diff);
      const formatted = [
        dur.hours().toString().padStart(2, "0"),
        dur.minutes().toString().padStart(2, "0"),
        dur.seconds().toString().padStart(2, "0"),
      ].join(":");
      setTimeLeft(formatted);
    }
  };

  useEffect(() => {
    getFlashSaleProducts();

    const fetchInterval = setInterval(() => {
      getFlashSaleProducts();
    }, 60000); // refresh products every 60s

    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const end = dayjs(products[0].FlashSale_EndDate);

    const countdownInterval = setInterval(() => {
      updateCountdown(end);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [products]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Flash Sale</h1>
        {timeLeft && (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-mono">
            ⏳ {timeLeft}
          </span>
        )}
      </div>

      <div className="flex gap-4 overflow-x-scroll w-full">
        {products.map((product) => (
          <Card
            key={product.Product_Code}
            className="w-80 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Sale badge */}
            <div className="relative">
              <img
                src={product.Product_Image}
                alt={product.FlashSale_Product}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-red-500 text-white font-bold">
                {product.FlashSale_Discount * 100}% OFF
              </Badge>
            </div>

            <CardHeader>
              <h3 className="font-semibold text-lg">
                {product.FlashSale_Product}
              </h3>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-600">
                  Rp {product.FlashSale_Price.toLocaleString("id-ID")}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  Rp {product.Product_Price.toLocaleString("id-ID")}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Berakhir pada{" "}
                {dayjs(product.FlashSale_EndDate).format("DD-MM-YYYY HH:mm:ss")}
              </p>
            </CardContent>

            <CardFooter className="pt-0">
              {auth?.User_Role === "Customer" && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <LuShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
