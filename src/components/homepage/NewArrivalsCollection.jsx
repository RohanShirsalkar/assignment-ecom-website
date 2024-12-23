import React, { useEffect, useState } from "react";
import ProductCard from "../shared/ProductCard";
import { findAllProducts } from "../../api/product.api";
import toast from "react-hot-toast";

const NewArrivalsCollection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findAllProducts();
        setProducts(response.products);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching products");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container px-4 py-12 text-center  ">
      <div className="font-serif">
        <h1 className="font-bold text-3xl ">NEW ARRIVALS</h1>
        <h2 className="text-gray-500">Shop from the latest collection</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
        {products?.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsCollection;
