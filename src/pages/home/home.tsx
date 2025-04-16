import React from "react";
import ProductCard from "@/component/productCard/productCard";
// import ProductForm from "@/component/productForm/productForm";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 p-20">
      <div className="flex-1">
        {/* <ProductForm
          mode="add" // or "edit"
          onSubmit={(data) => {
            console.log("Submitted data:", data);
            // Add your logic to handle the submitted product here
          }}
        /> */}
        <ProductCard
          image="https://via.placeholder.com/300"
          name="Cool Product"
          price={49.99}
          discount={true}
          stock={12}
          status="available"
          isAdmin={true}
        />
      </div>
    </div>
  );
};

export default Home;
