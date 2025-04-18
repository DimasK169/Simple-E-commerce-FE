import React, { Suspense, useEffect, useState } from "react";
import FlashSale from "@/components/home/flashsale";
import ProductList from "@/components/home/productlist";
import { getProducts } from "@/services/product/list/api";
import { useSearchParams } from "react-router";

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page"));
  const productsPromise = getProducts(currentPage, 2);
  return (
    <div className="p-8">
      <Suspense fallback="loading">
        <FlashSale />
      </Suspense>
      <Suspense fallback="loading">
        <ProductList productsPromise={productsPromise} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
