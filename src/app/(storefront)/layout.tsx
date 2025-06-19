import React, { type ReactNode } from "react";
import Navbar from "../component/Storefront/Navbar";
import Footer from "../component/Storefront/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
