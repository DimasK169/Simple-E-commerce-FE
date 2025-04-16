import React, { useState } from "react";

interface Product {
  productName: string;
  productCode: string;
  productDescription: string;
  productCategory: string;
  productStock: number;
  productPrice: number;
  productImage?: File | null;
  productIsAvailable?: boolean;
}

interface ProductFormProps {
  mode: "add" | "edit";
  initialData?: Product;
  onSubmit: (formData: FormData) => void; // Use FormData type now
}

const ProductForm: React.FC<ProductFormProps> = ({
  mode,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Product>({
    productName: initialData?.productName || "",
    productCode: initialData?.productCode || "",
    productDescription: initialData?.productDescription || "",
    productCategory: initialData?.productCategory || "",
    productStock: initialData?.productStock || 0,
    productPrice: initialData?.productPrice || 0,
    productImage: null,
    productIsAvailable: initialData?.productIsAvailable ?? true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.productName)
      newErrors.productName = "Product name cannot be empty";
    if (!formData.productCode)
      newErrors.productCode = "Product code cannot be empty";
    if (!formData.productDescription)
      newErrors.productDescription = "Product description cannot be empty";
    if (!formData.productCategory)
      newErrors.productCategory = "Product category cannot be empty";
    if (formData.productStock === null || formData.productStock < 0)
      newErrors.productStock = "Product stock cannot be empty or negative";
    if (formData.productPrice === null || formData.productPrice < 0)
      newErrors.productPrice = "Product price cannot be empty or negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.productName && (
          <p className="text-red-500 text-sm">{errors.productName}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="productCode"
          placeholder="Product Code"
          value={formData.productCode}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.productCode && (
          <p className="text-red-500 text-sm">{errors.productCode}</p>
        )}
      </div>

      <div>
        <textarea
          name="productDescription"
          placeholder="Product Description"
          value={formData.productDescription}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.productDescription && (
          <p className="text-red-500 text-sm">{errors.productDescription}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="productCategory"
          placeholder="Product Category"
          value={formData.productCategory}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.productCategory && (
          <p className="text-red-500 text-sm">{errors.productCategory}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="productStock"
          placeholder="Stock"
          value={formData.productStock}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.productStock && (
          <p className="text-red-500 text-sm">{errors.productStock}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="productPrice"
          placeholder="Price"
          value={formData.productPrice}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.productPrice && (
          <p className="text-red-500 text-sm">{errors.productPrice}</p>
        )}
      </div>

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFormData((prev) => ({
                ...prev,
                productImage: file,
              }));
            }
          }}
        />
        {formData.productImage && (
          <p className="text-sm mt-1 text-gray-600">
            {formData.productImage.name}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="productIsAvailable"
          checked={formData.productIsAvailable}
          onChange={handleChange}
        />
        <label htmlFor="productIsAvailable">Available</label>
      </div>

      <button
        type="submit"
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        {mode === "add" ? "Add Product" : "Update Product"}
      </button>
    </form>
  );
};

export default ProductForm;
