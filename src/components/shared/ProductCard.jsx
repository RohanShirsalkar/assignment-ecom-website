import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { user } = useContext(AppContext);
  const { addProductToCart, cart } = useContext(CartContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(cart);
    cart.productsInCart?.forEach((item) => {
      if (item.productId === product._id) {
        setIsAddedToCart(true);
      }
    });
  }, [cart]);

  const handleAddToCart = () => {
    if (isAddedToCart) {
      toast("Product already added to cart");
      return;
    }
    addProductToCart({ userId: user, productId: product._id, quantity: 1 });
  };

  return (
    <div className="w-full  bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={product?.img}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-lg"
          onClick={() => navigate(`/product/${product._id}`)}
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {product.rating}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3
          onClick={() => navigate(`/product/${product._id}`)}
          className="text-lg text-left font-bold text-gray-800 truncate"
        >
          {product.name}
        </h3>
        <div className="text-sm text-left text-gray-500 mb-2">
          {[...Array(Math.floor(product.rating))].map((star, i) => (
            <span key={i}>⭐</span>
          ))}
          <br />
          <span>({product.rating} Rating)</span>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-lg font-semibold text-gray-800">
            ₹{product.price}
          </p>
          {/* {product.originalPrice && (
            <p className="text-sm line-through text-gray-500 ml-2">
              ₹{product.originalPrice.toFixed(2)}
            </p>
          )} */}
        </div>
        <p className="text-sm text-left text-gray-500 mt-1">
          {product.category}
        </p>

        <button
          onClick={handleAddToCart}
          className={`w-full  text-white py-2 mt-4 rounded-lg  transition-colors ${
            isAddedToCart
              ? "bg-green-500 hover:bg-green-700"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          {isAddedToCart ? "Added To Cart" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
