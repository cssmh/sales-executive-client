import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import logo from "../assets/logo.webp"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <>
      {/* Top Bar with Contact Info */}
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

      {/* Main Navbar */}
      <nav className="bg-green-500 text-white px-3 py-1 relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link to="/">
              <img src={logo} className="w-[34px]" alt="Logo" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="md:hidden p-2 focus:outline-none"
          >
            <AiOutlineBars className="h-6 w-6" />
          </button>

          {/* Desktop Menu */}
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

          {/* Mobile Menu */}
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-2/4 bg-gray-500 z-50 transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:hidden`}
          >
            <div className="flex flex-col space-y-2 p-4">
              <Link
                to="/"
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/add-order"
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Sales Order
              </Link>
              <Link
                to="/admin"
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
