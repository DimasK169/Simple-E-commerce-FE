import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import productClient from "@/services/product/api";
import { useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { getProductsDetail } from "@/services/product/list/api";
import { urlToFile } from "@/lib/utils";

const formSchema = z.object({
  productName: z.string().min(1, "Product name cannot be empty"),
  productCode: z.string().min(1, "Product code cannot be empty"),
  productDescription: z.string().min(1, "Product description cannot be empty"),
  productCategory: z.string().min(1, "Product category cannot be empty"),
  productStock: z.coerce
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, "Stock cannot be negative"),
  productPrice: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price cannot be negative"),
  productImage: z.any().optional(),
  productIsAvailable: z.boolean().optional(),
});

const ProductFormEdit = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productCode: "",
      productDescription: "",
      productCategory: "",
      productStock: 0,
      productPrice: 0,
      productImage: undefined,
      productIsAvailable: true,
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.productName);
    formData.append("code", values.productCode);
    formData.append("description", values.productDescription);
    formData.append("category", values.productCategory);
    formData.append("stock", values.productStock.toString());
    formData.append("price", values.productPrice.toString());
    formData.append("isAvailable", String(values.productIsAvailable));
    formData.append("image", values.productImage);

    try {
      await productClient.putForm(`/product/${params.code}`, formData);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        console.log("error form data", error);
      }
    }
  }

  const formatRupiah = (value: number | string) => {
    const number =
      typeof value === "string" ? parseInt(value.replace(/\D/g, "")) : value;
    if (isNaN(number)) return "";
    return number.toLocaleString("id-ID");
  };

  const unformatRupiah = (formatted: string) => {
    return formatted.replace(/[^\d]/g, "");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductsDetail(params.code as string);
        form.reset({
          productName: data.productName,
          productCategory: data.productCategory,
          productCode: data.productCode,
          productDescription: data.productDescription,
          productStock: data.productStock,
          productPrice: data.productPrice,
          productIsAvailable: data.productIsAvailable,
          productImage: await urlToFile(data.productImage, data.productName),
        });
        setImagePreview(data.productImage);
      } catch (error) {
        toast.error("Failed to load product details.");
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-xl rounded-2xl border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Edit Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "productName",
                  label: "Product Name",
                  placeholder: "iPhone 15",
                },
                {
                  name: "productCode",
                  label: "Product Code",
                  placeholder: "IP15",
                },
                {
                  name: "productDescription",
                  label: "Description",
                  placeholder: "A flagship phone",
                },
                {
                  name: "productCategory",
                  label: "Category",
                  placeholder: "Electronics",
                },
              ].map(({ name, label, placeholder }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {[
                {
                  name: "productStock",
                  label: "Stock",
                  placeholder: "100",
                  type: "number",
                },
                {
                  name: "productPrice",
                  label: "Price",
                  placeholder: "10.000",
                  type: "number",
                },
              ].map(({ name, label, placeholder, type }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        {name === "productPrice" ? (
                          <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
                              Rp
                            </span>
                            <Input
                              type="text"
                              inputMode="numeric"
                              placeholder={placeholder}
                              value={formatRupiah(field.value)}
                              onChange={(e) => {
                                const raw = unformatRupiah(e.target.value);
                                field.onChange(Number(raw));
                              }}
                              className="pl-10"
                            />
                          </div>
                        ) : (
                          <Input
                            type={type}
                            placeholder={placeholder}
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="productImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div>
                      <input
                        id="productImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, field.onChange)}
                        className="hidden"
                      />
                      <label htmlFor="productImage">
                        <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition">
                          Choose File
                        </div>
                      </label>

                      {/* Display file name if uploaded */}
                      {field.value instanceof File && (
                        <div className="mt-2 text-sm text-gray-600">
                          Selected: <strong>{field.value.name}</strong>
                        </div>
                      )}
                    </div>
                  </FormControl>

                  {/* Preview */}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-3 w-32 h-32 object-cover rounded-xl border"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Checkbox */}
            <FormField
              control={form.control}
              name="productIsAvailable"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="mb-0">Available for Sale</FormLabel>
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={form.formState.isSubmitting}
              >
                Submit Product
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductFormEdit;
