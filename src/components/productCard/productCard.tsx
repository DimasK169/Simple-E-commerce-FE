import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

//Buat di pages home ada 2 sesi
//sesi 1 flash-sale get dari flash sale otomatis discount true
//sesi 2 get dari product otomatis discount false

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  discount?: boolean;
  stock?: number;
  status?: "available" | "na";
  isAdmin?: boolean;
}
const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  discount,
  stock,
  status,
  isAdmin,
}) => {
  return (
    <Card className="w-80 rounded-2xl shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{name}</h2>
          {discount && <Badge variant="destructive">Discount</Badge>}
        </div>

        <p className="text-xl font-bold text-green-600">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(price)}
        </p>

        {isAdmin && (
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Stock: {stock}</p>
            <Badge variant={status === "available" ? "default" : "secondary"}>
              {status === "available" ? "Available" : "N/A"}
            </Badge>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-3">
          {!isAdmin && (
            <Button className="flex-1" onClick={() => {}}>
              Add to Cart
            </Button>
          )}
          {isAdmin && (
            <>
              <Button variant="outline" onClick={() => {}}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => {}}>
                Delete
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
