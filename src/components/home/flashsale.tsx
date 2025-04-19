import { getFlashSale } from "@/services/flashsale/flashsale/api";
import { use } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { LuShoppingCart } from "react-icons/lu";
import { useAuth } from "@/context/authContext";
import dayjs from "dayjs";

const productsPromise = getFlashSale(0, 15);
export default function FlashSale() {
  const { auth } = useAuth();
  const result = use(productsPromise);

  return (
    <div>
      <h1>Flash Sale</h1>
      <div className="flex gap-4 overflow-x-scroll w-full ">
        {result.data.content.map((product) => (
          <Card className="w-80 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                Flash sale selesai pada{" "}
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
