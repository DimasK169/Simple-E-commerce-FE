import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Content } from "@/services/product/type";
import ProductCardSelect from "../productCard/simple/productCard";
import { getProducts } from "@/services/product/list/api";
import { useNavigate } from "react-router";
import { createFlashSale } from "@/services/flashsale/flashsale/api";

const formSchema = z.object({
  FlashSale_Name: z.string().min(1, "Nama flash sale wajib diisi"),
  FlashSale_Code: z.string().min(1, "Kode flash sale wajib diisi"),
  FlashSale_Discount: z.coerce.number(),
  FlashSale_StartDate: z.string().min(1, "Tanggal mulai wajib diisi"),
  FlashSale_EndDate: z.string().min(1, "Tanggal selesai wajib diisi"),
  Product_Code: z.array(z.string()).min(1, "Minimal pilih 1 produk"),
});

const FlashSaleAddForm = () => {
  const [products, setProducts] = useState<Content[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FlashSale_Name: "",
      FlashSale_Code: "",
      FlashSale_Discount: 0,
      FlashSale_StartDate: "",
      FlashSale_EndDate: "",
      Product_Code: [],
    },
  });

  useEffect(() => {
    form.setValue("Product_Code", selectedCodes);
  }, [selectedCodes, form]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts(0);
      if (res?.data?.content) {
        setProducts(res.data.content);
      }
    };
    fetchProducts();
  }, []);

  const toggleProduct = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const finalData = {
      ...values,
      FlashSale_Discount: values.FlashSale_Discount / 100,
      Product_Code: selectedCodes,
      FlashSale_CreatedBy: "admin",
    };

    console.log("Final payload:", finalData);
    setLoading(true);

    try {
      await createFlashSale(finalData);
      alert("Flash Sale berhasil ditambahkan!");
      navigate("/flash-sale");
    } catch (err: any) {
      console.error("Gagal menambahkan flash sale:", err);
      alert("Terjadi kesalahan saat menambahkan flash sale.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto mt-10 shadow-xl rounded-2xl border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Add Flash Sale</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="FlashSale_Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flash Sale Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Summer Sale" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="FlashSale_Code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flash Sale Code</FormLabel>
                    <FormControl>
                      <Input placeholder="FS001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="FlashSale_Discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="FlashSale_StartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="FlashSale_EndDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel className="block mb-2 text-lg font-semibold">
                Pilih Produk
              </FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCardSelect
                    key={product.productCode}
                    image={product.productImage}
                    name={product.productName}
                    price={product.productPrice}
                    selected={selectedCodes.includes(product.productCode)}
                    onClick={() => toggleProduct(product.productCode)}
                  />
                ))}
              </div>
              {selectedCodes.length === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  Harap pilih setidaknya 1 produk.
                </p>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full md:w-auto cursor-pointer"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Flash Sale"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FlashSaleAddForm;
