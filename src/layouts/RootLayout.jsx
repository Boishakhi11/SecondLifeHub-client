import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import RecentProducts from "../Components/RecentProducts";

const RootLayout = () => {
  return (
    <div>
      <header className="w-11/12 mx-auto mb-10">
        <NavBar />
      </header>

      <Hero />
      <RecentProducts />
      <section>
        <Outlet />
      </section>

      <Footer />
    </div>
  );
};

export default RootLayout;
