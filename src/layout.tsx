import Header from "./components/header/header";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

const layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default layout;
