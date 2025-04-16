import React from "react";
import Header from "./component/header/header";
import Home from "./pages/home/home";
import EditProduct from "./pages/product/editProduct";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow">
        <EditProduct />
      </div>
    </div>
  );
};

export default Layout;
