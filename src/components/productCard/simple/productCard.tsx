import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  selected?: boolean;
  onClick?: () => void;
}

const ProductCardSelect: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  selected,
  onClick,
}) => (
  <Card
    className={`w-45 rounded-lg shadow-md overflow-hidden cursor-pointer transition-colors duration-200 ${
      selected ? "bg-gray-200" : "bg-white hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <img src={image} alt={name} className="w-full h-28 object-cover" />
    <CardContent className="p-3 space-y-1">
      <h2 className="text-sm font-medium line-clamp-2">{name}</h2>
      <p className="text-base font-semibold text-green-600">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(price)}
      </p>
    </CardContent>
  </Card>
);

export default ProductCardSelect;
