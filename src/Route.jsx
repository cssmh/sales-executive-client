import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Components/Home";
import AddOrder from "./Components/AddOrder";
import Admin from "./Components/Admin";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/Login";

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
        path: "/admin",
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default Route;
