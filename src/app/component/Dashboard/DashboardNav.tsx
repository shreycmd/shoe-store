"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Order",
    href: "/dashboard/order",
  },
  {
    name: "Products",
    href: "/dashboard/product",
  },
  {
    name: "Banner Pictures",
    href: "/dashboard/banner",
  },
];
const DashboardNav = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            link.href == pathname
              ? "text-black underline"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardNav;
