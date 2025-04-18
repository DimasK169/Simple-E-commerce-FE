import { getFlashSale } from "@/services/flashsale/get/api";
import React, { use } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const productsPromise = getFlashSale(0, 15);
export default function FlashSale() {
  const result = use(productsPromise);

  return (
    <div>
      <h1>Flash Sale</h1>
      <div className="flex gap-4 overflow-x-scroll w-full ">
        {result.data.content.map((product) => (
          <Card
            className="shrink-0 w-80 rounded-2xl shadow-md overflow-hidden"
            key={product.FlashSale_Name}
          >
            <img
              src={product.Product_Image}
              alt={product.FlashSale_Product}
              className="w-full h-48 object-cover"
            />

            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {product.FlashSale_Product}
                </h2>
                {product.FlashSale_Discount * 100 && (
                  <Badge variant="destructive">Discount</Badge>
                )}
              </div>

              <p className="text-xl font-bold text-green-600">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(product.FlashSale_Price)}
              </p>

              {/* {isAdmin && (
              <div className="space-y-1">
                <Badge
                  variant={status === "available" ? "default" : "secondary"}
                >
                  {status === "available" ? "Available" : "N/A"}
                </Badge>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-3">
              {!isAdmin && (
                <Button className="flex-1" onClick={() => {}}>
                  Add to Cart
                </Button>
              )}
              {isAdmin && (
                <>
                  <Button variant="outline" onClick={() => {}}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => {}}>
                    Delete
                  </Button>
                </>
              )}
            </div> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
