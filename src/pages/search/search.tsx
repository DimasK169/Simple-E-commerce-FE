import ProductListSearch from "@/components/search/productsearchlist";
import React, { Suspense } from "react";

const ProductSearch: React.FC = () => {
  return (
    <div className="p-8">
      <Suspense fallback="loading">
        <ProductListSearch />
      </Suspense>
    </div>
  );
};

export default ProductSearch;
