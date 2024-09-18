import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[78vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
