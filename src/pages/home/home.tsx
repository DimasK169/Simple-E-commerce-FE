import React, { Suspense, useEffect, useState } from "react";
import FlashSale from "@/components/home/flashsale";

const ProductsPage: React.FC = () => {
  return (
    <div className="p-8">
      <Suspense fallback="loading">
        <FlashSale />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
