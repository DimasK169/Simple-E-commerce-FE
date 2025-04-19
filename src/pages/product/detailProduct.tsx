import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LuMinus, LuPlus, LuShoppingCart } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router";
import { getProductsDetail } from "@/services/product/list/api";
import { Content } from "@/services/product/type";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await getProductsDetail(params.code as string);
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.code]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-lg">Loading product details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500 text-lg">Failed to load product details.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
          <img
            src={data.productImage}
            alt={data.productImage}
            className="object-contain w-full h-full max-h-96"
          />
        </div>

        {/* Product Details */}
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{data.productCategory}</Badge>
              <h1 className="text-3xl font-bold">{data.productName}</h1>
              <p className="text-2xl font-semibold mt-2 text-primary">
                Rp. {data.productPrice}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="font-semibold text-lg mb-2">Description</h2>
              <p className="text-gray-700">{data.productDescription}</p>
            </div>

            <Separator />

            <div>
              <h2 className="font-semibold text-lg mb-3">Quantity</h2>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <LuMinus className="h-4 w-4" />
                </Button>
                <span className="mx-4 text-lg w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <LuPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button className="w-full text-lg py-6" size="lg">
              <LuShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
