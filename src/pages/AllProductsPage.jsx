import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { findAllProducts } from "../api/product.api";
import ProductCard from "../components/shared/ProductCard";
import ProductCardSkeleton from "../components/shared/ProductCardSkeleton";

const AllProductsPage = () => {
  const [orignalProductsList, setOriginalProductsList] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await findAllProducts();
        console.log(response.products);
        const filteredResponse = response.products.filter((product) => {
          if (product.visibility === "on") {
            return product;
          }
        });
        setProducts(filteredResponse);
        setOriginalProductsList(filteredResponse);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const handleSortBy = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value === "price-asc") {
      const sortedProducts = [...orignalProductsList].sort((a, b) => {
        return parseFloat(a.price) - parseFloat(b.price);
      });

      setProducts(sortedProducts);
    } else if (value === "price-desc") {
      const sortedProducts = [...orignalProductsList].sort((a, b) => {
        return parseFloat(b.price) - parseFloat(a.price);
      });

      setProducts(sortedProducts);
    } else if (value === "featured") {
      setProducts(orignalProductsList);
    }
  };

  const handleShowLength = (e) => {
    const value = e.target.value;
    console.log(value);
    const sortedProducts = [...orignalProductsList].slice(0, value);
    setProducts(sortedProducts);
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          {category.toLocaleUpperCase()}
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-1/4 bg-white p-6 border-r hidden lg:block">
          <h2 className="text-lg font-semibold mb-4">FILTERS</h2>
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">DISCOUNT</h3>
            <div>
              <label className="block text-gray-600">
                <input type="checkbox" className="mr-2" />
                60% (26)
              </label>
              <label className="block text-gray-600">
                <input type="checkbox" className="mr-2" />
                50% (185)
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">SIZE</h3>
            <div>
              {["XS", "S", "M", "L", "XL", "XXL"].map((size, index) => (
                <label key={index} className="block text-gray-600">
                  <input type="checkbox" className="mr-2" />
                  {size} ({Math.floor(Math.random() * 200)})
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium mb-2">CATEGORIES</h3>
            <div>
              <label className="block text-gray-600">
                <input type="checkbox" className="mr-2" />
                Co-ord Set (21)
              </label>
              <label className="block text-gray-600">
                <input type="checkbox" className="mr-2" />
                Dresses (53)
              </label>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <p className="text-gray-800 mb-4 sm:mb-0">
              <strong>211 Products</strong>
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <label
                  htmlFor="show"
                  className="text-sm font-medium text-gray-600"
                >
                  Show
                </label>
                <select
                  id="show"
                  className="ml-2 border border-gray-300 p-2 rounded"
                  onChange={handleShowLength}
                >
                  <option value="4">4</option>
                  <option selected={true} value="8">
                    8
                  </option>
                  <option value="12">12</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="sort"
                  className="text-sm font-medium text-gray-600"
                >
                  Sort By
                </label>
                <select
                  id="sort"
                  className="ml-2 border border-gray-300 p-2 rounded"
                  onChange={handleSortBy}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((item, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProductsPage;
