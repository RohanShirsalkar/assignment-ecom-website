import React from "react";
import HeroBannerSlider from "../components/homepage/HeroBannerSlider";
import NewArrivalsCollection from "../components/homepage/NewArrivalsCollection";
import BestSellersCollection from "../components/homepage/BestSellersCollection";

const HomePage = () => {
  return (
    <div>
      <HeroBannerSlider />
      <NewArrivalsCollection />
      <div className="max-w-7xl mx-auto border w-full"></div>
      <BestSellersCollection />
    </div>
  );
};

export default HomePage;
