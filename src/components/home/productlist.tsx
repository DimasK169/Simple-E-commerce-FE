import { useState, useEffect } from "react";
import { deleteProduct, getProducts } from "@/services/product/list/api";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { LuShoppingCart, LuTrash2 } from "react-icons/lu";
import { useAuth } from "@/context/authContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link, useNavigate, useParams } from "react-router";
import { Content } from "@/services/product/type";
import { createCart, getCart } from "@/services/cart/cart/api";
import { LucideEdit2 } from "lucide-react";
import { fetchAndShowFlashSale } from "@/services/flashsale/flashsale/api";

export default function ProductList() {
  const { auth } = useAuth();
  const [products, setProducts] = useState<Content[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [flashSaleCodes, setFlashSaleCodes] = useState<string[]>([]);
  const navigate = useNavigate();
  const pageSize = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const userRole = auth?.User_Role || "Customer"; // default to Customer
        const result = await getProducts(currentPage, pageSize, userRole);
        const allProducts = result.data.content;

        let flashCodes: string[] = [];
        try {
          const flashResult = await fetchAndShowFlashSale();

          if (flashResult?.data && Array.isArray(flashResult.data)) {
            flashCodes = flashResult.data.map((item) => item.Product_Code);
          }
        } catch (err) {
          console.error("Gagal mengambil flash sale:", err);
        }
        setFlashSaleCodes(flashCodes);
        setProducts(allProducts);
        setTotalPages(result.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, auth?.User_Role]); // re-run if role changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdd = async (
    quantity: number,
    fsCode: string | null,
    productCode: string | null
  ) => {
    const result = await createCart(quantity, fsCode, productCode);
    console.log("Add");
    if (result.success) {
      console.log("Berhasil tambah ke cart");
    } else {
      console.error("Gagal tambah ke cart", result.message);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage < 3) {
        for (let i = 0; i < 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages - 1);
      } else if (currentPage > totalPages - 4) {
        pageNumbers.push(0);
        pageNumbers.push("ellipsis");
        for (let i = totalPages - 4; i < totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(0);
        pageNumbers.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages - 1);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {isLoading ? (
        <div className="flex justify-center py-12">Loading products...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`products/view/${product.productCode}`}>
                  <div className="relative">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <CardHeader>
                    <h3 className="font-semibold text-lg">
                      {product.productName}
                    </h3>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-red-600">
                        Rp {product.productPrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </CardContent>
                </Link>
                <CardFooter className="pt-0">
                  {auth?.User_Role === "Customer" && (
                    <Button
                      onClick={() => {
                        handleAdd(1, null, product.productCode);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <LuShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  )}
                  {auth?.User_Role === "Admin" && (
                    <div className="flex flex-row gap-2 w-full">
                      <Link
                        to={`/admin/products/${product.productCode}`}
                        className="flex-1"
                      >
                        <Button className="w-full text-sm py-3 bg-yellow-500 hover:bg-yellow-600 flex justify-center items-center text-white rounded-md">
                          <LucideEdit2 className="mr-2 h-5 w-5" /> Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={async () => {
                          try {
                            await deleteProduct(product.productCode);
                            const result = await getProducts(
                              currentPage,
                              pageSize
                            );
                            setProducts(result.data.content);
                            setTotalPages(result.data.totalPages);
                          } catch (error) {
                            console.error("Failed to delete product:", error);
                          }
                        }}
                        className="flex-1 w-full text-sm py-3 bg-red-600 hover:bg-red-700 flex justify-center items-center text-white rounded-md"
                      >
                        <LuTrash2 className="mr-2 h-5 w-5" /> Delete
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 0 && handlePageChange(currentPage - 1)
                  }
                  className={
                    currentPage === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber, index) =>
                pageNumber === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                      className="cursor-pointer"
                    >
                      {pageNumber + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages - 1 &&
                    handlePageChange(currentPage + 1)
                  }
                  className={
                    currentPage === totalPages - 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
