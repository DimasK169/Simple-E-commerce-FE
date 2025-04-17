import React, { useEffect, useState } from "react";
import { getProductList } from "@/services/product/list/api"; // Adjust path as needed
import ProductCard from "@/components/productCard/productCard";
import { Content } from "@/services/product/type"; // Assuming this is where your product type is

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductList(0, 20);
        if (data) setProducts(data.content);
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">🛍️ All Products</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item, index) => (
          <ProductCard
            key={index}
            image={item.productImage}
            name={item.productName}
            price={item.productPrice}
            stock={item.productStock}
            status={item.productIsAvailable ? "available" : "na"}
            isAdmin={false}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
