import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target) &&
        isActive
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Sales Executive App</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:bg-blue-700 p-2 rounded">
            Home
          </Link>
          <Link to="/add-order" className="hover:bg-blue-700 p-2 rounded">
            Add Sales Order
          </Link>
          <Link to="/admin" className="hover:bg-blue-700 p-2 rounded">
            Admin Panel
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            ref={buttonRef}
            onClick={() => setActive(!isActive)}
            className="p-4 focus:outline-none"
          >
            <AiOutlineBars className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden bg-blue-600 absolute w-full left-0 top-full transform ${
          isActive ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <Link
          to="/"
          className="block text-center py-2 hover:bg-blue-700"
          onClick={() => setActive(false)}
        >
          Home
        </Link>
        <Link
          to="/add-order"
          className="block text-center py-2 hover:bg-blue-700"
          onClick={() => setActive(false)}
        >
          Add Sales Order
        </Link>
        <Link
          to="/admin"
          className="block text-center py-2 hover:bg-blue-700"
          onClick={() => setActive(false)}
        >
          Admin Panel
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
