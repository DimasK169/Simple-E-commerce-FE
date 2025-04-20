import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
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

import { getFlashSaleByCode } from "@/services/flashsale/flashsale/api";
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

const FlashSaleDetail = () => {
  const { code } = useParams();
  const [products, setProducts] = useState<Content[]>([]);
  const [disabledCodes, setDisabledCodes] = useState<string[]>([]);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
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

  return (
    <Card className="max-w-4xl mx-auto mt-10 shadow-xl rounded-2xl border">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Detail Flash Sale
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="FlashSale_Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flash Sale Name</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
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
                      <Input disabled {...field} />
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
                      <Input type="number" disabled {...field} />
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
                      <Input type="datetime-local" disabled {...field} />
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
                      <Input type="datetime-local" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel className="block mb-2 text-lg font-semibold">
                Produk dalam Flash Sale
              </FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products
                  .filter((product) =>
                    disabledCodes.includes(product.productCode)
                  )
                  .map((product) => (
                    <ProductCardSelect
                      key={product.productCode}
                      image={product.productImage}
                      name={product.productName}
                      price={product.productPrice}
                      selected={true}
                      disabled={true}
                      onClick={() => {}}
                    />
                  ))}
              </div>
            </div>

            <div className="pt-4">
              <Button type="button" onClick={() => navigate("/flash-sale")}>
                Kembali
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FlashSaleDetail;
