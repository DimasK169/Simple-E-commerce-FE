import FlashSale from "@/components/home/flashsale";
import ProductList from "@/components/home/productlist";
import React, { Suspense } from "react";

const ProductsPage: React.FC = () => {
  return (
    <div className="p-8">
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
