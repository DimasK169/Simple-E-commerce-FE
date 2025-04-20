import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Home from "@/pages/home/home";
import EditProduct from "@/pages/product/editProduct";
import FinishedPayment from "@/pages/payment/finishedPayment.tsx/finishedPayment";
import Login from "../pages/users/login/login";
import UnfinishedPayment from "../pages/payment/unfinishedPayment/unfinishedPayment";
import Cart from "../pages/cart/cart";
import FlashSale from "@/pages/flashsale/flashsale";
import AddFlashSale from "@/pages/flashsale/add/addFlashSale";
import Public from "./public";
import Protected from "./protected";
import UpdateFlashSale from "@/pages/flashsale/update/updateFlashSale";
import DetailFlashSale from "@/pages/flashsale/detail/detailFlashSale";

export const router = createBrowserRouter([
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
            element: <EditProduct />,
            path: "/a",
          },

          {
            element: <Cart />,
            path: "/cart",
          },
          {
            element: <FinishedPayment />,
            path: "/payment/finished",
          },
          {
            element: <UnfinishedPayment />,
            path: "/payment",
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
        element: <UpdateFlashSale />,
        path: "/flash-sale/update/:code",
      },
      {
        element: <DetailFlashSale />,
        path: "/flash-sale/detail/:code",
      },
    ],
  },
]);
