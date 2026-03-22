import React, { Suspense } from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import ScrollToTop from "../Components/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop></ScrollToTop>

      <header className="w-11/12 mx-auto mb-10">
        <NavBar />
      </header>

      <section className="grow">
        <Outlet />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
