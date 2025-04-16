import React from "react";
import Header from "./component/header/header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow"></div>
    </div>
  );
};

export default Layout;
