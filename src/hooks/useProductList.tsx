import { useEffect, useState } from "react";
import { getProductList } from "@/services/product/list/api"; // adjust this import path
import { Content, Pageable } from "@/services/product/type"; // adjust if needed

export const useProductList = () => {
  const [products, setProducts] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<Pageable>({
    pageNumber: 0,
    pageSize: 20,
    offset: 0,
    paged: true,
    unpaged: false,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductList(
        pagination.pageNumber,
        pagination.pageSize || 20
      );
      setProducts(data.content);

      // Update pagination info from response
      setPagination((prev) => ({
        ...prev,
        pageNumber: data.pageable.pageNumber,
        pageSize: data.pageable.pageSize,
        offset: data.pageable.offset,
      }));
    } catch (err: any) {
      setError(err.message || "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.pageNumber]);

  return {
    products,
    loading,
    error,
    pagination,
    setPagination,
  };
};
