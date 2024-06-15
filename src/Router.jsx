import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <></>,
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
