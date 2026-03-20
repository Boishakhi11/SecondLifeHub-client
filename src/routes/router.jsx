import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Components/Home";
import AllProducts from "../Components/AllProducts";
import Register from "../Components/Register";
import Login from "../Components/Login";
import AuthLayout from "../layouts/AuthLayout";
import Error from "../Components/Error";
import ProductDetails from "../Components/ProductDetails";
import Loading from "../Components/Loading";
import PrivateRoute from "../provider/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/products",
        loader: () => fetch("http://localhost:3000/products"),
        hydrateFallbackElement: <Loading></Loading>,
        Component: AllProducts,
      },
      {
        path: "productDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "/*",
    Component: Error,
  },
]);

export default router;
