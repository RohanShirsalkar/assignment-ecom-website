import React from "react";

const CouponSection = ({ coupons }) => {
  return (
    <div>
      {coupons?.length > 0 ? (
        <div>
          <h3 className="font-bold mb-4">Best Offers</h3>
          {coupons?.map((coupon) => (
            <div
              key={coupon._id}
              onClick={() => alert("Work in progress...")}
              className="border rounded-md p-4 mb-4 bg-gray-50 hover:bg-gray-100"
            >
              <h4 className="font-semibold">
                Get Extra {coupon.discountPercentage}% Off
              </h4>
              <p className="text-sm text-gray-600">
                Get Flat {coupon.discountPercentage}% OFF - Min Spend ₹4,999
              </p>
              <button className="text-blue-500 text-sm mt-2">
                Use Coupon Code: {coupon.code}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="font-bold mb-4">No Offers Available</h3>
      )}
    </div>
  );
};

export default CouponSection;
