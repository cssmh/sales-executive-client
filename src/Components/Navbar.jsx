import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { MdClose, MdLocationOn } from "react-icons/md";
import logo from "../assets/logo.webp";
import { FaPhoneAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    // <>
    //   {/* Top Bar with Contact Info */}
    //   <div className="bg-gray-200 text-gray-800 px-3 py-2">
    //     <div className="container mx-auto flex justify-between items-center">
    //       <div className="flex items-center space-x-4">
    //         <div className="flex items-center">
    //           <FaPhoneAlt className="mr-1" />
    //           <span>+123 456 789</span>
    //         </div>
    //         <div className="flex items-center">
    //           <MdLocationOn className="mr-1" />
    //           <span>123 Street, City, Country</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Main Navbar */}
    //   <nav className="bg-green-500 text-white px-3 py-1 relative">
    //     <div className="container mx-auto flex justify-between items-center">
    //       <div className="text-xl font-bold">
    //         <Link to="/">
    //           <img src={logo} className="w-[34px]" alt="Logo" />
    //         </Link>
    //       </div>

    //       {/* Mobile Menu Button */}
    //       <button
    //         ref={buttonRef}
    //         onClick={toggleMenu}
    //         className="md:hidden p-2 focus:outline-none"
    //       >
    //         <AiOutlineBars className="h-6 w-6" />
    //       </button>

    //       {/* Desktop Menu */}
    //       <div className="hidden md:flex space-x-4">
    //         <Link to="/" className="block py-2">
    //           Home
    //         </Link>
    //         <Link to="/add-order" className="block py-2">
    //           Add Sales Order
    //         </Link>
    //         <Link to="/admin" className="block py-2">
    //           Admin Panel
    //         </Link>
    //       </div>

    //       {/* Mobile Menu */}
    //       <div
    //         ref={menuRef}
    //         className={`fixed top-0 left-0 h-full w-2/4 bg-gray-500 z-50 transform ${
    //           isMenuOpen ? "translate-x-0" : "-translate-x-full"
    //         } transition-transform duration-300 ease-in-out md:hidden`}
    //       >
    //         <div className="flex flex-col space-y-2 p-4">
    //           <Link
    //             to="/"
    //             className="block py-2"
    //             onClick={() => setIsMenuOpen(false)}
    //           >
    //             Home
    //           </Link>
    //           <Link
    //             to="/add-order"
    //             className="block py-2"
    //             onClick={() => setIsMenuOpen(false)}
    //           >
    //             Add Sales Order
    //           </Link>
    //           <Link
    //             to="/admin"
    //             className="block py-2"
    //             onClick={() => setIsMenuOpen(false)}
    //           >
    //             Admin Panel
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    // </>
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
      <nav className="bg-green-500 text-white px-3 py-[6px] relative flex justify-between items-center z-10">
        <div className="text-xl md:text-2xl font-semibold ml-4 text-yellow-400 font-port">
          <img src={logo} className="w-[34px] mx-auto" alt="" />
        </div>
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
            <img src={user?.photoURL} alt="" />
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
            <Link
              to="/"
              className="block py-1"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/add-order"
              className="block py-1"
              onClick={() => setMenuOpen(false)}
            >
              Add Sales Order
            </Link>
            <Link
              to="/admin"
              className="block py-1"
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
