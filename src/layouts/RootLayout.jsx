import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
