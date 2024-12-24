import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AppContext } from "../context/AppContext";
import { findProductById } from "../api/product.api";
import CouponSection from "../components/ProductDetailsPage/CouponSection";
import { findAllCoupons } from "../api/coupon.api";

const CheckoutPage = () => {
  const { user } = useContext(AppContext);
  const { cart, removeItemFormCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const shippingFee = 50;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const couponResponse = await findAllCoupons();
        console.log(couponResponse);
        setCoupons(couponResponse.coupons.slice(0, 3));
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
            placeholder="Enter your email"
          />
          <label className="flex items-center space-x-2 mb-6">
            <input type="checkbox" className="text-gray-600" />
            <span className="text-sm text-gray-600">
              Email me with news and offers
            </span>
          </label>

          <h2 className="text-2xl font-bold mb-6">Delivery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                placeholder="Last name"
              />
            </div>
          </div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
            placeholder="Address"
          />
          <label className="block text-sm font-medium mb-2">
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
            placeholder="Apartment, suite, etc."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">PIN Code</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                placeholder="PIN Code"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-6">Payment</h2>
          <label className="block text-sm font-medium mb-2">
            Payment Method
          </label>
          <select className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400">
            <option>Cashfree Payment (UPI, Cards, Wallets)</option>
            <option>COD</option>
          </select>
        </div>

        {/* Order Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Your Order</h2>
          {cartItems?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 pb-2"
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
                  onClick={() =>
                    removeItemFormCart({ userId: user, productId: item.id })
                  }
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between items-center mb-4">
            <p>Subtotal</p>
            <p>₹{totalPrice}</p>
          </div>
          {/* <div className="flex justify-between items-center mb-4">
            <p>Order Discount</p>
            <p>₹283.71</p>
          </div> */}
          <div className="flex justify-between items-center mb-4">
            <p>Shipping</p>
            <p>₹{shippingFee}.00</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center font-bold text-lg mb-4">
            <p>Total</p>
            <p>₹{totalPrice + shippingFee}</p>
          </div>
          <button
            onClick={() => alert("work in progress....")}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Proceed to Payment
          </button>
          <div className="py-4">
            <CouponSection coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
