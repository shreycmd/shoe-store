import ProductCard from "@/app/component/Storefront/ProductCard";
import { prisma } from "@/app/lib/db";
import { notFound } from "next/navigation";

import React from "react";
const getdata = async (pc: string) => {
  switch (pc) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          images: true,
          price: true,
          description: true,
        },
        where: {
          status: "published",
        },
      });
      return {
        title: "All product",
        data: data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          images: true,
          price: true,
          description: true,
        },
        where: {
          status: "published",
          category: "men",
        },
      });
      return {
        title: "Product Men",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          images: true,
          price: true,
          description: true,
        },
        where: {
          status: "published",
          category: "women",
        },
      });
      return {
        title: "Product for Women",
        data: data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          images: true,
          price: true,
          description: true,
        },
        where: {
          status: "published",
          category: "kids",
        },
      });
      return {
        title: "Product for Kids",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
};
const Category = async ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const { name } = await params;
  const { data, title } = await getdata(name);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item, ind) => (
          <ProductCard item={item} key={ind} />
        ))}
      </div>
    </section>
  );
};

export default Category;
