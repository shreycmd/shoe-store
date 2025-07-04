import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

const ProductCard = ({ item }: iAppProps) => {
  return (
    <div className="rounded-lg ">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full mx-auto"
      >
        <CarouselContent>
          {item.images.map((image, ind) => (
            <CarouselItem key={ind}>
              <div className="relative h-[330px]">
                <Image
                  src={image}
                  alt="product image"
                  fill
                  className="object-cover object-center w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="flex justify-between items-center mt-2 text-xl">
        <h1 className="flex justify-between items-center mt-2 text-xl font-semibold">
          {item.name}
        </h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${item.price}
        </h3>
      </div>
      <p className="text-gra-600 text-sm mt-2 line-clamp-2">
        {item.description}
      </p>
      <Button asChild className="w-full mt-5">
        <Link href={`/product/${item.id}`}>Learn More!</Link>
      </Button>
    </div>
  );
};

export default ProductCard;
export function Loadingprod() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="w-full h-10 mt-9" />
    </div>
  );
}
