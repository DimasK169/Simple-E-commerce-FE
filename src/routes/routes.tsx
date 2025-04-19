import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Home from "@/pages/home/home";
import EditProduct from "@/pages/product/editProduct";
import FinishedPayment from "@/pages/payment/finishedPayment.tsx/finishedPayment";
import Login from "../pages/users/login/login";
import UnfinishedPayment from "../pages/payment/unfinishedPayment/unfinishedPayment";
import Public from "./public";
import Protected from "./protected";
import Cart from "@/pages/cart/cart";

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
            element: <EditProduct />,
            path: "/a",
          },
        ],
      },
      {
        element: <Home />,
        index: true,
      },
    ],
  },
]);
