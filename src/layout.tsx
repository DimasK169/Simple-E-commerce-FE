import Header from "./components/header/header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
