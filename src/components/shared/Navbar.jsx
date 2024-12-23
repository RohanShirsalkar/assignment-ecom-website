import { useState, useContext } from "react";
import {
  FaHamburger,
  FaHeart,
  FaUser,
  FaTruck,
  FaShoppingCart,
} from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const showComingSoon = () => {
    alert("Coming soon!");
  };

  return (
    <header className="bg-white shadow-md">
      {/* Top Section */}
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/">
            <img src="/AmbranceLogo.avif" alt="logo" />
          </a>
        </div>

        {/* Search Bar */}
        <div className="relative hidden md:block flex-1 mx-4 md:max-w-2xl">
          <input
            type="text"
            className="w-full border rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Search"
          />
        </div>

        {/* Icons */}
        <div className="hidden md:flex space-x-6 text-gray-600">
          <Link to="/login" className="hover:text-gray-900">
            <FaUser size={20} />
          </Link>
          <button
            onClick={openCart}
            className="hover:text-gray-900 cursor-pointer"
          >
            <FaShoppingCart size={20} />
          </button>
          <a
            onClick={showComingSoon}
            className="hover:text-gray-900 cursor-pointer"
          >
            <FaTruck size={20} />
          </a>
        </div>

        {/* Hamburger Menu */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            <FaHamburger size={18} />
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex bg-gray-50 border-t md:border-none`}
      >
        <ul className="container mx-auto py-4 flex flex-col md:flex-row justify-center items-center text-gray-600">
          <li className="py-2 px-4 md:py-0 md:px-6">
            <a
              onClick={showComingSoon}
              className="hover:text-gray-900 font-medium"
            >
              NEW ARRIVALS
            </a>
          </li>
          <li className="py-2 px-4 md:py-0 md:px-6">
            <a
              onClick={showComingSoon}
              className="hover:text-gray-900 font-medium"
            >
              SALE
            </a>
          </li>
          <li className="py-2 px-4 md:py-0 md:px-6">
            <a
              onClick={showComingSoon}
              className="hover:text-gray-900 font-medium"
            >
              ETHNIC WEAR
            </a>
          </li>
          <li className="py-2 px-4 md:py-0 md:px-6">
            <a
              onClick={showComingSoon}
              className="hover:text-gray-900 font-medium"
            >
              BEST SELLERS
            </a>
          </li>
          <li className="py-2 px-4 md:py-0 md:px-6">
            <a
              onClick={showComingSoon}
              className="hover:text-gray-900 font-medium"
            >
              DRESSES
            </a>
          </li>
          <li className="py-2 px-4 md:py-0 md:px-6">
            <a
              onClick={showComingSoon}
              className="hover:text-gray-900 font-medium"
            >
              CO-ORDS & JUMPSUITS
            </a>
          </li>
          <li className="py-2 px-4 md:py-0 md:px-6">
            <a
              onClick={showComingSoon}
              className="hover:text-gray-900 font-medium"
            >
              TOPS & SHIRTS
            </a>
          </li>
          <li className="py-2 px-4 md:py-0 md:px-6">
            <a
              onClick={showComingSoon}
              className="hover:text-gray-900 font-medium"
            >
              UNDER 1499 STORE
            </a>
          </li>
          <li className="md:hidden py-2 px-4 md:py-0 md:px-6">
            <a onClick={openCart} className="hover:text-gray-900 font-medium">
              CART
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
