import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { findProductById } from "../../api/product.api";
import { AppContext } from "../../context/AppContext";

const CartSlider = () => {
  const { user } = useContext(AppContext);
  const { isCartOpen, closeCart, cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const fetchProductsByIds = async (items) => {
    try {
      const fetchPromises = items?.map(async (item) => {
        const response = await findProductById(item.productId);
        return {
          id: response.product._id,
          name: response.product.name,
          price: response.product.price,
          // price: parseInt(response.product.price),
          quantity: 1,
          image: response.product.img,
        };
      });
      const results = await Promise.all(fetchPromises);
      const filteredResult = results?.reduce((acc, item) => {
        const exestingItem = acc.find((prod) => prod.id === item.id);
        if (exestingItem) {
          exestingItem.quantity += 1;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);
      return filteredResult;
    } catch (error) {
      console.log(error);
      // toast.error("Failed to fetch cart items data");
    }
  };

  useEffect(() => {
    fetchProductsByIds(cart?.productsInCart)
      .then((results) => {
        setCartItems(results);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to resolve cart items data");
      });
  }, [cart, user]);

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleWorkInProgress = () => {
    toast("Work in progress...");
  };

  return (
    <>
      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 max-h-[80%] flex-1 overflow-y-auto">
          {cartItems?.length > 0 ? (
            cartItems?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 border-b pb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1 mx-4">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-bold mb-2">₹{item.price}</p>
                  <button
                    onClick={handleWorkInProgress}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Footer */}
        {cartItems?.length > 0 && (
          <div className="fixed bottom-0 w-96 bg-white border-t p-4 z-50">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-lg">Total:</p>
              <p className="font-bold text-xl">₹{totalPrice}</p>
            </div>
            <button
              onClick={handleWorkInProgress}
              className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Background Overlay */}
      {isCartOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
        ></div>
      )}
    </>
  );
};

export default CartSlider;
