"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface iAppProps {
  images: string[];
}
const Imageslider = ({ images }: iAppProps) => {
  const [mainindex, setindex] = useState(0);
  const total = images.length;

  const previ = () => {
    setindex((previ) => (previ + 1) % total);
  };
  const next = () => {
    setindex((prev) => (prev - 1 + total) % total);
  };
  const handleclick = (ind) => {
    setindex(ind);
  };

  return (
    <div className="grid gap-6 md:gp-3 item-start">
      <div className="relative overflow-hidden rounded-lg ">
        <Image
          src={images[mainindex]}
          alt="image product"
          width={600}
          height={600}
          className="object-cover w-[600px] h-[600px]"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={() => next()} variant="secondary" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button onClick={() => previ()} variant="secondary" size="icon">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, ind) => (
          <div
            key={ind}
            className={cn(
              ind === mainindex
                ? "border-2 border-primary"
                : "border border-gray-200",
              "relative overflow-hidden rounded-lg cursor-pointer"
            )}
            onClick={() => handleclick(ind)}
          >
            <Image
              src={image}
              alt="next images"
              width={100}
              height={100}
              className="object-cover w-[100px] h-[100px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Imageslider;
