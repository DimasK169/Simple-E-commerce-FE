import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Home from "@/pages/home/home";
import EditProduct from "@/pages/product/editProduct";
import Payment from "../pages/payment/payment";
import Login from "../pages/users/login/login";
import UnfinishedPayment from "../pages/payment/unfinishedPayment/unfinishedPayment";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {

        element: <Login />,
        index: true,
      },
      {
        element: <Payment />,
        path: "/payment/finished",
      },
      {
        element: <UnfinishedPayment />,
        path: "/payment",
      },
      {
        element: <EditProduct />,
        path: "/a",
      }
    ],
  },
]);
