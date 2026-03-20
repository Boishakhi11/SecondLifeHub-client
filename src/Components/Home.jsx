import React, { Suspense } from "react";
import Hero from "./Hero";
import RecentProducts from "./RecentProducts";
import Loading from "./Loading";

const latestProducts = fetch("http://localhost:3000/latest-products").then(
  (res) => res.json(),
);

const Home = () => {
  return (
    <div>
      <Hero />

      <Suspense fallback={<Loading></Loading>}>
        <RecentProducts latestProducts={latestProducts} />
      </Suspense>
    </div>
  );
};

export default Home;
