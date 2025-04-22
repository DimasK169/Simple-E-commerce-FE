import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

import {
  getFlashSaleByCode,
  updateFlashSale,
} from "@/services/flashsale/flashsale/api";
import { getProducts } from "@/services/product/list/api";
import ProductCardSelect from "../productCard/simple/productCard";
import { Content } from "@/services/product/type";

const formSchema = z.object({
  FlashSale_Name: z.string(),
  FlashSale_Code: z.string(),
  FlashSale_Discount: z.coerce.number(),
  FlashSale_StartDate: z.string(),
  FlashSale_EndDate: z.string(),
  Product_Code: z.array(z.string()),
});

const FlashSaleUpdateForm = () => {
  const { code } = useParams(); // dari URL
  const [products, setProducts] = useState<Content[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [disabledCodes, setDisabledCodes] = useState<string[]>([]);
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
    const fetchData = async () => {
      const res = await getFlashSaleByCode(code!);
      const flashSaleItems = res.data;

      if (!flashSaleItems || flashSaleItems.length === 0) {
        alert("Flash Sale tidak ditemukan");
        return;
      }

      const flashSale = flashSaleItems[0];

      const usedProductCodes = flashSaleItems.map((item) => item.Product_Code);
      setDisabledCodes(usedProductCodes);
      setSelectedCodes([]);

      form.reset({
        FlashSale_Name: flashSale.FlashSale_Name,
        FlashSale_Code: flashSale.FlashSale_Code,
        FlashSale_Discount: flashSale.FlashSale_Discount * 100,
        FlashSale_StartDate: flashSale.FlashSale_StartDate.slice(0, 16),
        FlashSale_EndDate: flashSale.FlashSale_EndDate.slice(0, 16),
        Product_Code: [],
      });
    };

    fetchData();
  }, [code, form]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts(0);
      if (res?.data?.content) {
        setProducts(res.data.content);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    form.setValue("Product_Code", selectedCodes);
  }, [selectedCodes, form]);

  const toggleProduct = (code: string) => {
    if (disabledCodes.includes(code)) return;
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const finalData = {
      ...values,
      FlashSale_Discount: values.FlashSale_Discount / 100,
      Product_Code: [...disabledCodes, ...selectedCodes],
      FlashSale_CreatedBy: "admin",
    };

    try {
      setLoading(true);
      await updateFlashSale(code!, finalData);
      alert("Flash Sale berhasil diupdate!");
      navigate("/admin/flash-sale");
    } catch (err) {
      console.error("Gagal update:", err);
      alert("Terjadi kesalahan saat mengupdate flash sale.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto mt-10 shadow-xl rounded-2xl border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Update Flash Sale
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama */}
              <FormField
                control={form.control}
                name="FlashSale_Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flash Sale Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Kode */}
              <FormField
                control={form.control}
                name="FlashSale_Code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flash Sale Code</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Diskon */}
              <FormField
                control={form.control}
                name="FlashSale_Discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Tanggal */}
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

            {/* Pilih Produk */}
            <div>
              <FormLabel className="block mb-2 text-lg font-semibold">
                Pilih Produk Tambahan
              </FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCardSelect
                    key={product.productCode}
                    image={product.productImage}
                    name={product.productName}
                    price={product.productPrice}
                    selected={selectedCodes.includes(product.productCode)}
                    disabled={disabledCodes.includes(product.productCode)}
                    onClick={() => toggleProduct(product.productCode)}
                  />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Flash Sale"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FlashSaleUpdateForm;
