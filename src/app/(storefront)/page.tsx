import React from "react";

import Hero from "../component/Storefront/Hero";
import CategorySelection from "../component/Storefront/CategorySelection";
import Featuredproduct from "../component/Storefront/Featuredproduct";

const IndexPage = () => {
  return (
    <div>
      <Hero />
      <CategorySelection />
      <Featuredproduct />
    </div>
  );
};

export default IndexPage;
