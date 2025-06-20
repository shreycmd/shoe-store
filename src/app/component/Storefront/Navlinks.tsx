"use client";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
export const links = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "All products",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Men",
    href: "/products/men",
  },
  {
    id: 3,
    name: "Women",
    href: "/products/women",
  },
  {
    id: 4,
    name: "Kids",
    href: "/products/kids",
  },
];
const Navlinks = () => {
  const location = usePathname();
  return (
    <div className="hidden md:flex justify-center items-center gap-x-4 ml-8">
      {links.map((link: { id: number; name: string; href: string }) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            location === link.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group p-2 font-medium rounded-md"
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Navlinks;
