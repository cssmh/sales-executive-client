import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import { useState, useRef, useEffect } from "react";
import defaultAva from "../assets/default.jpg";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import { MdClose, MdLocationOn } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const admin = user?.email === import.meta.env.VITE_admin;
  const menuRef = useRef(null);

  const handleLogOut = () => {
    logOut().then().catch();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="bg-gray-200 text-gray-800 px-3 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-1" />
              <span>+8801525</span>
            </div>
            <div className="flex items-center">
              <MdLocationOn className="mr-1" />
              <span>House- 0, Road- 2, Boundary road, Mirpur 10</span>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-green-500 text-white px-3 py-[6px] relative flex justify-between items-center z-10">
        <div className="text-xl md:text-2xl font-semibold ml-4 text-yellow-400 font-port">
          <img src={logo} className="w-[36px] mx-auto" alt="" />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="block py-2">
              Home
            </Link>
            <Link to="/add-order" className="block py-2">
              Add Sales Order
            </Link>
            <Link to="/my-orders" className="block py-2">
              My Orders
            </Link>
            {admin && (
              <Link to="/admin-dashboard" className="block py-2">
                Admin Panel
              </Link>
            )}
            <img
              src={user?.photoURL || defaultAva}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            {user?.email ? (
              <button
                onClick={handleLogOut}
                className="border rounded-md text-white py-[3px] px-[10px]"
              >
                <span className="flex items-center gap-1">
                  <FaArrowRightToBracket />
                  Logout
                </span>
              </button>
            ) : (
              <Link to="/login">
                <p className="border rounded-md text-white py-[3px] px-[10px]">
                  Login
                </p>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            {user?.email && (
              <p className="md:hidden font-semibold">{user.displayName}</p>
            )}
            <button
              className="md:hidden p-2 focus:outline-none"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <MdClose className="text-white h-6 w-6" />
              ) : (
                <AiOutlineBars className="text-white h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div
          ref={menuRef}
          className={`fixed top-10 right-0 w-1/2 bg-green-600 text-white p-4 transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex justify-end">
            <button className="text-white" onClick={() => setMenuOpen(false)}>
              <MdClose className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col mt-4 space-y-4">
            <Link to="/" className="block" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link
              to="/add-order"
              className="block"
              onClick={() => setMenuOpen(false)}
            >
              Add Sales Order
            </Link>
            {user?.email && (
              <Link
                to="/my-orders"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                My Orders
              </Link>
            )}
            {admin && (
              <Link
                to="/admin-dashboard"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
            {user?.email ? (
              <button onClick={handleLogOut} className="">
                <span className="flex items-center gap-1">
                  <FaArrowRightToBracket />
                  Logout
                </span>
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
