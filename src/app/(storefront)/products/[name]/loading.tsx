import { Loadingprod } from "@/app/component/Storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div>
      <Skeleton className="h-10 w-56 my-5" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Loadingprod />
        <Loadingprod />
        <Loadingprod />
        <Loadingprod />
        <Loadingprod />
        <Loadingprod />
        <Loadingprod />
        <Loadingprod />
      </div>
    </div>
  );
};

export default loading;
