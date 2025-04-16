import React from "react";
import CardProduct from "../component/card/cardProduct";
import ProductForm from "../component/productForm/productForm";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 p-20">
      <div className="flex-1">
        <ProductForm
          mode="add" // or "edit"
          onSubmit={(data) => {
            console.log("Submitted data:", data);
            // Add your logic to handle the submitted product here
          }}
        />
        <CardProduct
          title="Farming Gaming"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        />
      </div>
    </div>
  );
};

export default Home;
