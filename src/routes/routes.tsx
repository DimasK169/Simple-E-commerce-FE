import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Payment from "../pages/payment/finishedPayment.tsx/finishedPayment";
import Login from "../pages/users/login/login";
import UnfinishedPayment from "../pages/payment/unfinishedPayment/unfinishedPayment";
import Cart from "../pages/cart/cart";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
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
        element: <Cart />,
        path: "/cart",
      },
    ],
  },
]);
