import React, { Suspense } from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import RecentProducts from "../Components/RecentProducts";
const latestProducts = fetch("http://localhost:3000/latest-products").then(
  (res) => res.json(),
);

const RootLayout = () => {
  return (
    <div>
      <header className="w-11/12 mx-auto mb-10">
        <NavBar />
      </header>

      <Hero />
      <Suspense fallback={<p>Loading..</p>}>
        <RecentProducts latestProducts={latestProducts} />
      </Suspense>
      <section>
        <Outlet />
      </section>

      <Footer />
    </div>
  );
};

export default RootLayout;
