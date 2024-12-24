import React, { useEffect, useState } from "react";
import ProductCard from "../shared/ProductCard";
import { findAllProducts } from "../../api/product.api";
import toast from "react-hot-toast";
import ProductCardSkeleton from "../shared/ProductCardSkeleton";
import { useNavigate } from "react-router-dom";

const BestSellersCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await findAllProducts();
        setProducts(response.products);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container px-4 py-12 text-center  ">
      <div className="font-serif">
        <h1 className="font-bold text-3xl ">BEST SELLERS</h1>
        <h2 className="text-gray-500">Shop from the best selling collection</h2>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-6 sm:px-4">
          {[...Array(4)].map((item, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-4 py-8">
          {products?.slice(4, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <div>
        <button
          onClick={() => navigate("/all-products/category/best sellers")}
          className="w-[150px] bg-red-600 text-white py-2 mt-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default BestSellersCollection;
