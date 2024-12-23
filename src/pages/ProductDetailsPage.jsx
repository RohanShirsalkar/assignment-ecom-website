import React, { useContext, useEffect, useState } from "react";
import SpecificationAndDetailsSection from "../components/ProductDetailsPage/SpecificationAndDetailsSection";
import { useNavigate, useParams, Link } from "react-router-dom";
import CouponSection from "../components/ProductDetailsPage/CouponSection";
import toast from "react-hot-toast";
import { findProductById } from "../api/product.api";
import { CartContext } from "../context/CartContext";
import { AppContext } from "../context/AppContext";
import { findAllCoupons } from "../api/coupon.api";

const additonalData = {
  title: "SARA MUSTARD SUIT SET",
  price: "₹4,249.50",
  originalPrice: "₹8,499.00",
  discount: "50% off",
  description: "Inclusive of all Taxes",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  offers: [
    {
      title: "Get Extra 5% Off",
      details: "Get Flat 5% OFF - Min Spend ₹4,999",
      code: "CART5",
    },
    {
      title: "Get Extra 10% Off",
      details: "Get Flat 10% OFF - Min Spend ₹6,999",
      code: "CART10",
    },
  ],
  images: [
    "https://via.placeholder.com/100x150?text=1",
    "https://via.placeholder.com/100x150?text=2",
    "https://via.placeholder.com/100x150?text=3",
    "https://via.placeholder.com/100x150?text=4",
  ],
  mainImage:
    "https://images.unsplash.com/photo-1604436607823-d721dfe2df46?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const details = [
  "Free Shipping On Prepaid & COD*",
  "Free worldwide shipping",
  "Easy Returns & Exchange",
];

const ProductDetailsPage = () => {
  const { user } = useContext(AppContext);
  const { addProductToCart } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await findProductById(id);
        const couponResponse = await findAllCoupons();
        console.log(couponResponse);
        setCoupons(couponResponse.coupons.slice(0, 3));
        console.log(response);
        setProduct(response.product);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    addProductToCart({ userId: user, productId: product._id, quantity: 1 });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 lg:flex gap-8">
      {/* Left Section - Images */}
      <div className="flex flex-col lg:w-2/3">
        <div className="border">
          <img src={product.img} alt="Main Product" className="w-full" />
        </div>
        {/* <div className="mt-4 flex gap-2">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={product.img}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-28 border rounded-md hover:border-gray-500 cursor-pointer"
            />
          ))}
        </div> */}
      </div>

      {/* Right Section - Product Details */}
      <div className="lg:w-2/3">
        {/* Breadcrumb */}
        {/* <p className="text-gray-600 text-sm mb-4">Home / {product.title}</p> */}
        <div className="text-gray-600 text-sm mb-4 mt-4 md:mt-0">
          <Link className="cursor-pointer hover:text-blue-500" to="/">
            Home
          </Link>{" "}
          / {product.name}
        </div>

        {/* Product Title */}
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

        {/* Pricing */}
        <div className="flex items-center gap-4 mb-4">
          <p className="text-2xl font-semibold text-red-600">
            ₹{product.price}
          </p>
          {/* <p className="text-gray-400 line-through">{product.originalPrice}</p>
          <p className="text-green-600 font-medium">{product.discount}</p> */}
        </div>
        <p className="text-gray-600 mb-4">Inclusive of all Taxes</p>

        {/* Size Selector will be rendered if any sizes are available */}

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Size</h3>
          <div className="flex gap-2">
            {additonalData.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={
                  selectedSize === size
                    ? "border px-4 py-2 rounded-md hover:bg-gray-200 text-gray-100 bg-red-600"
                    : "border px-4 py-2 rounded-md hover:bg-gray-200"
                }
              >
                {size}
              </button>
            ))}
          </div>
          {/* <a href="#" className="text-sm text-blue-500 mt-2 inline-block">
            Size Chart
          </a> */}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700 mb-6"
        >
          ADD TO CART
        </button>

        <CouponSection coupons={coupons} />
        <div>
          <div className="border-t mt-8 pt-6">
            <h3 className="text-lg font-bold mb-4">Additional Details</h3>
            <ul className="space-y-3">
              {details.map((detail, index) => (
                <li
                  key={index}
                  className="text-gray-600 flex items-start gap-2"
                >
                  <span className="text-green-500 font-bold">✔</span>
                  <p>{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SpecificationAndDetailsSection />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
