import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { AppContextProvider } from "../context/AppContext";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import CartSlider from "../components/cart/CartSlider";
import { CartContextProvider } from "../context/CartContext";

const Layout = () => {
  return (
    <div>
      <AppContextProvider>
        <CartContextProvider>
          <Navbar />
          <CartSlider />
          <Toaster />
          <Outlet />
          <Footer />
        </CartContextProvider>
      </AppContextProvider>
    </div>
  );
};

export default Layout;
