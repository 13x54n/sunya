import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/>This is Home</>,
    },
    {
      path: "/dashboard",
      element: <>Dashboard</>,
    },
    {
      path: "*",
      element: <>404 Not Found</>,
    },
  ]);

  return <RouterProvider router={router} />;
}
