import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Components/Home";
import AddOrder from "./Pages/AddOrder";
import AdminDash from "./Pages/AdminDash";
import PrivateRoute from "./Shared/PrivateRoute";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminRoute from "./Shared/AdminRoute";
import MyOrders from "./Pages/MyOrders";
import OrderDetails from "./Pages/OrderDetails";
import { getOrder } from "./Api/Order";

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
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDash />
          </AdminRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <AdminRoute>
            <OrderDetails />
          </AdminRoute>
        ),
        loader: async ({ params }) => await getOrder(params.id),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default Route;
