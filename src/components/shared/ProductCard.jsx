import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AppContext } from "../../context/AppContext";

const ProductCard = ({ product }) => {
  const { user } = useContext(AppContext);
  const { addProductToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addProductToCart({ userId: user, productId: product._id, quantity: 1 });
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="w-full max-w-xs bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product?.img}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {product.rating}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg text-left font-bold text-gray-800 truncate">
          {product.name}
        </h3>
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
          className="w-full bg-gray-800 text-white py-2 mt-4 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
