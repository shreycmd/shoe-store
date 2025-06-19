import Link from "next/link";
import React from "react";
import Navlinks from "./Navlinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/Redis";
const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const cart = await redis.get(`cart-${user?.id}`);
  const total = cart?.item.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center ">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Shoe<span className="text-primary">Store</span>
          </h1>
        </Link>
        <Navlinks />
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <Link href="/bag" className="group p-2 flex items-center mr-2">
              <ShoppingBag className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {total}
              </span>
            </Link>
            <UserDropdown
              email={user.email as string}
              userImage={user.picture ?? `https://avatar.vercel.sh/${user.id}`}
              name={user.given_name as string}
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button asChild variant="ghost">
              <LoginLink>SignIn</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-700"></span>
            <Button asChild variant="ghost">
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
