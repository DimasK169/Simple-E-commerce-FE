import ProductCard from "@/components/productCard/productCard";
import ProductForm from "@/components/productForm/productForm";
import React from "react";

const EditProduct: React.FC = () => {
  return (
    //Buat di pages home ada 2 sesi
    //sesi 1 flash-sale get dari flash sale otomatis discount true
    //sesi 2 get dari product otomatis discount false
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
