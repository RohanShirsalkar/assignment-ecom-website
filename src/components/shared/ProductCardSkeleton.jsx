import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition animate-pulse">
      <div className="w-full h-40 sm:h-48 bg-gray-300 rounded-md mb-4"></div>

      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>

      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default ProductCardSkeleton;
