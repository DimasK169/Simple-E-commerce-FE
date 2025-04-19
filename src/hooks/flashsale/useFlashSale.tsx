import { getFlashSale } from "@/services/flashsale/get/api";
import { FlashSaleItem } from "@/services/flashsale/type";
import { useEffect, useState } from "react";

export const useFlashSale = (page: number, size: number = 10) => {
  const [data, setData] = useState<FlashSaleItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getFlashSale(page, size);
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err: any) {
        setError(err.message || "Failed to fetch flash sale data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size]);

  return { data, totalPages, loading, error };
};
