import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Components/Home";
import AllProducts from "../Components/AllProducts";
import Register from "../Components/Register";
import Login from "../Components/Login";
import AuthLayout from "../layouts/AuthLayout";
import Error from "../Components/Error";

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
        path: "allProducts",
        Component: AllProducts,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/auth/login",
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
