import logo from "../assets/logo.webp";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <div className="bg-gray-200 text-gray-800 px-3 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-1" />
              <span>+123 456 789</span>
            </div>
            <div className="flex items-center">
              <MdLocationOn className="mr-1" />
              <span>123 Street, City, Country</span>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-green-500 text-white px-3 py-1 relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link to="/">
              <img src={logo} className="w-[34px]" alt="Logo" />
            </Link>
          </div>
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="md:hidden p-2 focus:outline-none"
          >
            {isMenuOpen ? (
              <MdClose className="h-6 w-6 text-white" />
            ) : (
              <AiOutlineBars className="h-6 w-6 text-white" />
            )}
          </button>
          <div>
            <div className="hidden md:flex space-x-4">
            <Link to="/" className="block py-2">
              Home
            </Link>
            <Link to="/add-order" className="block py-2">
              Add Sales Order
            </Link>
            <Link to="/admin" className="block py-2">
              Admin Panel
            </Link>
          </div>
          {user?.email ? (
            <div>
              <label
                tabIndex={0}
                className="cursor-pointer flex items-center"
                // onClick={() => setUserDropdownVisible((prev) => !prev)}
              >
                <img
                  src={user.photoURL}
                  className="w-10 rounded-full hover:shadow-lg transition-shadow duration-300 ease-in-out"
                  alt="ava"
                />
              </label>
              <button
                className="text-base hover:bg-gray-100 font-semibold flex justify-center items-center px-[10px] py-1 rounded-full gap-1 transform active:translate-y-0.5 transition-transform duration-150 ease-in-out"
                onClick={handleLogout}
              >
                <FaArrowRightToBracket />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm border border-green-400 hover:border-green-400 hover:bg-green-400 hover:text-white"
            >
              Login
            </Link>
          )}
          </div>
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-2/5 bg-green-700 text-white z-50 transition-transform transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } duration-300 ease-in-out md:hidden`}
          >
            <div className="flex justify-end p-4">
              <button onClick={toggleMenu} className="text-white">
                <MdClose className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/" className="block py-2" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/add-order" className="block py-2" onClick={toggleMenu}>
                Add Sales Order
              </Link>
              <Link to="/admin" className="block py-2" onClick={toggleMenu}>
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
