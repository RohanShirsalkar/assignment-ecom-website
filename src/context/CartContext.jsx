import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addToCart, deleteById } from "../api/cart.api";
import { AppContext } from "./AppContext";
import { findCartByUserId } from "../api/cart.api";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AppContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          return;
        }
        const response = await findCartByUserId({ userId: user });
        setCart(response.cart);
        console.log(response);
      } catch (error) {
        console.log(error);
        // toast.error("Can not get cart with userId");
      }
    };
    fetchData();
  }, [user]);

  const addProductToCart = async (data) => {
    try {
      if (!user) {
        toast.error("User not logged in");
        return;
      }
      if (!data) {
        toast.error("Product data not provided");
        return;
      }
      const response = await addToCart(data);
      const cartResponse = await findCartByUserId({ userId: user });
      setCart(cartResponse.cart);
      toast.success("Product added to cart successfully");
      openCart();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the product to cart");
    }
  };

  const removeItemFormCart = async (data) => {
    try {
      if (!user) {
        toast.error("User not logged in");
        return;
      }
      if (!data) {
        toast.error("Product data not provided");
        return;
      }
      const response = await deleteById(data);
      const cartResponse = await findCartByUserId({ userId: user });
      console.log(cartResponse);
      setCart(cartResponse.cart);
      toast.success("Product reomoved from cart");
      openCart();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the product to cart");
    }
  };

  const openCart = () => {
    setIsCartOpen(true);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };

  const values = {
    cart,
    openCart,
    closeCart,
    isCartOpen,
    addProductToCart,
    removeItemFormCart,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
