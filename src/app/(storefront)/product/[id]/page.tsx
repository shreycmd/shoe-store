import { additem } from "@/app/action";
import Featuredproduct from "@/app/component/Storefront/Featuredproduct";
import Imageslider from "@/app/component/Storefront/Imageslider";
import { ShoppingBagButton } from "@/app/component/Submitbut";
import { prisma } from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { ShoppingBag, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
const getData = async (productId: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      name: true,
      images: true,
      description: true,
      id: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
};
const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const data = await getData(id);
  const addproduct = additem.bind(null, data.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 item satrt lg:gap-x-24 py-6">
        <Imageslider images={data.images} />
        <div>
          <h1 className="tracking-tight text-gray-900 text-3xl font-extrabold">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>
          <form action={addproduct}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>
      <div className="mt-16 ">
        <Featuredproduct />
      </div>
    </>
  );
};

export default page;
