import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Components/Home";
import AddOrder from "./Components/AddOrder";
import Admin from "./Components/Admin";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "add-order", element: <AddOrder /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);

export default Route;
