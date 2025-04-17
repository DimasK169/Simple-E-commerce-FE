import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Home from "@/pages/home/home";
import EditProduct from "@/pages/product/editProduct";

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
        element: <EditProduct />,
        path: "/a",
      },
    ],
  },
]);
