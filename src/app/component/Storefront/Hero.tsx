import { prisma } from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import { date } from "zod";
async function getData() {
  const gdata = await prisma.banner.findMany({
    orderBy: {
      CreatedAt: "desc",
    },
  });
  return gdata;
}
const Hero = async () => {
  const data = await getData();

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {data.map((item, ind) => (
          <CarouselItem key={ind}>
            <div className="relative h-[60vh] lg:h-[80vh] ">
              <Image
                fill
                alt="Banner"
                src={item.imageString}
                className="object-cover w-full h-full rounded-xl"
              />
              <div className="absolute top-6 left-6 bg-opacity-75 bg-black text-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
                <h1 className="text-xl lg:text-4xl font-bold">{item.title}</h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-14" />
      <CarouselNext className="mr-14" />
    </Carousel>
  );
};

export default Hero;
