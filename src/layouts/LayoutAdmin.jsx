import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 border-primary">
      <Sidebar />
      <div className="xl:col-span-5 flex flex-col h-screen">
        <Header />
        <div className="flex-1 overflow-y-scroll p-5 pt-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;