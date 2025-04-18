import React from "react";
import { Outlet } from "react-router";

const layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="grow overflow-y-auto overflow-visible w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
