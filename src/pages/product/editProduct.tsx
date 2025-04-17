import ProductCard from "@/components/productCard/productCard";
import ProductForm from "@/components/productForm/productForm";
import React from "react";

const EditProduct: React.FC = () => {
  return (

    <ProductCard
      image="https://via.placeholder.com/300"
      name="Cool Product"
      price={100000}
      discount={true}
      stock={12}
      status="available"
      isAdmin={false}
    />
  );
};

export default EditProduct;
