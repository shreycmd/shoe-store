import { prisma } from "@/app/lib/db";
import React, { Suspense } from "react";
import ProductCard, { Loadingprod } from "./ProductCard";

const getData = async () => {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      CreateAt: "desc",
    },
  });
  return data;
};

const Featuredproduct = () => {
  return (
    <>
      {" "}
      <h1 className="text-2xl font-extrabold tracking-tight">Featured Items</h1>
      <Suspense fallback={<Loadingr />}>
        <Loadfp />
      </Suspense>
    </>
  );
};

export default Featuredproduct;
async function Loadfp() {
  const data = await getData();
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:rid-cols-3 gap-5">
      {data.map((item, ind) => (
        <ProductCard key={ind} item={item} />
      ))}
    </div>
  );
}
function Loadingr() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <Loadingprod />
      <Loadingprod />
      <Loadingprod />
      <Loadingprod />
    </div>
  );
}
