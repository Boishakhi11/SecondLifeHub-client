import React, { Suspense } from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const RootLayout = () => {
  return (
    <div>
      <header className="w-11/12 mx-auto mb-10">
        <NavBar />
      </header>

      <section>
        <Outlet />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
