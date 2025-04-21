import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Home from "@/pages/home/home";
import AddProduct from "@/pages/product/addProduct";
import FinishedPayment from "@/pages/payment/payment";
import Login from "../pages/users/login/login";
import Cart from "../pages/cart/cart";
import FlashSale from "@/pages/flashsale/flashsale";
import AddFlashSale from "@/pages/flashsale/add/addFlashSale";
import Public from "./public";
import Protected from "./protected";
import ProductDetailPage from "@/pages/product/detailProduct";
import ProductSearch from "@/pages/search/search";
import UpdateFlashSale from "@/pages/flashsale/update/updateFlashSale";
import DetailFlashSale from "@/pages/flashsale/detail/detailFlashSale";
import AdminRoute from "./adminRoutes";
import Admin from "@/pages/admin/admin";
import EditProduct from "@/pages/product/editProduct";
import ProductListAdmin from "@/components/home/productlistAdmin";
import ProductListSearchAdmin from "@/components/search/productsearchlistAdmin";
import Payment from "@/pages/payment/payment";

export const router = createBrowserRouter([
  {
    element: <Public />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Public />,
        children: [
          {
            element: <Login />,
            path: "/login",
          },
        ],
      },
      {
        element: <Protected />,
        children: [
          {
            element: <Cart />,
            path: "/cart",
          },
          {
            element: <Payment />,
            path: "/payment",
          },
          {
            element: <Cart />,
            path: "/cart",
          },
          {
            element: <FinishedPayment />,
            path: "/payment/finished",
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            element: <ProductListSearchAdmin />,
            path: "admin/search",
          },
          {
            element: <AddProduct />,
            path: "/admin/products/add",
          },
          {
            element: <EditProduct />,
            path: "/admin/products/:code",
          },
          {
            element: <ProductDetailPage />,
            path: "admin/products/view/:code",
          },
          {
            element: <FlashSale />,
            path: "/admin/flash-sale",
          },
          {
            element: <AddFlashSale />,
            path: "/admin/flash-sale/add",
          },
          {
            element: <UpdateFlashSale />,
            path: "admin/flash-sale/update/:code",
          },
          {
            element: <DetailFlashSale />,
            path: "admin/flash-sale/detail/:code",
          },
        ],
      },
      {
        element: <Home />,
        index: true,
      },
      {
        element: <ProductDetailPage />,
        path: "/products/view/:code",
      },
      {
        element: <ProductSearch />,
        path: "/search",
      },
    ],
  },
]);
