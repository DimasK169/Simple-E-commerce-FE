import FlashSale from "@/components/home/flashsale";
import ProductList from "@/components/home/productlist";
import React, { Suspense } from "react";

const ProductsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <Suspense fallback="loading">
        <FlashSale />
      </Suspense>
      <Suspense fallback="loading">
        <ProductList />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
