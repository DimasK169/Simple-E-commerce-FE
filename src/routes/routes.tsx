import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Home from "@/pages/home/home";
import AddProduct from "@/pages/product/addProduct";
import FinishedPayment from "@/pages/payment/finishedPayment.tsx/finishedPayment";
import Login from "../pages/users/login/login";
import UnfinishedPayment from "../pages/payment/unfinishedPayment/unfinishedPayment";
import Cart from "../pages/cart/cart";
import FlashSale from "@/pages/flashsale/flashsale";
import AddFlashSale from "@/pages/flashsale/add/addFlashSale";
import Public from "./public";
import Protected from "./protected";
import EditProduct from "@/pages/product/editproduct";
import ProductDetailPage from "@/pages/product/detailProduct";
import ProductSearch from "@/pages/search/search";
import UpdateFlashSale from "@/pages/flashsale/update/updateFlashSale";

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
            element: <FinishedPayment />,
            path: "/payment/finished",
          },
          {
            element: <UnfinishedPayment />,
            path: "/payment",
          },
          {
            element: <Cart />,
            path: "/cart",
          },
        ],
      },
      {
        element: <Protected />,
        children: [
          {
            element: <AddProduct />,
            path: "/products/add",
          },
          {
            element: <EditProduct />,
            path: "/products/:code",
          },
        ],
      },
      {
        element: <Home />,
        index: true,
      },
      {
        element: <FlashSale />,
        path: "/flash-sale",
      },
      {
        element: <AddFlashSale />,
        path: "/flash-sale/add",
      },
      {
        element: <ProductDetailPage />,
        path: "/products/view/:code",
      },
      {
        element: <ProductSearch />,
        path: "/search",
      },
      {
        element: <UpdateFlashSale />,
        path: "/flash-sale/update/:code",
      },
    ],
  },
]);
