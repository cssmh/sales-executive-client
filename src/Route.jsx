import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Components/Home";
import AddOrder from "./Pages/AddOrder";
import AdminDash from "./Pages/AdminDash";
import PrivateRoute from "./Shared/PrivateRoute";
import Login from "./Components/Login";
import Register from "./Components/Register";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/", element: <Home /> },
      {
        path: "/add-order",
        element: (
          <PrivateRoute>
            <AddOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDash />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default Route;
