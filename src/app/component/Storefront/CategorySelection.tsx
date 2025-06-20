import Image from "next/image";
import Link from "next/link";
import React from "react";
import alt from "../../../../public/all.jpeg";
import men from "../../../../public/men.jpeg";
import women from "../../../../public/women.jpeg";
const CategorySelection = () => {
  return (
    <div className=" py-24 sm:py-32">
      <div className="text-2xl font-extrabold tracking-tight flex items-center justify-between">
        Shop By Category
        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/product/all"
        >
          Browse All Products &rarr;
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <div className=" relative group [aspect-ratio:2/1]  rounded-xl overflow-hidden sm:[aspect-ratio:1/1] sm:row-span-2">
          <Image
            src={alt}
            alt="All Products Image"
            className="object-cover object-center "
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="absolute bottom-0 p-6 flex items-end">
            <Link href="/products/all">
              <h3 className="text-white font-semibold">All Products</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
        <div className="group [aspect-ratio:2/1] rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={men}
            alt="Products for men Image"
            className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/men">
              <h3 className="text-white font-semibold">Products for Men</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
        <div className="group [aspect-ration:2/1] rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={women}
            alt="Women product image"
            className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/women">
              <h3 className="text-white font-semibold">Products for Women</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
