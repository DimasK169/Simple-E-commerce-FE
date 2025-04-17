import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function FlashSaleCard({ data }) {
  return (
    <Card className="min-w-[250px] shadow-md">
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{data.FlashSale_Product}</h3>
        <p className="text-sm line-through text-gray-400">
          ${(data.FlashSale_Price / (1 - data.FlashSale_Discount)).toFixed(2)}
        </p>
        <p className="text-xl font-bold text-red-600">
          ${data.FlashSale_Price}
        </p>
      </CardContent>
    </Card>
  );
}
