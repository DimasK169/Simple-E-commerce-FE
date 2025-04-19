import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const ProductCardSelect: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  selected,
  disabled,
  onClick,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <Card
      className={`w-45 rounded-lg shadow-md overflow-hidden transition-colors duration-200 select-none ${
        disabled
          ? "bg-gray-100 opacity-50 cursor-not-allowed"
          : selected
          ? "bg-gray-200 cursor-pointer"
          : "bg-white hover:bg-gray-100 cursor-pointer"
      }`}
      onClick={handleClick}
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
};

export default ProductCardSelect;
