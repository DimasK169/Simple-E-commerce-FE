import React from "react";
import Header from "./component/header/header";
import Home from "./pages/home";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow">
        <Home />
      </div>
    </div>
  );
};

export default Layout;
