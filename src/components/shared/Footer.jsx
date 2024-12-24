import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleWorkInProgress = () => {
    toast("Work in progress...");
  };
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
            fugiat obcaecati tempora!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a
                onClick={() => navigate("/all-products/category/new arrivals")}
                className="hover:text-white"
              >
                New Arrivals
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/all-products/category/best sellers")}
                className="hover:text-white"
              >
                Best Sellers
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/all-products/category/sale")}
                className="hover:text-white"
              >
                Sale
              </a>
            </li>
            <li>
              <a onClick={handleWorkInProgress} className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-400">Email: support@example.com</p>
          <p className="text-sm text-gray-400">Phone: +91-1234567890</p>
          <p className="text-sm text-gray-400">Address: Jaipur, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.675 0h-21.35C.592 0 0 .592 0 1.325v21.351C0 23.408.592 24 1.325 24H12.82v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.894-4.786 4.66-4.786 1.325 0 2.462.099 2.792.143v3.24h-1.915c-1.502 0-1.793.713-1.793 1.76v2.307h3.586l-.467 3.622h-3.12V24h6.116c.733 0 1.325-.592 1.325-1.324V1.325C24 .592 23.408 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-white"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.442.402a4.924 4.924 0 011.675 1.09 4.924 4.924 0 011.09 1.675c.162.472.348 1.272.402 2.442.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.402 2.442a4.924 4.924 0 01-1.09 1.675 4.924 4.924 0 01-1.675 1.09c-.472.162-1.272.348-2.442.402-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.442-.402a4.924 4.924 0 01-1.675-1.09 4.924 4.924 0 01-1.09-1.675c-.162-.472-.348-1.272-.402-2.442-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.402-2.442a4.924 4.924 0 011.09-1.675 4.924 4.924 0 011.675-1.09c.472-.162 1.272-.348 2.442-.402C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.735 0 8.332.012 7.052.07c-1.29.059-2.176.266-2.947.568a6.912 6.912 0 00-2.508 1.637 6.912 6.912 0 00-1.637 2.508c-.302.771-.509 1.657-.568 2.947C.012 8.332 0 8.735 0 12s.012 3.668.07 4.948c.059 1.29.266 2.176.568 2.947a6.912 6.912 0 001.637 2.508 6.912 6.912 0 002.508 1.637c.771.302 1.657.509 2.947.568C8.332 23.988 8.735 24 12 24s3.668-.012 4.948-.07c1.29-.059 2.176-.266 2.947-.568a6.912 6.912 0 002.508-1.637 6.912 6.912 0 001.637-2.508c.302-.771.509-1.657.568-2.947C23.988 15.668 24 15.265 24 12s-.012-3.668-.07-4.948c-.059-1.29-.266-2.176-.568-2.947a6.912 6.912 0 00-1.637-2.508 6.912 6.912 0 00-2.508-1.637c-.771-.302-1.657-.509-2.947-.568C15.668.012 15.265 0 12 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © 2024 Ambaree All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
